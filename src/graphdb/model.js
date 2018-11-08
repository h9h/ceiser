import fs from 'fs'

const map = properties => {
  const keys = Object.keys(properties).map(key => `${key}: {${key}}`)
  return `{ ${keys.join(', ')} }`
}

export const createIndex = label => `CREATE INDEX ON :${label}(fqn)`

const createOrUpdateNode = (label, properties) => {
  if (!properties.fqn) throw new Error('Field fqn is missing from properties')

  const keepKeys = Object.keys(properties).
    filter(key => !['fqn', 'password', 'passwort'].includes(key))
  const params = {}
  keepKeys.forEach(k => params[k] = properties[k])

  if (keepKeys.length > 0) {
    return `
MERGE (n:${label} { fqn: {fqn} })
ON CREATE SET n += ${map(params)}
ON MATCH SET n += ${map(params)}`
  } else {
    return `MERGE (n:${label} { fqn: {fqn} })`
  }
}

const relateNodes = (labelFrom, relation, labelTo, properties) => {
  if (!properties.fqnFrom) throw new Error(
    'Field fqnFrom is missing from properties')
  if (!properties.fqnTo) throw new Error(
    'Field fqnTo is missing from properties')
  return `
MATCH (from:${labelFrom} { fqn: {fqnFrom} }),
(to:${labelTo} { fqn: {fqnTo} })
MERGE (from)-[r:${relation}]->(to)`
}

class Job {
  constructor (commands, includeIndices, batchSize) {
    this.finishedIndices = !includeIndices
    this.finished = false
    this.index = 0
    this.batchSize = batchSize || 1000
    this.indexActions = []
    this.actions = []

    commands.getLabels().forEach(label => {
      this.indexActions.push(new Command('Index', createIndex(label), {}))
    })

    ;['Node', 'Reference', 'Relation'].forEach(type => {
      const sorted = commands.getCommands(type).sort((a, b) => a.text.localeCompare(b.text))
      sorted.forEach(action => this.actions.push(action))
    })
  }

  isFinished = () => this.finished

  getBatch = () => {
    if (!this.finishedIndices) {
      this.finishedIndices = true
      return this.indexActions
    }
    const start = this.index
    const end = Math.min(start + this.batchSize, this.actions.length)
    this.index = end
    this.finished = (end === this.actions.length)
    return this.actions.slice(start, end)
  }
}

class Command {
  constructor (type, text, params) {
    this.type = type
    this.text = text
    this.params = params
  }

  getType = () => (this.type)
  getCommand = () => ({text: this.text, params: this.params})
  getResolvedCommand = () => {
    let result = this.text
    Object.keys(this.params).forEach(key => {
      const re = new RegExp(`{${key}}`, 'g')
      result = result.replace(re, `"${this.params[key]}"`)
    })
    return result
  }
}

export class Commands {
  constructor () {
    this.commands = []
    this.labels = new Set()
    this.statistic = {
      Node: 0,
      Reference: 0,
      Relation: 0,
      Label: 0
    }
  }

  getStatistic = () => this.statistic
  count = (type) => this.statistic[type] = this.statistic[type] + 1
  writeStatistic = () => Object.keys(this.statistic).map(key => `${key}: ${this.statistic[key]}`).join('\n')

  add = command => {
    this.commands.push(command)
    this.count(command.getType())
  }

  addLabel = label => {
    this.labels.add(label)
    this.statistic.Label = this.labels.size
  }

  getCommands = type => this.commands.filter(e => e.getType() === type)

  getLabels = () => this.labels

  writeFile = (filename, cb) => {
    const ws = fs.createWriteStream(filename)

    ws.on('finish', () => {
      cb(null)
    })

    ws.on('error', err => {
      cb(err)
    })

    try {
      this.labels.forEach(label => {
        ws.write(`${createIndex(label)};\n`)
      });
      ['Node', 'Reference', 'Relation'].forEach(type => {
        this.getCommands(type).forEach(command => {
          if (command.getResolvedCommand) {
            ws.write(`${command.getResolvedCommand()};\n`)
          } else {
            console.log('>>>>> COMMAND: ', command) // eslint-disable-line no-console
          }
        })
      })
    } catch (error) {
      cb(error)
    } finally {
      ws.end()
    }
  }

  /* eslint-disable no-console */
  writeToConsole = () => {
    this.labels.forEach(label => {
      console.log(createIndex(label))
    })
    this.commands.forEach(command => {
      if (command.getResolvedCommand) {
        console.log(`${command.getResolvedCommand()}`)
      } else {
        console.log('>>>>> COMMAND: ', command)
      }
    })
    console.log(this.writeStatistic())
  }
  /* eslint-enable */

  getJob = (includeIndices = false, batchSize = 1000) => {
    return new Job(this, includeIndices, batchSize)
  }
}

export const createCyphers = (commands, structure) => {
  const {label, fqn} = structure
  parseNextElement(commands, structure, label, fqn)
}

const parseNextElement = (commands, structure, labelFrom, fqnFrom) => {
  const {type} = structure

  switch (type) {
    case 'Node':
    case 'Reference': {
      const {label, fqn} = structure
      const properties = structure.properties || {}
      const params = {fqn, ...properties}

      commands.addLabel(label)
      commands.add(
        new Command(type, createOrUpdateNode(label, params).replace(/\n/g, ' '),
          params))

      if (structure.relatedBy) {
        const {relatedBy} = structure
        if (Array.isArray(relatedBy)) {
          relatedBy.forEach(o => parseNextElement(commands, o, label, fqn))
        } else {
          parseNextElement(commands, relatedBy, label, fqn)
        }
      }
    }
      break
    case 'Relation': {
      const {label, relatedTo} = structure
      const nodes = Array.isArray(relatedTo) ? relatedTo : [relatedTo]
      nodes.forEach(node => {
        const properties = {fqnFrom, fqnTo: node.fqn}
        commands.add(new Command(type,
          relateNodes(labelFrom, label, node.label, properties).
            replace(/\n/g, ' '), properties))
        parseNextElement(commands, node, labelFrom, fqnFrom)
      })
    }
      break
    default:
      throw new Error(`Unknown type '${type}`)
  }
}

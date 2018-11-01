import fs from 'fs'

const map = properties => {
  const keys = Object.keys(properties).filter(key => !['fqn'].includes(key)).map(key => `${key}: {${key}}`)
  return `{ ${keys.join(', ')} }`
}

export const createIndex = label => `CREATE INDEX ON :${label}(fqn)`

const createOrUpdateNode = (label, properties) => {
  if (!properties.fqn) throw new Error('Field fqn is missing from properties')

  const params = Object.keys(properties).filter(key => !['fqn'].includes(key))

  if (params.length > 0) {
    return `
MERGE (n:${label} { fqn: {fqn} })
ON MATCH SET n += ${map(properties)}`
  } else {
    return `MERGE (n:${label} { fqn: {fqn} })`
  }
}

const relateNodes = (labelFrom, relation, labelTo, properties) => {
  if (!properties.fqnFrom) throw new Error('Field fqnFrom is missing from properties')
  if (!properties.fqnTo) throw new Error('Field fqnTo is missing from properties')
  return `
MATCH (from:${labelFrom} { fqn: {fqnFrom} }),
(to:${labelTo} { fqn: {fqnTo} })
MERGE (from)-[r:${relation}]->(to)`
}

class Command {
  constructor(type, text, params) {
    this.type = type
    this.text = text
    this.params = params
  }

  getType = () => (this.type)
  getCommand = () => ({ text: this.text, params: this.params })
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
  constructor() {
    this.commands = []
  }

  add = command => {
    this.commands.push(command)
  }

  getCommands = type => this.commands.filter(e => e.getType() === type)

  writeFile = (filename, cb) =>  {
    const ws = fs.createWriteStream(filename)
    let error = null

    ws.on('finish', () => {
      cb(null)
    })

    ws.on('error', err => {
      cb(err)
    })

    try {
      ['Node', 'Reference', 'Relation'].forEach(type => {
        this.commands.filter(command => command.getType() === type).forEach(command => {
          if (command.getResolvedCommand) {
            ws.write(`${command.getResolvedCommand()}\n`)
          } else {
            console.log('>>>>> COMMAND: ', command)
          }
        })
      })
    } catch(error) {
      cb(error)
    } finally {
      ws.end()
    }
  }

  writeToConsole = () => {
    this.commands.forEach(command => {
      if (command.getResolvedCommand) {
        console.log(`${command.getResolvedCommand()}`)
      } else {
        console.log('>>>>> COMMAND: ', command)
      }
    })
  }
}

export const createCyphers = (commands, structure) => {
  const { label, fqn } = structure
  parseNextElement(commands, structure, label, fqn)
}

const parseNextElement = (commands, structure, labelFrom, fqnFrom) => {
  const { type } = structure

  switch(type) {
    case 'Node':
    case 'Reference':
      {
        const { label, fqn } = structure
        const properties = structure.properties || {}
        const params = { fqn, ...properties }
        commands.add(new Command(type, createOrUpdateNode(label, params).replace(/\n/g, ' '), params))

        if (structure.relatedBy) {
          const { relatedBy } = structure
          if (Array.isArray(relatedBy)) {
            relatedBy.forEach(o => parseNextElement(commands, o, label, fqn))
          } else {
            parseNextElement(commands, relatedBy, label, fqn)
          }
        }
      }
      break
    case 'Relation':
      {
        const { label, relatedTo } = structure
        const nodes = Array.isArray(relatedTo) ? relatedTo : [relatedTo]

        nodes.forEach(node => {
          const properties = { fqnFrom, fqnTo: node.fqn }
          commands.add(new Command(type, relateNodes(labelFrom, label, node.label, properties).replace(/\n/g, ' '), properties))
          parseNextElement(commands, node, labelFrom, fqnFrom)
        })
      }
      break
    default:
      throw new Error(`Unknown type '${type}`)
  }
}

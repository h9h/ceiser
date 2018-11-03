import log from './Logger'
import { readEntries } from './zip'
import { parse } from './xml'
import { parseJSON } from './ceiser/parseCEISeR'
import { Commands, createCyphers } from './graphdb/model'
import graphdb from './graphdb/graphdb'

export const getJsonModel = (zipfile = './data/data.zip') => {
  log.info('---> getting data into json <---', { zipfile })
  return readEntries(zipfile, {
    applyFunction: content => parse(content).Model,
  })
}

export const getStructures = jsons => {
  log.trace('getStructures', { jsons })
  return jsons.map(json => parseJSON(json))
}

export const getCyphers = structures => {
  log.trace('getCyphers', { structures })
  const commands = new Commands()
  structures.forEach(structure => createCyphers(commands, structure))
  return commands
}

export const generate = (zipfile, includeIndices, batchSize, callback) => {
  log.info('generate', { zipfile, includeIndices, batchSize })
  const db = graphdb.getInstance()
  zipToNeo4j(db, zipfile, includeIndices, batchSize, callback)
}

export const zipToNeo4j = (db, zipfile, includeIndices, batchSize, callback) => {
  log.info('zip to neo4j', { zipfile, includeIndices, batchSize })
  getJsonModel(zipfile).then(async jsons => {
    const structures = getStructures(jsons)
    const commands = getCyphers(structures)

    if (!db) {
      log.info('write cyphers to file')
      commands.writeFile('cypher-coommands.txt', callback)
    } else {
      log.info('execute cyphers in neo4j')
      let count = 0
      const job = commands.getJob(includeIndices, batchSize)

      const now = new Date()
      const countJobs = 0
      while (!job.isFinished()) {
        log.trace(`Job ${countJobs} start ${now}`)
        const tx = db.transaction()

        job.getBatch().forEach(async command => {
          const {text, params} = command.getCommand()
          const result = await tx.run(text, params)
          log.trace('executed cypher', { result, command: command.getResolvedCommand() })
          count = count + 1
          if (count%batchSize === 0) console.log(count, (new Date() - now)/1000) // eslint-disable-line no-console
        })

        const result = await tx.commit()
        if (result) {
          log.info('Committed', { count })
        } else {
          log.error('Error in Commit?', { count })
        }
      }
      console.log(`Anzahl Cypher-Commands abgesetzt: ${count}`) // eslint-disable-line no-console
      callback(commands.getStatistic())
    }
  })
}

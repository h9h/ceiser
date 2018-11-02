import Logger from './Logger'
import { readEntries } from './zip'
import { parse } from './xml'
import { parseJSON } from './ceiser/parseCEISeR'
import { Commands, createCyphers } from './graphdb/model'
import graphdb from './graphdb/graphdb'

const log = Logger('data-zip')

export const getJsonModel = (zipfile = './data/data.zip') => {
  log.info({'data-zip': zipfile}, '---> getting data into json <---')
  return readEntries(zipfile, {
    applyFunction: content => parse(content).Model,
  })
}

export const getStructures = jsons => {
  return jsons.map(json => parseJSON(json))
}

export const getCyphers = structures => {
  const commands = new Commands()
  structures.forEach(structure => createCyphers(commands, structure))
  return commands
}

export const generate = (zipfile, includeIndices, batchSize, callback) => {
  const db = graphdb.getInstance()
  zipToNeo4j(db, zipfile, includeIndices, batchSize, callback)
}

export const zipToNeo4j = (db, zipfile, includeIndices, batchSize, callback) => {
  getJsonModel(zipfile).then(async jsons => {
    const structures = getStructures(jsons)
    const commands = getCyphers(structures)

    if (!db) {
      commands.writeFile('cypher-coommands.txt', callback)
    } else {
      let count = 0
      const job = commands.getJob(includeIndices, batchSize)

      const now = new Date()
      while (!job.isFinished()) {
        const tx = db.transaction()

        job.getBatch().forEach(async command => {
          const {text, params} = command.getCommand()
          const result = await tx.run(text, params)
          log.trace({ result, command: command.getResolvedCommand() }, 'executed cypher')
          count = count + 1
          if (count%batchSize === 0) console.log(count, (new Date() - now)/1000) // eslint-disable-line no-console
        })

        const result = await tx.commit()
        if (result) {
          log.debug({ count }, 'Committed')
        } else {
          log.info({ count }, 'Error in Commit?')
        }
      }
      console.log(`Anzahl Cypher-Commands abgesetzt: ${count}`) // eslint-disable-line no-console
      callback(commands.getStatistic())
    }
  })
}

import Logger from './Logger'
import { readEntries } from './zip'
import { parse } from './xml'
import { parseJSON } from './ceiser/parseCEISeR'
import { Commands, createCyphers } from './graphdb/model'

import fs from 'fs'
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

export const generate = (zipfile, callback) => {
  const db = graphdb.getInstance()
  zipToNeo4j(db, zipfile, callback)
}

export const zipToNeo4j = (db, zipfile, callback) => {
  getJsonModel(zipfile).then(async jsons => {
    const structures = getStructures(jsons)
    const commands = getCyphers(structures)

    if (!db) {
      commands.writeFile('cypher-coommands.txt', callback)
    } else {
      let count = 0
      const job = commands.getJob()

      while (!job.isFinished()) {
        const tx = db.transaction()

        job.getBatch().forEach(async command => {
          const {text, params} = command.getCommand()
          const result = await tx.run(text, params)
          count = count + 1
          if (count%1000 === 0) console.log(count)
        })

        const result = await tx.commit()
        if (result) {
          console.log('Committed')
        } else {
          console.log('Error from commit?')
        }
      }
      callback()
    }
  })
}

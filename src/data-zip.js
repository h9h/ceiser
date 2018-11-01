import Logger from './Logger'
import { readEntries } from './zip'
import { parse } from './xml'
import { parseJSON } from './ceiser/parseCEISeR'
import { Commands, createCyphers } from './graphdb/model'

import fs from 'fs'

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

export const zipToNeo4j = (db, zipfile, callback) => {
  getJsonModel(zipfile).then(jsons => {
    const structures = getStructures(jsons)
    const commands = getCyphers(structures)

    if (!db) {
      commands.writeFile('cypher-coommands.txt', callback)
    } else {
      // TODO: db transaction
      callback()
    }
  })
}

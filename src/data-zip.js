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

export const generate = (callback, toFile, { zipfile, includeIndices, batchSize }) => {
  log.info('generate', { zipfile, includeIndices, batchSize, toFile })
  const db = toFile ? null : graphdb.getInstance()
  zipToNeo4j(callback, db, { zipfile, includeIndices, batchSize })
}

async function postCreateScripts (db) {
  try {
    const tx = db.transaction();
    [
      'MATCH (n:XSDType) WHERE n.fqn STARTS WITH "de.svi.kdf." SET n:KdmElement RETURN n',
      'MATCH (n:XSDElement) WHERE n.fqn STARTS WITH "de.svi.kdf." SET n:KdmElement RETURN n',

    ].forEach(async cypher => {
      await tx.run(cypher, {})
      log.info('executed post-create', { cypher })
    })

    await tx.commit()
    log.info('Post-create commit')
  } catch (e) {
    log.error('Error in post-create', {e})
  }
}

function queryDatabase (db) {
  const query = `
MATCH (n)
RETURN
DISTINCT labels(n),
count(*) AS Anzahl,
avg(size(keys(n))) as Avg_PropertyCount,
min(size(keys(n))) as Min_PropertyCount,
max(size(keys(n))) as Max_PropertyCount,
avg(size( (n)-[]-() ) ) as Avg_RelationshipCount,
min(size( (n)-[]-() ) ) as Min_RelationshipCount,
max(size( (n)-[]-() ) ) as Max_RelationshipCount  `

  db.run(query, {}, result => {
    console.log(result) // eslint-disable-line no-console
  })
}

async function createNodesAndRelations (db, job) {
  let count = 0

  // Fill database with nodes and relations
  while (!job.isFinished()) {
    const tx = db.transaction()

    job.getBatch().forEach(async command => {

      const {text, params} = command.getCommand()
      const result = await tx.run(text, params)
      log.trace('executed cypher', {result, command: command.getResolvedCommand()})
      count = count + 1
      job.time(count)
    })

    await tx.commit()

    log.info('Committed', {count})
  }

  return count
}

export const zipToNeo4j = (callback, db, { zipfile, includeIndices, batchSize } ) => {
  log.info('zip to neo4j', { zipfile, includeIndices, batchSize })
  getJsonModel(zipfile).then(async jsons => {
    const structures = getStructures(jsons)
    const commands = getCyphers(structures)

    if (!db) {
      log.info('write cyphers to file')
      commands.writeFile('cypher-coommands.txt', callback)
    } else {
      log.info('execute cyphers in neo4j')
      const job = commands.getJob(includeIndices, batchSize)
      let count = await createNodesAndRelations(db, job)
      console.log(`Anzahl Cypher-Commands abgesetzt: ${count}`) // eslint-disable-line no-console

      await postCreateScripts(db)

      queryDatabase(db)

      callback(commands.getStatistic())
    }
  })
}

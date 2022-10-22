import log from './Logger'
import graphdb from './graphdb/graphdb'

async function removeFromDb (db) {
  try {
    const tx = db.transaction()
    await tx.run('MATCH (n) WHERE NOT EXISTS(n.keep) DETACH DELETE n', {})
    log.info('executed clear data')
    await tx.commit()
    log.info('commit')
  } catch (e) {
    log.error('Error in clear data', {e})
  }
}

export async function removeData() {
  const db = graphdb.getInstance()
  await removeFromDb(db)
}

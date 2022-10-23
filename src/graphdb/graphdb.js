import neo4j from 'neo4j-driver'
import log from '../Logger'

const NOOP = () => {}
const LOG_ERROR = (error) => log.error(error, 'DB Call failed')

const Singleton = (() => {
  let instance

  const createInstance = () => {
    log.trace('---> Creating Neo4j Driver Instance <---')
    const driver = neo4j.driver('neo4j://' + process.env.NEO4J_HOST,
      neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))

    const sessionRun = (cypher, params, resolve = NOOP, reject = LOG_ERROR) => {
      const session = driver.session()

      session.run(cypher, params).then(result => {
        resolve(result)
        session.close()
      }).catch(error => {
        reject(error)
      })
    }

    const txRun = (tx) => async function (cypher, params) {
      try {
        return tx.run(cypher, params)
      } catch (error) {
        log.error(`Error running transaction ${cypher}`, error)
      }
    }

    const txCommit = (session, tx) => async function () {
      try {
        const result = await tx.commit()
        await tx.close()
        await session.close()
        return result
      } catch (error) {
        log.error('Error committing', error)
      }
    }

    const transaction = () => {
      const session = driver.session()
      const tx = session.beginTransaction()
      return {
        run: txRun(tx),
        commit: txCommit(session, tx),
      }
    }
    return {
      run: sessionRun,
      transaction,
      close: () => driver.close(),
    }
  }

  return {
    getInstance: () => {
      log.trace('---> Getting Neo4j Driver Instance <---')
      if (!instance) {
        instance = createInstance()
      }
      return instance
    },
  }
})()

export default Singleton

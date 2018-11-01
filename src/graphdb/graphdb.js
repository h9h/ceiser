import { v1 as neo4j } from 'neo4j-driver'
import Logger from '../Logger'
import dotenv from 'dotenv'

dotenv.config()

const log = Logger('graphdb')

export const toObject = record => {
  const result = {}
  record.forEach((value, key) => result[key] = value)
  return result
}

const Singleton = (() => {
  let instance

  const createInstance = () => {
    log.info('---> Creating Neo4j Driver Instance <---')
    const driver = neo4j.driver('bolt://' + process.env.NEO4J_HOST,
      neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))

    const sessionRun = (cypher, params, resolve, reject) => {
      const session = driver.session()
      session.run(cypher, params).then(result => {
        resolve(result)
        session.close()
      }).catch(error => {
        reject(error)
        log.error(error, `Cypher '${cypher}' failed`)
      })
    }

    const txRun = (tx) => (cypher, params, resolve, reject) => {
      tx.run(cypher, params).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
        log.error(error, `Cypher '${cypher}' failed`)
      })
    }

    const transaction = () => {
      const session = driver.session()
      const tx = session.beginTransaction()
      return {
        run: txRun,
        commit: (resolve, reject) => tx.commit().then(result => {
          resolve(result)
          session.close()
        }),
        rollback: () => {
          tx.rollback()
          session.close()
        }
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

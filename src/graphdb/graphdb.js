import { v1 as neo4j } from 'neo4j-driver'
import Logger from '../Logger'
import dotenv from 'dotenv'

dotenv.config()

const log = Logger('graphdb')

const NOOP = () => {}
const LOG_ERROR = (errror) => log.error(error, 'DB Call failed')

const Singleton = (() => {
  let instance

  const createInstance = () => {
    log.info('---> Creating Neo4j Driver Instance <---')
    const driver = neo4j.driver('bolt://' + process.env.NEO4J_HOST,
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

    const txRun = (tx) => async function (
      cypher, params, resolve = NOOP, reject = LOG_ERROR) {
      try {
        return tx.run(cypher, params)
      } catch (error) {
        console.log(error)
      }
    }

    const txCommit = (session, tx) => async function () {
      try {
        const result = await tx.commit()
        session.close()
        return result
      } catch (error) {
        console.log(error)
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

import seraph from 'seraph'
import model from 'seraph-model'
import Logger from './Logger'
import dotenv from 'dotenv'
dotenv.config()

const log = Logger('neo4j')

const Singleton = (() => {
  let instance

  const createInstance = () => {
    log.info('---> Creating Neo4j Driver Instance <---')
    const n = seraph({
      user: process.env.NEO4J_USERNAME,
      pass: process.env.NEO4J_PASSWORD,
    })

    return {
      db: n,
      model: modelname => model(n, modelname),
    }
  }

  return {
    getInstance: () => {
      log.trace('---> Getting Neo4j Driver Instance <---')
      if (!instance) {
        instance = createInstance()
      }
      return instance
    }
  }
})()

export default Singleton

import Neode from 'neode'
import Logger from './Logger'

const log = Logger('neo4j')

const Singleton = (() => {
  let instance

  const createInstance = () => {
    log.info('---> Creating Neode Instance <---')
    const n = new Neode.fromEnv()

    n.withDirectory(__dirname + '/models')

    return {
      neode: n,
      model: modelname => n.model(modelname),
      builder: n.query()
    }
  }

  return {
    getInstance: () => {
      log.trace('---> Getting Neode Instance <---')
      if (!instance) {
        instance = createInstance()
      }
      return instance
    }
  }
})()

export default Singleton

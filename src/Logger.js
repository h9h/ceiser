import log from 'roarr'
import serializeError from 'serialize-error'

const Logger = source => {
  const context = {
    package: '@h9h/ceiser',
    logLevel: 10,
    source,
  }

  return {
    trace: log.child({
      ...context,
      logLevel: 10,
    }),
    debug: log.child({
      ...context,
      logLevel: 20,
    }),
    info: log.child({
      ...context,
      logLevel: 30,
    }),
    warn: log.child({
      ...context,
      logLevel: 40,
    }),
    error: (error, message) => log.child({
      ...context,
      logLevel: 50,
    })({error: serializeError(error)}, message),
    fatal: log.child({
      ...context,
      logLevel: 60,
    }),
  }
}

export default Logger

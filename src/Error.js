import Logger from './Logger'

const log = Logger('ERROR')

export const throwParseError = (message, json) => {
  const error = new Error('PARSE_ERROR: ' + message)
  log.warn({ json }, 'PARSE_ERROR: ' + message)
  console.log('ERROR', message, json)
  throw error
}

import log from './Logger'

export const throwParseError = (message, json) => {
  const error = new Error(message)
  log.error(message, { json })
  throw error
}

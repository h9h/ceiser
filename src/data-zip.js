import Logger from './Logger'
import { readEntries } from './zip'
import { parse } from './xml'

const log = Logger('data-zip')

export const getJsonModel = (zipfile = './data/data.zip') => {
  log.info({ 'data-zip': zipfile }, '---> getting data into json <---')
  return readEntries(zipfile, {
    // filterFunction: name => name.match(/.*ServiceNamespace.xceiser$/),
    applyFunction: content => parse(content).Model
  })
}

import fs from 'fs'
import JSZip from 'jszip'
import Logger from './Logger'

const log = Logger('zip')

export const listZipEntries = zipfile => new Promise((resolve, reject) => {
  fs.readFile(zipfile, (error, data) => {
    if (error) {
      log.error(error, 'Reading zip failed')
      reject(error)
    }
    JSZip.loadAsync(data).then(resolve)
  })
})

export const filterConfigurationEvents = filename => !filename.match(/.*ConfigurationEvent\.xceiser$/)

export const readEntries = (zipfile, filterFunction = filterConfigurationEvents) => new Promise((resolve, reject) => {
  fs.readFile(zipfile, (error, data) => {
    if (error) {
      log.error(error, 'Reading zip failed')
      reject(error)
    }

    JSZip.loadAsync(data).then(zip => {
      const readEntries = Object.keys(zip.files).filter(filterFunction).map(filename => {
        return zip.file(filename).async('string')
      })

      Promise.all(readEntries)
        .then(resolve)
        .catch(reject)
    })
  })
})

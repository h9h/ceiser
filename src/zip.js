import fs from 'fs'
import JSZip from 'jszip'
import iconv from 'iconv-lite'
import log from './Logger'

iconv.skipDecodeWarning = true

export const listZipEntries = zipfile => new Promise((resolve, reject) => {
  fs.readFile(zipfile, (error, data) => {
    if (error) {
      log.error('Reading zip failed', error)
      reject(error)
    }
    JSZip.loadAsync(data).then(resolve)
  })
})

export const filterConfigurationEvents = filename =>
  filename.match(/.*\.xceiser$/) &&
  !filename.match(/.*ConfigurationEvent\.xceiser$/) &&
  !filename.match(/.*ConfigurationAction\.xceiser$/)

export const readEntries = (zipfile, {
                              filterFunction = filterConfigurationEvents,
                              applyFunction = s => s,
                            } = {},
) => {
  return new Promise((resolve, reject) => {
    fs.readFile(zipfile, (error, data) => {
      if (error) {
        log.error('Reading zip failed', error)
        reject(error)
      }

      JSZip.loadAsync(data).then(zip => {
        const promiseHandleZipEntries = Object.keys(zip.files).
          filter(filterFunction).
          map(filename => {
            log.trace('Zipentry', { filename })
            return new Promise((itemResolve, itemReject) => {
              zip.file(filename).
                async('binarystring').
                then(content => itemResolve(applyFunction(iconv.decode(content, 'ISO-8859-1')))).
                catch(itemReject)
            })
          })

        Promise.all(promiseHandleZipEntries).then(resolve).catch(reject)
      })
    })
  })
}

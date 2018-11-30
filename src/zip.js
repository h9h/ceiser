import fs from 'fs'
import JSZip from 'jszip'
import iconv from 'iconv-lite'
import log from './Logger'

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

      JSZip.loadAsync(data, {
        decodeFileName: bytes => iconv.decode(bytes, 'ISO-8859-1')
      }).then(zip => {
        const readEntries = Object.keys(zip.files).
          filter(filterFunction).
          map(filename => {
            log.trace('Zipentry', { filename })
            return new Promise((resolve, reject) => {
              zip.file(filename).
                async('string').
                then(content => resolve(applyFunction(content))).
                catch(reject)
            })
          })

        Promise.all(readEntries).then(resolve).catch(reject)
      })
    })
  })
}

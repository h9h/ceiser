import fs from 'fs'
import JSZip from 'jszip'
import Logger from './Logger'

const log = Logger('zip')

export const readZip = zipfile => new Promise((resolve, reject) => {
  fs.readFile(zipfile, (error, data) => {
    if (error) {
      log.error(error, 'Reading zip failed')
      reject(error)
    }
    JSZip.loadAsync(data).then(resolve)
  })
})

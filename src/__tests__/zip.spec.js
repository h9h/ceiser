import { listZipEntries, readEntries } from '../zip'
import Logger from '../Logger'

const log = Logger('zip.spec')

describe('handling von Zip-Datei', () => {
  it('should list zip-file entries', function (done) {
    listZipEntries('./data/data.zip').then(zip => {
      expect(Object.keys(zip.files).length).toBe(27624)
      done()
    }).catch(error => {
      log.error(error, 'Test failed')
      done(error)
    })
  }, 2000)

  it('should read zip-file entries', function (done) {
    readEntries('./data/data.zip', name => name === 'de/svi/xsd/beratung/candidate/ei/common/v1@ServiceNamespace.xceiser')
      .then(contents => {
        log.info({ contents }, 'Read contents')
        expect(contents.length).toBe(1)
        done()
      })
      .catch(error => {
        log.error(error, 'Test failed')
        done(error)
      })
  }, 2000)
})

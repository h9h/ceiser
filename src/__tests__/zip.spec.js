import { listZipEntries, readEntries } from '../zip'
import log from '../Logger'

describe('handling von Zip-Datei', () => {
  it('should list zip-file entries', function (done) {
    listZipEntries('./data/data.zip').then(zip => {
      expect(Object.keys(zip.files).length).toBe(27624)
      done()
    }).catch(error => {
      log.error('Test failed', error)
      done(error)
    })
  }, 2000)

  it('should read zip-file entries (single entry)', function (done) {
    readEntries('./data/data.zip', {
      filterFunction: name => name === 'de/svi/xsd/beratung/candidate/ei/common/v1@ServiceNamespace.xceiser'
    })
      .then(contents => {
        log.info('Read contents', { contents })
        expect(contents.length).toBe(1)
        done()
      })
      .catch(error => {
      log.error('Test failed', error)
        done(error)
      })
  }, 2000)

  it('should read zip-file entries (default entries)', function (done) {
    readEntries('./data/data.zip')
      .then(contents => {
        expect(contents.length).toBe(17655)
        done()
      })
      .catch(error => {
      log.error('Test failed', error)
        done(error)
      })
  }, 10000)

  it('should apply filterfunction', function (done) {
    readEntries('./data/data.zip', {filterFunction: name => name.match(/.*ServiceNamespace.xceiser$/)})
      .then(contents => {
        expect(contents.length).toBe(2439)
        done()
      })
      .catch(error => {
        log.error('Test failed', error)
        done(error)
      })
  }, 10000)

  it('should apply filterFunction and applyFunction', function (done) {
    readEntries('./data/data.zip', {
      filterFunction: name => name.match(/.*ServiceNamespace.xceiser$/),
      applyFunction: content => content.substring(0, 100)
    })
      .then(contents => {
        expect(contents.length).toBe(2439)
        expect(contents[0].length).toBe(100)
        expect(contents[30].length).toBe(100)
        expect(contents[2438].length).toBe(100)
        done()
      })
      .catch(error => {
        log.error('Test failed', error)
        done(error)
      })
  }, 10000)
})

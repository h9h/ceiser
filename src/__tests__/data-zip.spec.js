import { getJsonModel, zipToNeo4j } from '../data-zip'
import Logger from '../Logger'
import util from 'util'

const log = Logger('data-zip.spec')

describe('CEISeR`s data.zip', () => {
  it('should read ceiser data.zip into json', function (done) {
    getJsonModel()
      .then(jsons => {
        expect(jsons.length).toEqual(17655)
        expect(jsons[0]).toBeDefined()
        expect(jsons[17654]).toBeDefined()
        expect(jsons[5555].OperationQosProfile.name).toEqual('getBenutzerdaten')
        console.log(util.inspect(jsons[5555], false, null)) // eslint-disable-line no-console
        done()
      })
      .catch(error => {
        log.error(error, 'Reading data.zip into json failed')
      })
  }, 120000) // Timeout 2 minutes

  it('should write to neo/file', (done) => {
    zipToNeo4j(null, undefined, done)
  }, 360000) // 6 minutes
})


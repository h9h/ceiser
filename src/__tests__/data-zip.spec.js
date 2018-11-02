import { getJsonModel, zipToNeo4j } from '../data-zip'
import util from 'util'

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
        console.log('Reading data.zip into json failed', error) // eslint-disable-line no-console
      })
  }, 120000) // Timeout 2 minutes

  it('should write to neo/file', (done) => {
    zipToNeo4j(null, undefined, false, 1000, done)
  }, 360000) // 6 minutes
})


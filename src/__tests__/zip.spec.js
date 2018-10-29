import { readZip } from '../zip'
import Logger from '../Logger'

const log = Logger('zip.spec')

it('should read zip-file', function () {
  readZip('./data/data.zip').then(zip => {
    console.log(zip)
    //Object.keys(zip.files).forEach(key => console.log(key))
    zip.file('de/svi/xsd/beratung/candidate/ei/common/v1@ServiceNamespace.xceiser').async("string")
      .then(text => console.log(text))
  }).catch(error => log.error(error, 'Test failed'))
})

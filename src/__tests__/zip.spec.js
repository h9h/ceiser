import { listZipEntries, readEntries } from '../zip'
import Logger from '../Logger'

const log = Logger('zip.spec')

it('should list zip-file entries', function () {
  listZipEntries('./data/data.zip').then(zip => {
    console.log(zip)
    Object.keys(zip.files).forEach(key => console.log(key))
  }).catch(error => log.error(error, 'Test failed'))
})

it('should read zip-file entries', function () {
  readEntries('./data/data.zip', name => name === 'de/svi/xsd/beratung/candidate/ei/common/v1@ServiceNamespace.xceiser')
    .then(contents => log.info({ contents }, 'Read contents'))
    .catch(error => log.error(error, 'Test failed'))
})

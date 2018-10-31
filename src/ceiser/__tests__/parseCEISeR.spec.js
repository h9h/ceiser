import fs from 'fs'
import util from 'util'
import { parseJSON } from '../parseCEISeR'
import { parse } from '../../xml'

const FILES = [
  'data/leben/LebenVertragAuskunft1/LebenVertragAuskunftPortType1@WSDL11ServiceInterface.xceiser',
  'data/leben/PartnerDublettenBereinigung1@ServiceNamespace.xceiser',
  'data/komposit/ICIS@Application.xceiser'
]
describe('Parse CEISeR JSONs from XMLs', () => {
  let JSONs

  beforeAll(() => {
    JSONs = FILES.map(filename => {
      const file = fs.readFileSync(__dirname + '/../../../' + filename, 'utf8')
      const model = parse(file).Model
      console.log(util.inspect(model, false, null)) // eslint-disable-line no-console
      return model
    })
  })

  it('should get structure from JSON 0', function () {
    const node = parseJSON(JSONs[0], '')

    console.log(util.inspect(node, false, null)) // eslint-disable-line no-console
  })

  it('should get structure from JSON 1', function () {
    const node = parseJSON(JSONs[1], '')

    console.log(util.inspect(node, false, null)) // eslint-disable-line no-console
  })

  it('should get structure from JSON 2', function () {
    const node = parseJSON(JSONs[2], '')

    console.log(util.inspect(node, false, null)) // eslint-disable-line no-console
  })
})

import fs from 'fs'
import util from 'util'
import { parseJSON } from '../parseCEISeR'
import { parse } from '../xml'

describe('Parse CEISeR JSONs from XMLs', () => {
  let JSON
  beforeAll(() => {
    const file = fs.readFileSync(__dirname + '/../../data/leben/LebenVertragAuskunft1/LebenVertragAuskunftPortType1@WSDL11ServiceInterface.xceiser', 'utf8')
    console.log(file) // eslint-disable-line no-console
    JSON = parse(file).Model
    console.log(util.inspect(JSON, false, null)) // eslint-disable-line no-console
  })

  it('should get structure from JSON', function () {
    const node = parseJSON(JSON, '')

    console.log(util.inspect(node, false, null)) // eslint-disable-line no-console
  })

})

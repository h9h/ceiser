import { createStructure } from '../model'

describe('model', () => {

  it('creates cypher commands for a ceiser structure', () => {
    const STRUCTURE =
      {
        label: 'XSDElement',
        type: 'Node',
        fqn: 'de.svi.service.leben:checkAliveResp',
        properties:
          {
            content:
              '&lt;xsd:element name=&quot;checkAliveResp&quot; type=&quot;kei:checkAliveMessageRespType&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;/&gt;',
          },
        relatedBy:
          [
            {
              label: 'usedComps',
              type: 'Relation',
              relatedTo:
                {
                  label: 'XSDType',
                  type: 'Reference',
                  fqn: 'de.svi.kdf.ei.foundation.v1:checkAliveMessageRespType',
                },
            },
            {
              label: 'usedPrefixes',
              type: 'Relation',
              relatedTo:
                [
                  {
                    label: 'XSDElementNamespacePrefix',
                    type: 'Node',
                    fqn: 'de.svi.service.leben:-',
                    relatedBy:
                      [
                        {
                          label: 'serviceNamespace',
                          type: 'Relation',
                          relatedTo:
                            {
                              label: 'ServiceNamespace',
                              type: 'Reference',
                              fqn: 'org.w3.www.2001.XMLSchema',
                            },
                        }],
                  },
                ],
            },
          ],
      }

    const result = createStructure(STRUCTURE)
    console.log(result)
  })
})

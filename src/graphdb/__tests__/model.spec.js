import { Commands, createCyphers } from '../model'

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

    const result = new Commands()
    createCyphers(result, STRUCTURE)
    console.log(result)

    expect(result.createRelations.length).toBe(3)
    expect(result.createNodes.length).toBe(4)
  })

  it('should parse structure 2', () => {
    const commands = new Commands()
    createCyphers(commands, STRUCTURE2)
    commands.writeToConsole()
  })
})

const STRUCTURE2 =
  {
    label: 'ServiceNamespace',
    type: 'Node',
    fqn: 'de.svi.service.leben:PartnerDublettenBereinigung1',
    properties:
      {
        scope: 'GLOBAL',
        status: 'STABLE',
        URI: 'http://svi.de/service/leben/PartnerDublettenBereinigung1',
        attributeFormDefault: 'unqualified',
        elementFormDefault: 'qualified',
        specification: 'WSDL11_SVI',
      },
    relatedBy:
      [
        {
          label: 'interfaceFiles',
          type: 'Relation',
          relatedTo:
            {
              label: 'WSDLFile',
              type: 'Node',
              fqn:
                'de.svi.service.leben:interface-de-svi-service-leben-PartnerDublettenBereinigung1-wsdl',
              properties:
                {
                  path:
                    'interface/de.svi.service.leben.PartnerDublettenBereinigung1.wsdl',
                },
            },
        },
        {
          label: 'messages',
          type: 'Relation',
          relatedTo:
            [
              {
                label: 'WSDLMessage',
                type: 'Node',
                fqn: 'de.svi.service.leben:checkAlive',
                relatedBy:
                  [
                    {
                      label: 'parts',
                      type: 'Relation',
                      relatedTo:
                        {
                          label: 'WSDLMessagePart',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:parameters',
                          relatedBy:
                            [
                              {
                                label: 'messageType',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'XSDElement',
                                    type: 'Reference',
                                    fqn:
                                      'de.svi.service.leben.PartnerDublettenBereinigung1:checkAlive',
                                  },
                              }],
                        },
                    }],
              },
              {
                label: 'WSDLMessage',
                type: 'Node',
                fqn: 'de.svi.service.leben:checkAliveFault',
                relatedBy:
                  [
                    {
                      label: 'parts',
                      type: 'Relation',
                      relatedTo:
                        {
                          label: 'WSDLMessagePart',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:parameters',
                          relatedBy:
                            [
                              {
                                label: 'messageType',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'XSDElement',
                                    type: 'Reference',
                                    fqn:
                                      'de.svi.service.leben.PartnerDublettenBereinigung1:messageFault',
                                  },
                              }],
                        },
                    }],
              },
              {
                label: 'WSDLMessage',
                type: 'Node',
                fqn: 'de.svi.service.leben:checkAliveResp',
                relatedBy:
                  [
                    {
                      label: 'parts',
                      type: 'Relation',
                      relatedTo:
                        {
                          label: 'WSDLMessagePart',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:parameters',
                          relatedBy:
                            [
                              {
                                label: 'messageType',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'XSDElement',
                                    type: 'Reference',
                                    fqn:
                                      'de.svi.service.leben.PartnerDublettenBereinigung1:checkAliveResp',
                                  },
                              }],
                        },
                    }],
              },
              {
                label: 'WSDLMessage',
                type: 'Node',
                fqn: 'de.svi.service.leben:pruefenFault',
                relatedBy:
                  [
                    {
                      label: 'parts',
                      type: 'Relation',
                      relatedTo:
                        {
                          label: 'WSDLMessagePart',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:payload',
                          relatedBy:
                            [
                              {
                                label: 'messageType',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'XSDElement',
                                    type: 'Reference',
                                    fqn:
                                      'de.svi.service.leben.PartnerDublettenBereinigung1:messageFault',
                                  },
                              }],
                        },
                    }],
              },
              {
                label: 'WSDLMessage',
                type: 'Node',
                fqn: 'de.svi.service.leben:pruefenReq',
                relatedBy:
                  [
                    {
                      label: 'parts',
                      type: 'Relation',
                      relatedTo:
                        {
                          label: 'WSDLMessagePart',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:payload',
                          relatedBy:
                            [
                              {
                                label: 'messageType',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'XSDElement',
                                    type: 'Reference',
                                    fqn: 'de.svi.service.leben.PartnerDublettenBereinigung1:pruefen',
                                  },
                              }],
                        },
                    }],
              },
              {
                label: 'WSDLMessage',
                type: 'Node',
                fqn: 'de.svi.service.leben:pruefenResp',
                relatedBy:
                  [
                    {
                      label: 'parts',
                      type: 'Relation',
                      relatedTo:
                        {
                          label: 'WSDLMessagePart',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:payload',
                          relatedBy:
                            [
                              {
                                label: 'messageType',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'XSDElement',
                                    type: 'Reference',
                                    fqn:
                                      'de.svi.service.leben.PartnerDublettenBereinigung1:pruefenResp',
                                  },
                              }],
                        },
                    }],
              },
              {
                label: 'WSDLMessage',
                type: 'Node',
                fqn: 'de.svi.service.leben:setServiceConfigFault',
                relatedBy:
                  [
                    {
                      label: 'parts',
                      type: 'Relation',
                      relatedTo:
                        {
                          label: 'WSDLMessagePart',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:payload',
                          relatedBy:
                            [
                              {
                                label: 'messageType',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'XSDElement',
                                    type: 'Reference',
                                    fqn:
                                      'de.svi.service.leben.PartnerDublettenBereinigung1:messageFault',
                                  },
                              }],
                        },
                    }],
              },
              {
                label: 'WSDLMessage',
                type: 'Node',
                fqn: 'de.svi.service.leben:setServiceConfigReq',
                relatedBy:
                  [
                    {
                      label: 'parts',
                      type: 'Relation',
                      relatedTo:
                        {
                          label: 'WSDLMessagePart',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:payload',
                          relatedBy:
                            [
                              {
                                label: 'messageType',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'XSDElement',
                                    type: 'Reference',
                                    fqn:
                                      'de.svi.service.leben.PartnerDublettenBereinigung1:setServiceConfig',
                                  },
                              }],
                        },
                    }],
              },
              {
                label: 'WSDLMessage',
                type: 'Node',
                fqn: 'de.svi.service.leben:setServiceConfigResp',
                relatedBy:
                  [
                    {
                      label: 'parts',
                      type: 'Relation',
                      relatedTo:
                        {
                          label: 'WSDLMessagePart',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:payload',
                          relatedBy:
                            [
                              {
                                label: 'messageType',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'XSDElement',
                                    type: 'Reference',
                                    fqn:
                                      'de.svi.service.leben.PartnerDublettenBereinigung1:setServiceConfigResp',
                                  },
                              }],
                        },
                    }],
              },
              {
                label: 'WSDLMessage',
                type: 'Node',
                fqn: 'de.svi.service.leben:umstellenFault',
                relatedBy:
                  [
                    {
                      label: 'parts',
                      type: 'Relation',
                      relatedTo:
                        {
                          label: 'WSDLMessagePart',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:payload',
                          relatedBy:
                            [
                              {
                                label: 'messageType',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'XSDElement',
                                    type: 'Reference',
                                    fqn:
                                      'de.svi.service.leben.PartnerDublettenBereinigung1:messageFault',
                                  },
                              }],
                        },
                    }],
              },
              {
                label: 'WSDLMessage',
                type: 'Node',
                fqn: 'de.svi.service.leben:umstellenReq',
                relatedBy:
                  [
                    {
                      label: 'parts',
                      type: 'Relation',
                      relatedTo:
                        {
                          label: 'WSDLMessagePart',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:payload',
                          relatedBy:
                            [
                              {
                                label: 'messageType',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'XSDElement',
                                    type: 'Reference',
                                    fqn:
                                      'de.svi.service.leben.PartnerDublettenBereinigung1:umstellen',
                                  },
                              }],
                        },
                    }],
              },
              {
                label: 'WSDLMessage',
                type: 'Node',
                fqn: 'de.svi.service.leben:umstellenResp',
                relatedBy:
                  [
                    {
                      label: 'parts',
                      type: 'Relation',
                      relatedTo:
                        {
                          label: 'WSDLMessagePart',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:payload',
                          relatedBy:
                            [
                              {
                                label: 'messageType',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'XSDElement',
                                    type: 'Reference',
                                    fqn:
                                      'de.svi.service.leben.PartnerDublettenBereinigung1:umstellenResp',
                                  },
                              }],
                        },
                    }],
              }],
        },
        {
          label: 'portTypes',
          type: 'Relation',
          relatedTo:
            {
              label: 'WSDLPortType',
              type: 'Node',
              fqn: 'de.svi.service.leben:PartnerDublettenBereinigungPortType1',
              properties:
                {
                  csid: 'urn:csid:mrip:D4E49D1E57A3B83FED141042167792561',
                  sovereign: 'CEISeR',
                },
              relatedBy:
                [
                  {
                    label: 'additionalUsedComponents',
                    type: 'Relation',
                    relatedTo:
                      [
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.common.v1:fremdOrdnungsbegriff',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.common.v1:identifier',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.common.v1:lfdNummer',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.common.v1:valuta',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:emptyRequest',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:emptyResponse',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:messageHeader',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:fachDatum',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:fachHinweisText',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:fachZeitpunkt',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:processActivity',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:statusCode',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:techHinweisText',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:wiedervorlageDatum',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.mandant.v1:gesellschaftCode',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.mandant.v1:mandantCode',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.partner.rollen.v1:partnerrolle',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.partner.v1:partnerId',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.partner.v1:partnernummer',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.vertrag.compliance.v1:aktionErgebnis',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.vertrag.v1:istLD',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.vertrag.v1:vertragsnummer',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.vertrag.v1:vertragsnummerExt',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn:
                            'de.svi.service.leben.PartnerDublettenBereinigung1:checkAlive',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn:
                            'de.svi.service.leben.PartnerDublettenBereinigung1:checkAliveResp',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn:
                            'de.svi.service.leben.PartnerDublettenBereinigung1:messageFault',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn: 'de.svi.service.leben.PartnerDublettenBereinigung1:pruefen',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn:
                            'de.svi.service.leben.PartnerDublettenBereinigung1:pruefenResp',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn:
                            'de.svi.service.leben.PartnerDublettenBereinigung1:setServiceConfig',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn:
                            'de.svi.service.leben.PartnerDublettenBereinigung1:setServiceConfigResp',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn:
                            'de.svi.service.leben.PartnerDublettenBereinigung1:umstellen',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn:
                            'de.svi.service.leben.PartnerDublettenBereinigung1:umstellenResp',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.serviceConfig.v1:FaultDetail',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.serviceConfig.v1:setServiceConfigReq',
                        },
                        {
                          label: 'XSDElement',
                          type: 'Reference',
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.serviceConfig.v1:setServiceConfigResp',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.common.v1:fremdOrdnungsbegriffType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.common.v1:lfdNummerType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.common.v1:valutaType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:checkAliveMessageRespType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:checkAliveMessageType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:emptyType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:errorDetailType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:faultDetailType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:messageHeaderType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:messageIdType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:processInstanceIdType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:propertyListItemType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:propertyListType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:replyContextType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:senderFQNType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:timestampOffsetType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.foundation.v1:timestampUTCType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:fachDatumType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:fachZeitpunktType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:statusCodeType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:string100Type',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:string200Type',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.ei.process.v1:wiedervorlageDatumType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.mandant.v1:gesellschaftEnum',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.mandant.v1:mandantEnum',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.partner.rollen.v1:partnerrolleType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.partner.v1:partnerIdType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.partner.v1:partnernummerType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.partner.v1:string15Type',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.vertrag.compliance.v1:aktionErgebnisEnum',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.vertrag.v1:string15Type',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.vertrag.v1:vertragsnummerExtType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn: 'de.svi.kdf.vertrag.v1:vertragsnummerType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.pruefen.v1:pruefenRespType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.pruefen.v1:pruefenType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.serviceConfig.v1:ServiceConfigRecInType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.serviceConfig.v1:ServiceConfigRecOutRespType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.umstellen.v1:umstellenRespType',
                        },
                        {
                          label: 'XSDType',
                          type: 'Reference',
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.umstellen.v1:umstellenType',
                        }],
                  },
                  {
                    label: 'operations',
                    type: 'Relation',
                    relatedTo:
                      [
                        {
                          label: 'WSDLRequestResponseOperation',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:pruefen',
                          properties: {soapAction: 'pruefen'},
                          relatedBy:
                            [
                              {
                                label: 'faults',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'WSDLFault',
                                    type: 'Node',
                                    fqn: 'de.svi.service.leben:pruefenFault',
                                    relatedBy:
                                      [
                                        {
                                          label: 'message',
                                          type: 'Relation',
                                          relatedTo:
                                            {
                                              label: 'WSDLMessage',
                                              type: 'Reference',
                                              fqn:
                                                'de.svi.service.leben.PartnerDublettenBereinigung1:pruefenFault',
                                            },
                                        }],
                                  },
                              },
                              {
                                label: 'input',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'WSDLInput',
                                    type: 'Node',
                                    fqn: 'de.svi.service.leben:input',
                                    properties: {nameless: true},
                                    relatedBy:
                                      [
                                        {
                                          label: 'message',
                                          type: 'Relation',
                                          relatedTo:
                                            {
                                              label: 'WSDLMessage',
                                              type: 'Reference',
                                              fqn:
                                                'de.svi.service.leben.PartnerDublettenBereinigung1:pruefenReq',
                                            },
                                        }],
                                  },
                              },
                              {
                                label: 'output',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'WSDLOutput',
                                    type: 'Node',
                                    fqn: 'de.svi.service.leben:output',
                                    properties: {nameless: true},
                                    relatedBy:
                                      [
                                        {
                                          label: 'message',
                                          type: 'Relation',
                                          relatedTo:
                                            {
                                              label: 'WSDLMessage',
                                              type: 'Reference',
                                              fqn:
                                                'de.svi.service.leben.PartnerDublettenBereinigung1:pruefenResp',
                                            },
                                        }],
                                  },
                              }],
                        },
                        {
                          label: 'WSDLRequestResponseOperation',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:umstellen',
                          properties: {soapAction: 'umstellen'},
                          relatedBy:
                            [
                              {
                                label: 'faults',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'WSDLFault',
                                    type: 'Node',
                                    fqn: 'de.svi.service.leben:umstellenFault',
                                    relatedBy:
                                      [
                                        {
                                          label: 'message',
                                          type: 'Relation',
                                          relatedTo:
                                            {
                                              label: 'WSDLMessage',
                                              type: 'Reference',
                                              fqn:
                                                'de.svi.service.leben.PartnerDublettenBereinigung1:umstellenFault',
                                            },
                                        }],
                                  },
                              },
                              {
                                label: 'input',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'WSDLInput',
                                    type: 'Node',
                                    fqn: 'de.svi.service.leben:input',
                                    properties: {nameless: true},
                                    relatedBy:
                                      [
                                        {
                                          label: 'message',
                                          type: 'Relation',
                                          relatedTo:
                                            {
                                              label: 'WSDLMessage',
                                              type: 'Reference',
                                              fqn:
                                                'de.svi.service.leben.PartnerDublettenBereinigung1:umstellenReq',
                                            },
                                        }],
                                  },
                              },
                              {
                                label: 'output',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'WSDLOutput',
                                    type: 'Node',
                                    fqn: 'de.svi.service.leben:output',
                                    properties: {nameless: true},
                                    relatedBy:
                                      [
                                        {
                                          label: 'message',
                                          type: 'Relation',
                                          relatedTo:
                                            {
                                              label: 'WSDLMessage',
                                              type: 'Reference',
                                              fqn:
                                                'de.svi.service.leben.PartnerDublettenBereinigung1:umstellenResp',
                                            },
                                        }],
                                  },
                              }],
                        },
                        {
                          label: 'WSDLRequestResponseOperation',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:checkAlive',
                          relatedBy:
                            [
                              {
                                label: 'faults',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'WSDLFault',
                                    type: 'Node',
                                    fqn: 'de.svi.service.leben:checkAliveFault',
                                    relatedBy:
                                      [
                                        {
                                          label: 'message',
                                          type: 'Relation',
                                          relatedTo:
                                            {
                                              label: 'WSDLMessage',
                                              type: 'Reference',
                                              fqn:
                                                'de.svi.service.leben.PartnerDublettenBereinigung1:checkAliveFault',
                                            },
                                        }],
                                  },
                              },
                              {
                                label: 'input',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'WSDLInput',
                                    type: 'Node',
                                    fqn: 'de.svi.service.leben:input',
                                    properties: {nameless: true},
                                    relatedBy:
                                      [
                                        {
                                          label: 'message',
                                          type: 'Relation',
                                          relatedTo:
                                            {
                                              label: 'WSDLMessage',
                                              type: 'Reference',
                                              fqn:
                                                'de.svi.service.leben.PartnerDublettenBereinigung1:checkAlive',
                                            },
                                        }],
                                  },
                              },
                              {
                                label: 'output',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'WSDLOutput',
                                    type: 'Node',
                                    fqn: 'de.svi.service.leben:output',
                                    properties: {nameless: true},
                                    relatedBy:
                                      [
                                        {
                                          label: 'message',
                                          type: 'Relation',
                                          relatedTo:
                                            {
                                              label: 'WSDLMessage',
                                              type: 'Reference',
                                              fqn:
                                                'de.svi.service.leben.PartnerDublettenBereinigung1:checkAliveResp',
                                            },
                                        }],
                                  },
                              }],
                        },
                        {
                          label: 'WSDLRequestResponseOperation',
                          type: 'Node',
                          fqn: 'de.svi.service.leben:setServiceConfig',
                          properties: {soapAction: 'setServiceConfig'},
                          relatedBy:
                            [
                              {
                                label: 'faults',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'WSDLFault',
                                    type: 'Node',
                                    fqn: 'de.svi.service.leben:setServiceConfigFault',
                                    relatedBy:
                                      [
                                        {
                                          label: 'message',
                                          type: 'Relation',
                                          relatedTo:
                                            {
                                              label: 'WSDLMessage',
                                              type: 'Reference',
                                              fqn:
                                                'de.svi.service.leben.PartnerDublettenBereinigung1:setServiceConfigFault',
                                            },
                                        }],
                                  },
                              },
                              {
                                label: 'input',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'WSDLInput',
                                    type: 'Node',
                                    fqn: 'de.svi.service.leben:input',
                                    properties: {nameless: true},
                                    relatedBy:
                                      [
                                        {
                                          label: 'message',
                                          type: 'Relation',
                                          relatedTo:
                                            {
                                              label: 'WSDLMessage',
                                              type: 'Reference',
                                              fqn:
                                                'de.svi.service.leben.PartnerDublettenBereinigung1:setServiceConfigReq',
                                            },
                                        }],
                                  },
                              },
                              {
                                label: 'output',
                                type: 'Relation',
                                relatedTo:
                                  {
                                    label: 'WSDLOutput',
                                    type: 'Node',
                                    fqn: 'de.svi.service.leben:output',
                                    properties: {nameless: true},
                                    relatedBy:
                                      [
                                        {
                                          label: 'message',
                                          type: 'Relation',
                                          relatedTo:
                                            {
                                              label: 'WSDLMessage',
                                              type: 'Reference',
                                              fqn:
                                                'de.svi.service.leben.PartnerDublettenBereinigung1:setServiceConfigResp',
                                            },
                                        }],
                                  },
                              }],
                        }],
                  },
                  {
                    label: 'role',
                    type: 'Relation',
                    relatedTo:
                      {
                        label: 'WSDLProviderPortType',
                        type: 'Node',
                        fqn: 'de.svi.service.leben:role',
                      },
                  }],
            },
        },
        {
          label: 'xsdElements',
          type: 'Relation',
          relatedTo:
            [
              {
                label: 'XSDElement',
                type: 'Node',
                fqn: 'de.svi.service.leben:checkAlive',
                properties:
                  {
                    content:
                      '&lt;xsd:element name=&quot;checkAlive&quot; type=&quot;kei:checkAliveMessageType&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;/&gt;',
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
                          fqn: 'de.svi.kdf.ei.foundation.v1:checkAliveMessageType',
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
                          {
                            label: 'XSDElementNamespacePrefix',
                            type: 'Node',
                            fqn: 'de.svi.service.leben:kei',
                            relatedBy:
                              [
                                {
                                  label: 'serviceNamespace',
                                  type: 'Relation',
                                  relatedTo:
                                    {
                                      label: 'ServiceNamespace',
                                      type: 'Reference',
                                      fqn: 'de.svi.kdf.ei.foundation.v1',
                                    },
                                }],
                          }],
                    }],
              },
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
                          {
                            label: 'XSDElementNamespacePrefix',
                            type: 'Node',
                            fqn: 'de.svi.service.leben:kei',
                            relatedBy:
                              [
                                {
                                  label: 'serviceNamespace',
                                  type: 'Relation',
                                  relatedTo:
                                    {
                                      label: 'ServiceNamespace',
                                      type: 'Reference',
                                      fqn: 'de.svi.kdf.ei.foundation.v1',
                                    },
                                }],
                          }],
                    }],
              },
              {
                label: 'XSDElement',
                type: 'Node',
                fqn: 'de.svi.service.leben:messageFault',
                properties:
                  {
                    content:
                      '&lt;xsd:element name=&quot;messageFault&quot; type=&quot;kei:faultDetailType&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;/&gt;',
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
                          fqn: 'de.svi.kdf.ei.foundation.v1:faultDetailType',
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
                          {
                            label: 'XSDElementNamespacePrefix',
                            type: 'Node',
                            fqn: 'de.svi.service.leben:kei',
                            relatedBy:
                              [
                                {
                                  label: 'serviceNamespace',
                                  type: 'Relation',
                                  relatedTo:
                                    {
                                      label: 'ServiceNamespace',
                                      type: 'Reference',
                                      fqn: 'de.svi.kdf.ei.foundation.v1',
                                    },
                                }],
                          }],
                    }],
              },
              {
                label: 'XSDElement',
                type: 'Node',
                fqn: 'de.svi.service.leben:pruefen',
                properties:
                  {
                    content:
                      '&lt;xsd:element name=&quot;pruefen&quot; type=&quot;pdbp:pruefenType&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;/&gt;',
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
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.pruefen.v1:pruefenType',
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
                          {
                            label: 'XSDElementNamespacePrefix',
                            type: 'Node',
                            fqn: 'de.svi.service.leben:pdbp',
                            relatedBy:
                              [
                                {
                                  label: 'serviceNamespace',
                                  type: 'Relation',
                                  relatedTo:
                                    {
                                      label: 'ServiceNamespace',
                                      type: 'Reference',
                                      fqn: 'de.svi.xsd.leben.PartnerDublettenBereinigung.pruefen.v1',
                                    },
                                }],
                          }],
                    }],
              },
              {
                label: 'XSDElement',
                type: 'Node',
                fqn: 'de.svi.service.leben:pruefenResp',
                properties:
                  {
                    content:
                      '&lt;xsd:element name=&quot;pruefenResp&quot; type=&quot;pdbp:pruefenRespType&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;/&gt;',
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
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.pruefen.v1:pruefenRespType',
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
                          {
                            label: 'XSDElementNamespacePrefix',
                            type: 'Node',
                            fqn: 'de.svi.service.leben:pdbp',
                            relatedBy:
                              [
                                {
                                  label: 'serviceNamespace',
                                  type: 'Relation',
                                  relatedTo:
                                    {
                                      label: 'ServiceNamespace',
                                      type: 'Reference',
                                      fqn: 'de.svi.xsd.leben.PartnerDublettenBereinigung.pruefen.v1',
                                    },
                                }],
                          }],
                    }],
              },
              {
                label: 'XSDElement',
                type: 'Node',
                fqn: 'de.svi.service.leben:setServiceConfig',
                properties:
                  {
                    content:
                      '&lt;xsd:element name=&quot;setServiceConfig&quot; type=&quot;pdbsc:ServiceConfigRecInType&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;/&gt;',
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
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.serviceConfig.v1:ServiceConfigRecInType',
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
                          {
                            label: 'XSDElementNamespacePrefix',
                            type: 'Node',
                            fqn: 'de.svi.service.leben:pdbsc',
                            relatedBy:
                              [
                                {
                                  label: 'serviceNamespace',
                                  type: 'Relation',
                                  relatedTo:
                                    {
                                      label: 'ServiceNamespace',
                                      type: 'Reference',
                                      fqn:
                                        'de.svi.xsd.leben.PartnerDublettenBereinigung.serviceConfig.v1',
                                    },
                                }],
                          }],
                    }],
              },
              {
                label: 'XSDElement',
                type: 'Node',
                fqn: 'de.svi.service.leben:setServiceConfigResp',
                properties:
                  {
                    content:
                      '&lt;xsd:element name=&quot;setServiceConfigResp&quot; type=&quot;pdbsc:ServiceConfigRecOutRespType&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;/&gt;',
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
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.serviceConfig.v1:ServiceConfigRecOutRespType',
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
                          {
                            label: 'XSDElementNamespacePrefix',
                            type: 'Node',
                            fqn: 'de.svi.service.leben:pdbsc',
                            relatedBy:
                              [
                                {
                                  label: 'serviceNamespace',
                                  type: 'Relation',
                                  relatedTo:
                                    {
                                      label: 'ServiceNamespace',
                                      type: 'Reference',
                                      fqn:
                                        'de.svi.xsd.leben.PartnerDublettenBereinigung.serviceConfig.v1',
                                    },
                                }],
                          }],
                    }],
              },
              {
                label: 'XSDElement',
                type: 'Node',
                fqn: 'de.svi.service.leben:umstellen',
                properties:
                  {
                    content:
                      '&lt;xsd:element name=&quot;umstellen&quot; type=&quot;pdbu:umstellenType&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;/&gt;',
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
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.umstellen.v1:umstellenType',
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
                          {
                            label: 'XSDElementNamespacePrefix',
                            type: 'Node',
                            fqn: 'de.svi.service.leben:pdbu',
                            relatedBy:
                              [
                                {
                                  label: 'serviceNamespace',
                                  type: 'Relation',
                                  relatedTo:
                                    {
                                      label: 'ServiceNamespace',
                                      type: 'Reference',
                                      fqn: 'de.svi.xsd.leben.PartnerDublettenBereinigung.umstellen.v1',
                                    },
                                }],
                          }],
                    }],
              },
              {
                label: 'XSDElement',
                type: 'Node',
                fqn: 'de.svi.service.leben:umstellenResp',
                properties:
                  {
                    content:
                      '&lt;xsd:element name=&quot;umstellenResp&quot; type=&quot;pdbu:umstellenRespType&quot; xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;/&gt;',
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
                          fqn:
                            'de.svi.xsd.leben.PartnerDublettenBereinigung.umstellen.v1:umstellenRespType',
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
                          {
                            label: 'XSDElementNamespacePrefix',
                            type: 'Node',
                            fqn: 'de.svi.service.leben:pdbu',
                            relatedBy:
                              [
                                {
                                  label: 'serviceNamespace',
                                  type: 'Relation',
                                  relatedTo:
                                    {
                                      label: 'ServiceNamespace',
                                      type: 'Reference',
                                      fqn: 'de.svi.xsd.leben.PartnerDublettenBereinigung.umstellen.v1',
                                    },
                                }],
                          }],
                    }],
              }],
        }],
  }

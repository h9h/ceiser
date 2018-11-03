import { parse } from '../xml'
import log from '../Logger'

describe('XML Parsing', () => {
  it('should parse XML', function () {
    const json = parse(XML1)
    log.debug('Parse result', { json })
    expect(json.Model).toBeDefined()
    expect(json.Model.WSDL11ServiceInterface.status).toEqual('STABLE')
  })
})

const XML1 = `<?xml version="1.0" encoding="ISO-8859-1"?>
<Model>
    <WSDL11ServiceInterface name="LebenVertragAuskunftPortType1"
        namespace="de.svi.service.leben.LebenVertragAuskunft1"
        scope="GLOBAL"
        status="STABLE"
        URI="http://svi.de/service/leben/LebenVertragAuskunft1">
        <interfaceFiles>
            <XSDFile name="interface-de-svi-kdf-ei-foundation-v1-xsd"
                path="interface/de.svi.kdf.ei.foundation.v1.xsd">
            </XSDFile>
            <XSDFile name="interface-de-svi-kdf-partner-v1-xsd"
                path="interface/de.svi.kdf.partner.v1.xsd">
            </XSDFile>
            <XSDFile name="interface-de-svi-kdf-vertrag-v1-xsd"
                path="interface/de.svi.kdf.vertrag.v1.xsd">
            </XSDFile>
            <WSDLFile name="interface-de-svi-service-leben-LebenVertragAuskunft1-wsdl"
                path="interface/de.svi.service.leben.LebenVertragAuskunft1.wsdl">
            </WSDLFile>
            <XSDFile name="interface-de-svi-xsd-leben-LebenVertragAuskunft-getBasisdatenMitAbllst-v1-xsd"
                path="interface/de.svi.xsd.leben.LebenVertragAuskunft.getBasisdatenMitAbllst.v1.xsd">
            </XSDFile>
        </interfaceFiles>
        <usedServiceNamespace>
            <ServiceNamespace ID="de.svi.service.leben.LebenVertragAuskunft1" />
        </usedServiceNamespace>
        <providedPortType>
            <WSDLPortType ID="de.svi.service.leben.LebenVertragAuskunft1:LebenVertragAuskunftPortType1" />
        </providedPortType>
    </WSDL11ServiceInterface>
</Model>`

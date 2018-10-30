import { parse as fastparse } from 'fast-xml-parser'

const PARSE_OPTIONS = {
  attributeNamePrefix: '', // default @
  attrNodeName: false, //default is 'false', could be 'attr'
  textNodeName: '#text',
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: true,
  trimValues: true,
  cdataTagName: '__cdata', //default is 'false'
  cdataPositionChar: '\\c',
  localeRange: '', //To support non english character in tag/attribute values.
  parseTrueNumberOnly: false,
  /*
  // unter Nutzung des HTML-Encoders he:
  attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),//default is a=>a
  tagValueProcessor : a => he.decode(a) //default is a=>a
   */
}

export const parse = (xml, options = PARSE_OPTIONS): {} => {
  return fastparse(xml, options)
}
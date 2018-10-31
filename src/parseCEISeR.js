import { throwParseError } from './Error'
import Logger from './Logger'

const log = Logger('data-parseCEISeR')

export const parseJSON = (json, parentFqn) => {
  const label = getLabel(json)
  const content = json[label]
  const namespace = content.namespace || parentFqn
  const fqn = getFqn(content, namespace)

  const node = {
    label,
    type: getType(content),
    fqn,
    properties: getProperties(content),
    relatedTo: getRelations(content)
  }

  log.trace({ json, node }, 'Finished parsing json, returning structure')
  return node
}

const getLabel = json => {
  const keys = Object.keys(json)
  if (keys.length !== 1) throwParseError('getLabel auf ungültigem JSON aufgerufen. Kein eindeutiger Type', json)
  return keys[0]
}

const getType = content => {
  if (content.ID) return 'Reference'
  if (Object.keys(content).length === 1 && !content.name) return 'Relation'
  return 'Node'
}

const getFqn = (content, namespace) => {
  if (content.ID) return content.ID
  if (content.name) {
    return namespace + ':' + content.name
  }
  throwParseError('getFqn ergab keinen fully qualified name', content)
}

const getProperties = content => {
  const keys = Object.keys(content).filter(key => !['name', 'namespace', 'ID'].includes(key))
  return Object.entries(content).filter(([key, value]) => keys.includes(key) && typeof value !== 'object')
}

const getRelations = (content, parentFqn) => {
  const entries = Object.entries(content).filter(([_, value]) => typeof value === 'object' && Object.keys(value).length === 1)
  return entries.map(([key, value]) => {
    return {
      label: key,
      type: 'Relation',
      relatedTo: (Array.isArray(value) ? value : [value]).map(v => parseJSON(v, parentFqn))
    }
  })
}

import { throwParseError } from './Error'
import Logger from './Logger'

const log = Logger('data-parseCEISeR')

const createNode = (label, content, parentFqn) => {
  const namespace = content.namespace || parentFqn
  const fqn = getFqn(content, namespace)
  const properties = getProperties(content)
  const relatedBy = getRelations(content, parentFqn)

  const node = {
    label,
    type: getType(content),
    fqn,
  }

  if (Object.keys(properties).length > 0) node.properties = properties
  if (relatedBy.length > 0) node.relatedBy = relatedBy

  log.trace({content, node}, 'Finished parsing json, returning structure')
  return node
}

const flatten = array => array.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

export const parseJSON = (json, parentFqn) => {
  if (parentFqn === '' || parentFqn == null) parentFqn = json[Object.keys(json)[0]].namespace

  const label = getLabel(json)
  if (label === undefined) {

    return flatten(Object.keys(json).map(key => {
      const sub = json[key]
      if (Array.isArray(sub)) {
        return sub.map(item => createNode(key, item, parentFqn))
      } else {
        return createNode(key, sub, parentFqn)
      }
    }))
  } else {
    const content = json[label]

    return createNode(label, content, parentFqn)
  }
}

const getLabel = json => {
  const keys = Object.keys(json)
  if (keys.length !== 1) return undefined
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
  const props = Object.entries(content).filter(([key, value]) => keys.includes(key) && typeof value !== 'object')
  const result = {}
  props.forEach(([key, value]) => result[key] = value)
  return result
}

const getRelations = (content, parentFqn) => {
  const entries = Object.entries(content).filter(([_, value]) => typeof value === 'object')

  return entries.map(([key, value]) => {
    const relatedTo = parseJSON(value, parentFqn)

    return {
      label: key,
      type: 'Relation',
      relatedTo
    }
  })
}

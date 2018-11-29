import { throwParseError } from '../Error'
import log from '../Logger'

const createNode = (label, content, parentFqn) => {
  log.trace('createNode', label, parentFqn, content)
  const namespace = content.namespace || parentFqn.split(':').join('.')
  const fqn = getFqn(content, namespace)
  const properties = getProperties(content)

  const relatedBy = getRelations(content, fqn)

  const node = {
    label,
    type: getType(content),
    fqn,
  }

  if (Object.keys(properties).length > 0) node.properties = properties
  if (relatedBy.length > 0) node.relatedBy = relatedBy

  log.trace('Finished parsing json, returning node', {content, node})
  return node
}

const flatten = array => array.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

export const parseJSON = (json, parentFqn) => {
  log.trace('Parsing json', { json, parentFqn })
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

    if (Array.isArray(content)) {
      return content.map(item => createNode(label, item, parentFqn))
    } else {
      return createNode(label, content, parentFqn)
    }
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
  // ID wird schon als Referenz verwendet, hier rausfiltern
  const keys = Object.keys(content).filter(key => !['ID'].includes(key))
  // wenn der Wert ein Object ist, dann sind wir nicht bei Properties, sondern Relations
  const props = Object.entries(content).filter(([key, value]) => keys.includes(key) && typeof value !== 'object')

  const result = {}
  props.forEach(([key, value]) => result[key] = value)
  return result
}

const getRelations = (content, parentFqn) => {
  // hier interessieren und nur die Object-Werte --> diese werden zu Relationen
  const entries = Object.entries(content).filter(([_, value]) => typeof value === 'object') // eslint-disable-line no-unused-vars

  return entries.map(([key, value]) => {
    const relatedTo = parseJSON(value, parentFqn)

    return {
      label: key,
      type: 'Relation',
      relatedTo
    }
  })
}

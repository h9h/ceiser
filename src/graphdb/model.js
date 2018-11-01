const map = properties => {
  const keys = Object.keys(properties).map(key => `${key}: $${key}`)
  return `{ ${keys.join(', ')} }`
}

export const createIndex = label => `CREATE INDEX ON :${label}(fqn)`

const createOrUpdateNode = (label, properties) => {
  if (!properties.fqn) throw new Error('Field fqn is missing from properties')
  return `
    MERGE (n:${label} { fqn: $fqn })
      ON CREATE SET n.created = timestamp()
      ON MATCH SET n += ${map(properties)}
    RETURN n`
}

const relateNodes = (labelFrom, relation, labelTo, properties) => {
  if (!properties.fqnFrom) throw new Error('Field fqnFrom is missing from properties')
  if (!properties.fqnTo) throw new Error('Field fqnTo is missing from properties')
  return `
    MATCH (from:${labelFrom} { fqn: $fqnFrom }),
          (to:${labelTo} { fqn: $fqnTo })
    MERGE (from)-[r:${relation}]->(to)
    RETURN from, r, to`
}

export const createStructure = structure => {
  const result = {
    createNodes: [],
    createRelations: []
  }

  const { label, fqn } = structure
  parseNextElement(result, structure, label, fqn)
  return result
}

const parseNextElement = (result, structure, labelFrom, fqnFrom) => {
  const { type, label, fqn } = structure

  switch(type) {
    case 'Node':
    case 'Reference':
      {
        const properties = structure.properties || {}
        result.createNodes.push(createOrUpdateNode(label, { fqn, ...properties }))

        if (structure.relatedBy) {
          const { relatedBy } = structure
          if (Array.isArray(relatedBy)) {
            relatedBy.forEach(o => parseNextElement(result, o, label, fqn))
          } else {
            parseNextElement(result, relatedBy, label, fqn)
          }
        }
      }
      break
    case 'Relation':
      {
        const { relatedTo } = structure
        const nodes = Array.isArray(relatedTo) ? relatedTo : [relatedTo]

        nodes.forEach(node => {
          const properties = { fqnFrom, fqnTo: node.fqn }
          result.createRelations.push(relateNodes(labelFrom, label, node.label, properties))
          parseNextElement(result, node, labelFrom, fqnFrom)
        })
      }
      break
    default:
      throw new Error(`Unknown type '${type}`)
  }
}

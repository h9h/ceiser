import Queue from './Queue'
import printTree from './printTree'

class Node {
  constructor (node, equality) {
    this.node = node
    this.parent = null
    this.children = []
    this.equality = equality
  }

  getData = () => this.node

  nodeEquals = (node) => {
    if (node instanceof Node) return this.equality(node.node, this.node)
    return this.equality(node, this.node)
  }
}

/**
 * Tree Structure
 *
 * ## Traversals
 * Breadth-first or Depth-first
 *
 * A visitor can return void (this is the standard case), or, to enable breaking off the traversal
 * can return an object with 'data' and 'doStop'. If doStop === true, data will be returned
 */
class Tree {
  constructor (node, equality = (a, b) => a === b) {
    this.equality = equality
    this._root = this.newNode(node)
  }

  newNode = (node) => {
    if (node instanceof Node) return node
    return new Node(node, this.equality)
  }

  traverseDF = (visitor) => {
    // this is a recurse and immediately-invoking function
    (function recurse (currentNode) {
      // step 2
      currentNode.children.forEach(recurse)
      // step 3
      const result = visitor(currentNode)
      if (result && result.doStop) return result.data

      // step 1
    })(this._root)
  }

  traverseBF = (visitor) => {
    const queue = new Queue()
    let currentTree = this._root

    while (currentTree) {
      currentTree.children.forEach(queue.enqueue)
      const result = visitor(currentTree)
      if (result && result.doStop) return result.data
      currentTree = queue.dequeue()
    }
  }

  findNode = (node, searchBreadthFirst = true) => {
    const searchNode = this.newNode(node)
    const visitor = (aNode) => aNode.nodeEquals(searchNode) ? { data: aNode, doStop: true } : null
    return searchBreadthFirst ? this.traverseBF(visitor): this.traverseDF(visitor)
  }

  add = (data, toParent) => {
    const child = this.newNode(data)
    const parent = this.findNode(this.newNode(toParent))

    if (parent) {
      parent.children.push(child)
      child.parent = parent
    } else {
      throw new Error('Cannot add node to a non-existent parent.')
    }
  }

  addTree = (tree, toData) => {
    this.add(tree._root, toData)
  }

  remove = (data, preserveChildren = true) => {
    const findIndex = (arr, searchNode) => {
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].nodeEquals(searchNode)) {
          return index
        }
      }
      return undefined
    }

    // find parent
    const searchNode = this.newNode(data)
    const node = this.findNode(searchNode)
    const parent = node ? node.parent: undefined

    if (parent) {
      // find node as child of parent
      const index = findIndex(parent.children, node)
      if (index === undefined) {
        throw new Error('Node to remove does not exist.')
      } else {
        const delNode = parent.children[index]

        if (preserveChildren) {
          // move children of node to be removed to parent
          delNode.children.forEach(c => c.parent = parent)
          parent.children.push(...delNode.children)
        }

        // remove node from parent
        return parent.children.splice(index, 1)
      }
    } else {
      throw new Error('Parent does not exist.')
    }
  }

  toString = () => {
    return printTree(this._root)
  }
}

export default Tree

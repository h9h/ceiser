class Node {
  constructor(data) {
    this.data = data
    this.parent = null
    this.children = []
  }
}

class Tree {
  constructor(data) {
    this._root = new Node(data)
  }

  traverseDF = function(callback) {
    // this is a recurse and immediately-invoking function
    (function recurse(currentNode) {
      // step 2
      currentNode.children.forEach(recurse)
      // step 3
      callback(currentNode)

      // step 1
    })(this._root)
  }

  traverseBF = function(callback) {
    const queue = new Queue()
    queue.enqueue(this._root)

    currentTree = queue.dequeue()

    while(currentTree){
      currentTree.children.forEach(queue.enqueue)
      callback(currentTree);
      currentTree = queue.dequeue()
    }
  }

  contains = function(callback, traversal) {
    traversal.call(this, callback)
  }

  add = function(data, toData, traversal) {
    const child = new Node(data)
    let parent = null

    const callback = function(node) {
        if (node.data === toData) {
          parent = node;
        }
      };

    contains(callback, traversal)

    if (parent) {
      parent.children.push(child)
      child.parent = parent
    } else {
      throw new Error('Cannot add node to a non-existent parent.');
    }
  }

  remove = function(data, fromData, traversal) {
    let parent = null

    const callback = function(node) {
      if (node.data === fromData) {
        parent = node;
      }
    }

    contains(callback, traversal);

    if (parent) {
      const index = findIndex(parent.children, data);

      if (index === undefined) {
        throw new Error('Node to remove does not exist.');
      } else {
        return parent.children.splice(index, 1);
      }
    } else {
      throw new Error('Parent does not exist.');
    }
  }

  findIndex = (arr, data) => {
    let index;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].data === data) {
        index = i;
      }
    }

    return index;
  }
}

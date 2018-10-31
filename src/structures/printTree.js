const printTree = (initialTree, printNode = node => JSON.stringify(node.node)) => {
  let result = 'Tree:'

  function printBranch (tree, branch) {
    const isGraphHead = branch.length === 0
    const children = tree.children || []
    let branchHead = ''
    if (!isGraphHead) {
      branchHead = children && children.length !== 0 ? '┬ ' : '─ '
    }

    const toPrint = printNode(tree, `${branch}${branchHead}`)
    if (typeof toPrint === 'string') {
      result += '\n' + `${branch}${branchHead}${toPrint}`
    }

    let baseBranch = branch
    if (!isGraphHead) {
      const isChildOfLastBranch = branch.slice(-2) === '└─'
      baseBranch = branch.slice(0, -2) + (isChildOfLastBranch ? '  ' : '| ')
    }

    const nextBranch = baseBranch + '├─'
    const lastBranch = baseBranch + '└─'
    children.forEach((child, index) => {
      printBranch(child, children.length - 1 === index ? lastBranch : nextBranch)
    })

  }

  printBranch(initialTree, '')
  return result
}

export default printTree

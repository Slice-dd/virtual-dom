
function diff(oldNode, newNode) {
  walk(oldNode, newNode)
}

function walk(oldNode, newNode, parent) {
  if (!newNode) {
    oldNode.diff = [{ type: 'REMOVE' }]
  } else if (!oldNode) {
    if (!parent.diff) {
      parent.diff = []
    }
    parent.diff.push({ type: 'ADD', newNode })
  } else if (isStringOrNumber(oldNode) && isStringOrNumber(newNode)) {
    if (oldNode !== newNode) {
      if (!parent.diff) {
        parent.diff = []
      }
      parent.diff.push({ type: 'TEXT', text: newNode })
    }
  } else if (oldNode.type === newNode.type) {
    let attr = diffAttr(oldNode.props, newNode.props)
    if (Object.keys(attr).length > 0) {
      oldNode.diff = [{ type: 'ATTR', attr }]
    }
    diffChildren(oldNode.children, newNode.children, oldNode)
  } else {
    oldNode.diff = [{ type: 'REPLACE', newNode }]
  }
}

function isStringOrNumber(string) {
  const type = typeof string
  return ['string', 'number'].includes(type)
}

function diffChildren(oldChildren, newChildren, oldNode) {

  if (newChildren.length > oldChildren.length) {
    newChildren.forEach((child, index) => {
      walk(oldChildren[index], child, oldNode)
    })
  } else {
    oldChildren.forEach((child, index) => {
      walk(child, newChildren[index], oldNode)
    })
  }
}

function diffAttr(oldAttrs, newAttrs) {
  const patches = {}
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patches[key] = newAttrs[key]
    }
  }

  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      patches[key] = newAttrs[key]
    }
  }

  return patches
}


export default diff
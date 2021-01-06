import { Element, render, setAttrs, createTextNode } from './element'

function patch(node, wm) {
  walk(node, wm)
}

function walk(node, wm) {
  // debugger

  const virtualDom = wm.get(node) || {}
  const { diff } = virtualDom

  if (diff) {
    doPatch(node, diff, wm)
  }

  if (!isInPage(node)) {
    return
  }

  let childNodes = node.childNodes
  let len = childNodes.length

  for (let i = 0; i < len; i++) {
    walk(childNodes[i], wm)
  }

}

function isInPage(node) {
  return document.body.contains(node)
}

function doPatch(node, patches, wm) {

  patches.forEach(patch => {
    let { newNode } = patch
    switch (patch.type) {
      case 'ATTR':
        for (let key in patch.attr) {
          let value = patch.attr[key]
          if (value) {
            setAttrs(node, key, value)
          } else {
            node.removeAttribute(key)
          }
        }
        break

      case 'TEXT':
        node.textContent = patch.text
        break

      case 'REPLACE':
        newNode = newNode instanceof Element ? render(newNode, wm) : createTextNode(newNode, wm)
        node.parentNode.replaceChild(newNode, node)
        break

      case 'REMOVE':
        node.parentNode.replaceChild(document.createComment(''), node)
        break

      case 'ADD':
        newNode = newNode instanceof Element ? render(newNode, wm) : createTextNode(newNode, wm)
        node.appendChild(newNode)
        break

      default:
        break
    }
  })
}


export default patch
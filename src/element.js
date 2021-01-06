class Element {
  constructor(type, props = {}, children = []) {
    this.type = type
    this.props = props
    this.children = children.map(child => child.type ? createElement(child) : child)
  }
}

function createElement({ type, props, children }) {
  return new Element(type, props, children)
}

function render(dom, wm) {
  let el = document.createElement(dom.type)

  wm.set(el, dom)

  for (let key in dom.props) {
    setAttrs(el, key, dom.props[key])
  }

  dom.children.forEach(child => {
    child = child instanceof Element ? render(child, wm) : createTextNode(child, wm)
    el.appendChild(child)
  })

  return el
}

function createTextNode(node, wm) {
  const textNode = document.createTextNode(node)
  wm.set(textNode, node)
  return textNode
}

function renderDom(el, target) {
  target.appendChild(el)
}

function setAttrs(el, key, value) {
  switch (key) {
    case 'value':
      const tagName = el.tagName.toLowerCase()
      if (tagName === 'input' || tagName === 'textarea') {
        el.value = value
      } else {
        el.setAttribute(key, value)
      }
      break

    case 'style':
      el.style.cssText = value
      break

    default:
      el.setAttribute(key, value)
  }
}


export {
  Element,
  createElement,
  createTextNode,
  render,
  renderDom,
  setAttrs
}
import { Component, DOMNode, PreRenderNode } from "./types.d"


function setStyles (el, styles) {
  Object.keys(styles).forEach((propName) => {
    if (propName in el.style) {
      el.style[propName] = styles[propName]
    } else {
      console.warn(`${propName} is not a valid style for element <${el.tagname}>`)
    }
  })
}

function isValidProp (el, prop) {
  return prop !== "children" && prop in el
}

const expandTree = (node: PreRenderNode | string): DOMNode | string => {
  if (typeof node === "string") {
    return node
  }

  return {
    kind: 'dom',
    type: 'test',
    props: {
      children: ['blah']
    }
  }
}

// Takes in tree of DOM nodes, outputs
const createDOM = (tree: DOMNode | string ) => {
  if (typeof tree === "string") {
    return document.createTextNode(tree)
  }

  const el = document.createElement(tree.type)

  // Apply attributes to element
  Object.keys(tree.props)
    .filter((prop) => isValidProp(el, prop))
    .forEach((prop) => {
      const value = tree.props[prop]
      if (prop === `style`) {
        setStyles(el, value)
      } else {
        el[prop] = value
      }
    })

  tree.props.children.forEach( child => {
    el.appendChild(createDOM(child))
  } )

  return el
}

const WeeactDOM = {
    render(tree: PreRenderNode | string, ele: any) {

      // NOTES
      // - Tools
      //  - temporarily show virtual dom tree in  <pre/>
      const prerenderTree = document.querySelector('.prerender-tree')
      prerenderTree.textContent = JSON.stringify(tree, (key: any, val: any) => {
        return (typeof val === 'function') ? val.toString() : val
      }, 2)
      
      

      // 1) reduce all `Component` nodes down to DOMNodes
      const expandedDomTree = expandTree(tree)

      const virtualDom = document.querySelector('.vdom')
      virtualDom.textContent = JSON.stringify(expandedDomTree, null, 2)


      // 2) create DOM tree out of virtual tree, mount to `ele`
      ele.appendChild(createDOM(expandedDomTree))
    }
}

export default WeeactDOM




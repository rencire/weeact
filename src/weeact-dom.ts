import { TreeNode } from "./types.d"


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

const createDOM = (tree: TreeNode | string ) => {
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
    render(tree: TreeNode | string, ele: any) {
        // 1) reduce all `Component` types down to virtual dom nodes, so that whole tree is just virtual dom nodes
        // 2) create DOM tree out of virtual tree, mount to `ele`

      // NOTES
      // - Tools
      //  - temporarily show virtual dom tree in  <pre/>
      const vtree = document.querySelector('.vtree')
      vtree.textContent = JSON.stringify(tree, null, 2)


      ele.appendChild(createDOM(tree))
    }
}

export default WeeactDOM




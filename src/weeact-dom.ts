import { Tree, DOMNode, Node, Component } from "./types.d"


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


const expandTree = (tree: Tree): DOMNode | string => {
  if (typeof tree === "string") {
    return tree
  }


  if (tree.kind === 'dom') {
    // return dom node
    return {
      ...tree,
      props: {
        ...tree.props,
        children: tree.props.children.map( (child: Tree): DOMNode | string => expandTree(child))
      }
    }
  }


  // // if tree.type is a Component
  if (tree.kind === 'comp'  && isComponent(tree.type) ) {
    const Constructor = tree.type
    const instance = new Constructor(tree.props)
  // //   //  // Add new instance to current tree
  // //   // tree.comp = instance
    return expandTree(instance.render())
  }

  // if  functional stateless component
  if (tree.kind === 'comp' && typeof tree.kind === 'function') {
    return expandTree(tree.type(tree.props))
  }
}

const isComponent = (type): boolean => {
  return Object.getPrototypeOf(type.prototype) === Component.prototype
}

// Takes in tree of DOM nodes, outputs document.Element
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

  tree.props.children.forEach( (child: DOMNode) => {
      el.appendChild( createDOM(child) )
  } )

  return el
}

const WeeactDOM = {
    render(tree: Node | string, ele: any) {

      // NOTES
      // - `tree` can contain component nodes, dom nodes, or strings
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




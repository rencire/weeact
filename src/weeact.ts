import { Component, DOMNode, Props, Node, Tree, Attributes } from "./types.d"

// Handling rendering
// compare current tree A against previous tree B to find differences
//    - if root elements have different types, remove the DOM tree


// Children can be either: 'string', or non empty Array of objects

// Ex.1
// button(
//   {
//     color: 'red',
//   },
//   'child text',
//   'moar child text'
// )

// createElement('button',
//   {
//     color: 'red',
//   },
//   'child text',
//   'moar child text'
// )


// {
//   type: button,
//   props: {
//     color: 'red',
//     children: ['child text', 'moar child text']
//   }
// }


// Ex.2
// div(
//   'child text',
//   'moar child text'
// )

// createElement('div',
//   'child text',
//   'moar child text'
// )


// {
//   type: 'div',
//   props: {
//     children: ['child text', 'moar child text']
//   }
// }


// Ex.3
// div(
//   'child text',
// )

// createElement('p',
//   'child text'
// )


// {
//   type: 'p',
//   props: {
//     children: ['child text']
//   }
// }



const isProps = (obj: object): obj is Props => {
  return (<Props>obj).children !== undefined
}


const isNode = (obj: object | DOMNode | string): obj is Node => {
  return ["comp", "dom"].includes( (<Node>obj).kind ) &&
         isProps( (<Node>obj).props )
}


const genProps = (
  childOrProps?: Tree | object,
  children: Tree[] = []
): Props => {


  // 0) Node, children
  // 1) string, children
  if (isNode(childOrProps) || typeof childOrProps === 'string') {
    return {
      children: [ childOrProps, ...children ]
    }
  }

  // 2) props, children
  if (typeof childOrProps === 'object' ) {
    return {
      ...<Attributes>childOrProps,
      children
    }
  }

  // 3) childOrProps must exist for there to be children or Props
  return {
    children: []
  }
}

export const createElement = (
  type: Function | Component | string,
  childOrProps?:  Tree | object,
  ...restOfChildren: Tree[]
): Node => {


  const props: Props = genProps(childOrProps, restOfChildren)

  if (typeof type === 'string') {
    return {
      kind: "dom",
      type,
      props
    }
  }

  if (typeof type === 'function') {
    return {
      kind: "comp",
      type,
      props
    }
  }

}





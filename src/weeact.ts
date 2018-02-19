import { Component, DOMNode, Props, Node } from "./types.d"

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


const isDOMNode = (obj: object | DOMNode | string): obj is DOMNode => {
  return (<DOMNode>obj).type !== undefined &&
         isProps( (<DOMNode>obj).props )
}


const genProps = (
  childOrProps?:  Node | object,
  children: Node[] = []
): Props => {

  // 0) childOrProps must exist for there to be children or Props
  if (childOrProps === undefined) {
    return {
      children: []
    }
  }

  // 1) DOMNode, children
  // 2) string, children
  if (isDOMNode(childOrProps) || typeof childOrProps === 'string') {
    return {
      children: [ childOrProps, ...children ]
    }
  }

  // 3) props, children
  if (typeof childOrProps === 'object' ) {
    return {
      ...childOrProps,
      children
    }
  }
}

export const createElement = (
  type: Function | Component | string,
  childOrProps?:  Node | object ,
  ...restOfChildren: Node[]
): DOMNode => {


  const props: Props = genProps(childOrProps, restOfChildren)

  if (typeof type === 'string') {
    return { kind: "dom", type, props }
  }

  if (typeof type === 'function') {
    return type(props)
  }

}





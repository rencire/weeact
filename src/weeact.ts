import { Component, Props, PreRenderNode } from "./types.d"

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



const isPreRenderNode = (obj: object | PreRenderNode | string): obj is PreRenderNode => {
  return (<PreRenderNode> obj).kind === "prerender"
}


const genProps = (
  childOrProps?:  PreRenderNode | string | object,
  children: (PreRenderNode | string)[] = []
): Props<PreRenderNode> => {

  // 0) childOrProps must exist for there to be children or Props
  if (childOrProps === undefined) {
    return {
      children: []
    }
  }

  // 1) DOMPreRenderNode, children
  // 2) string, children
  if (isPreRenderNode(childOrProps) || typeof childOrProps === 'string') {
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

// Create PreRenderNodes to be rendered later
const createPreRenderNode = (
  type: Function | Component | string,
  childOrProps?:  PreRenderNode | string | object,
  ...restOfChildren: (PreRenderNode | string)[]
): PreRenderNode => {

  return {
    kind: "prerender",
    type,
    props: genProps(childOrProps, restOfChildren)
  }
}

export {createPreRenderNode as createElement}




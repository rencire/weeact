import {
  FunctionalComp,
  IAttributes,
  ICompNode,
  IDOMNode,
  IProps,
  Node,
  Tree
} from "./types.d";
import {
  Component,
  CURRENT_RENDERING_COMPONENT_ID,
  isComponentSubClass,
  render
} from "./weeact-dom.js";

export { useState } from "./hooks.js";

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

const isProps = (obj: object): obj is IProps => {
  return (obj as IProps).children !== undefined;
};

const isNode = (obj: object | IDOMNode | string): obj is Node => {
  return (
    typeof obj === "object" &&
    ["comp", "dom"].includes((obj as Node).kind) &&
    isProps((obj as Node).props)
  );
};

const genProps = (
  childOrProps?: Tree | object,
  children: Tree[] = []
): IProps => {
  // 0) Node, children
  // 1) string, children
  if (isNode(childOrProps) || typeof childOrProps === "string") {
    return {
      children: [childOrProps, ...children]
    };
  }

  // 2) props, children
  if (typeof childOrProps === "object") {
    return {
      ...(childOrProps as IAttributes),
      children
    };
  }

  // 3) Default return empty props and children
  return {
    children: []
  };
};

export const createElement = (
  type: (typeof Component) | FunctionalComp | string,
  childOrProps?: Tree | object,
  ...restOfChildren: Tree[]
): Node => {
  const props: IProps = genProps(childOrProps, restOfChildren);

  if (typeof type === "string") {
    return {
      kind: "dom",
      props,
      type
    };
  }

  if (typeof type === "function") {
    return {
      kind: "comp",
      props,
      type: type as FunctionalComp
    };
  }

  if (isComponentSubClass(type)) {
    return {
      kind: "comp",
      props,
      type
    };
  }
};

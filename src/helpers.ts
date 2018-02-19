import { createElement } from "./weeact"
import { ChildNode } from "./types.d"

export const div = (
  childOrProps?:  ChildNode | object,
  ...children: ChildNode[]
) => createElement('div', childOrProps, ...children)

export const p = (
  childOrProps?:  ChildNode | object,
  ...children: ChildNode[]
) => createElement('p', childOrProps, ...children)

export const h1 = (
  childOrProps?:  ChildNode | object,
  ...children: ChildNode[]
) => createElement('h1', childOrProps, ...children)


export const wrap = (comp) => (
  childOrProps?:  ChildNode | object,
  ...children: ChildNode[]
) => createElement(comp, childOrProps, ...children)


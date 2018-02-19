import { createElement } from "./weeact"
import { Node } from "./types.d"

export const div = (
  childOrProps?:  Node | object,
  ...children: Node[]
) => createElement('div', childOrProps, ...children)

export const p = (
  childOrProps?:  Node | object,
  ...children: Node[]
) => createElement('p', childOrProps, ...children)

export const h1 = (
  childOrProps?:  Node | object,
  ...children: Node[]
) => createElement('h1', childOrProps, ...children)


export const wrap = (comp) => (
  childOrProps?:  Node | object,
  ...children: Node[]
) => createElement(comp, childOrProps, ...children)


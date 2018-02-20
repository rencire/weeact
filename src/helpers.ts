import { createElement } from "./weeact"
import { Tree } from "./types.d"

export const div = (
  childOrProps?:  Tree | object,
  ...children: (Tree)[]
) => createElement('div', childOrProps, ...children)

export const p = (
  childOrProps?:  Tree | object,
  ...children: (Tree)[]
) => createElement('p', childOrProps, ...children)

export const h1 = (
  childOrProps?:  Tree | object,
  ...children: (Tree)[]
) => createElement('h1', childOrProps, ...children)


export const wrap = (comp) => (
  childOrProps?:  Tree | object,
  ...children: (Tree)[]
) => createElement(comp, childOrProps, ...children)


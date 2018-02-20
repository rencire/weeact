import { createElement } from "./weeact"
import { PreRenderNode} from "./types.d"

export const div = (
  childOrProps?:  PreRenderNode | string | object,
  ...children: (PreRenderNode | string)[]
) => createElement('div', childOrProps, ...children)

export const p = (
  childOrProps?:  PreRenderNode | string | object,
  ...children: (PreRenderNode | string)[]
) => createElement('p', childOrProps, ...children)

export const h1 = (
  childOrProps?:  PreRenderNode | string | object,
  ...children: (PreRenderNode | string)[]
) => createElement('h1', childOrProps, ...children)


export const wrap = (comp) => (
  childOrProps?:  PreRenderNode | string | object,
  ...children: (PreRenderNode | string)[]
) => createElement(comp, childOrProps, ...children)


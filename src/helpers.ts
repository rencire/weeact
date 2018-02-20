import { Tree } from "./types.d"
import { createElement as c } from "./weeact"


export const wrap = (comp) => (
  childOrProps?:  Tree | object,
  ...children: (Tree)[]
) => c(comp, childOrProps, ...children)


// TODO
// - get a master list of valid html5 tags
const tagList = ['div', 'p', 'h1']

const tagFuncs: any = tagList.reduce((obj, tagName) => {
  obj[tagName] = (childOrProps?:  Tree | object, ...children: (Tree)[]) => c(tagName, childOrProps, ...children)
  return obj
}, {})



export default tagFuncs

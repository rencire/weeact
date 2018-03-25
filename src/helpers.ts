import { Tree } from "./types.d";
import { createElement } from "./weeact.js";

// TODO
// - get a master list of valid html5 tags
const tagList = ["div", "p", "h1", "form"];

const tagFuncs: any = tagList.reduce((obj, tagName) => {
  obj[tagName] = (childOrProps?: Tree | object, ...children: Tree[]) =>
    createElement(tagName, childOrProps, ...children);
  return obj;
}, {});

export default tagFuncs;

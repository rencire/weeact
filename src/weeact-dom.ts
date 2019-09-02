/* tslint:disable:rule no-console */
import { resetStateListHead } from "./hooks";
import { IDOMNode, IProps, Node, Tree } from "./types.d";

export class Component {
  public props: IProps;
  private nonStructural: true;

  constructor(props: IProps) {
    this.props = props;
  }

  public setState() {
    // mark current instance as dirty in PreRender tree
  }
}

function setStyles(el: HTMLElement, styles: object) {
  Object.keys(styles).forEach(propName => {
    if (propName in el.style) {
      el.style[propName] = styles[propName];
    } else {
      console.error(
        `${propName} is not a valid style for element <${el.tagName}>`
      );
    }
  });
}

function isValidProp(el, prop) {
  return prop !== "children" && prop in el;
}

// TODO set current rendering component in this function
// TODO reset last renered component's statelist head position to front of list

// Notes:
// - Assumes that component tree will never change when walking down the tree.
//   Thus, every component can be assigned an unique ID.
//
// - ID corresponds to tree traversal order.  In the case of `expandTree`, it's a pre-order traversal.

const expandTree = (tree: Tree): IDOMNode | string => {
  if (typeof tree === "string") {
    return tree;
  }

  if (tree.kind === "dom") {
    // return dom node
    return {
      ...tree,
      props: {
        ...tree.props,
        children: tree.props.children.map((child: Tree): IDOMNode | string =>
          expandTree(child)
        )
      }
    };
  }

  // At this point, we assume we are dealing with a Component (either Class Component or Functional Component)
  if (tree.kind === "comp") {
    // Reset the previous rending component's stateList head
    // (ugh starting to hate these globals..)
    resetStateListHead();
    CURRENT_RENDERING_COMPONENT_ID += 1;

    // TODO add support for `state` in constructor.
    if (isComponentSubClass(tree.type)) {
      const Constructor = tree.type;

      const instance = new (Constructor as any)(tree.props);
      // TODO think about where to store instance of Component.
      // Add new instance to current tree?
      // tree.comp = instance

      // Set props
      instance.props = tree.props;
      return expandTree(instance.render());
    }

    // if functional stateless component
    if (typeof tree.type === "function") {
      return expandTree(tree.type(tree.props));
    }
  }
};

export const isComponentSubClass = (type: any): boolean => {
  return (
    type.prototype &&
    Object.getPrototypeOf(type.prototype) === Component.prototype
  );
};

// Takes in tree of DOM nodes, outputs document.Element
const createDOM = (tree: IDOMNode | string) => {
  if (typeof tree === "string") {
    return document.createTextNode(tree);
  }

  const el = document.createElement(tree.type);

  // Apply attributes to element
  Object.keys(tree.props)
    .filter(prop => isValidProp(el, prop))
    .forEach(prop => {
      const value = tree.props[prop];
      if (prop === `style`) {
        setStyles(el, value);
      } else {
        el[prop] = value;
      }
    });

  tree.props.children.forEach((child: IDOMNode) => {
    el.appendChild(createDOM(child));
  });

  return el;
};

// TODO Refactor: move these global vars to `weeact.ts`, should not be responsibility of `WeeactDOM`, since its just a component tree.
let ROOT_TREE = null;
let ROOT_ELE = null;
let DEBUG = false;
export let CURRENT_RENDERING_COMPONENT_ID = 0;

export const render = () => {
  const tree = ROOT_TREE;
  const ele = ROOT_ELE;
  const debug = DEBUG;

  if (debug) {
    // NOTES
    // - `tree` can contain component nodes, dom nodes, or strings
    //  - temporarily show virtual dom tree in  <pre/>
    const prerenderTree = document.querySelector(".prerender-tree");
    prerenderTree.textContent = JSON.stringify(
      tree,
      (key: any, val: any) => {
        return typeof val === "function" ? val.toString() : val;
      },
      2
    );

    // 1) reduce all ICompNodes to IDOMNodes
    const expandedDomTree = expandTree(tree);

    const virtualDom = document.querySelector(".vdom");
    virtualDom.textContent = JSON.stringify(expandedDomTree, null, 2);

    // 2) create DOM tree out of virtual tree,
    const dom = createDOM(expandedDomTree);

    // 3) mount to `ele`
    ele.innerHTML = "";
    ele.appendChild(dom);
    return;
  }

  ele.innerHTML = "";
  ele.appendChild(createDOM(expandTree(tree)));
  CURRENT_RENDERING_COMPONENT_ID = 0;
};

const WeeactDOM = {
  render(tree: Node | string, ele: any, debug: boolean) {
    // Save the `tree`, so we can re-render everything later.
    // TODO refactor to use a Config pattern, instead of setting a global var in this module;
    ROOT_TREE = tree;
    ROOT_ELE = ele;
    DEBUG = debug;
    render();
  }
};

export default WeeactDOM;

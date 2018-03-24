/* tslint:disable:rule no-console */
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

  // // if we see a component
  if (tree.kind === "comp" && isComponentSubClass(tree.type)) {
    const Constructor = tree.type;

    const instance = new (Constructor as any)(tree.props);
    // //   //  // Add new instance to current tree
    // //   // tree.comp = instance

    // TODO
    // - think about where to store instance of Component.
    // Set props
    instance.props = tree.props;
    return expandTree(instance.render());
  }

  // if functional stateless component
  if (tree.kind === "comp" && typeof tree.type === "function") {
    return expandTree(tree.type(tree.props));
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

const WeeactDOM = {
  render(tree: Node | string, ele: any) {
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
    ele.appendChild(dom);
  }
};

export default WeeactDOM;

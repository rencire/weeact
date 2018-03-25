import Component from "./weeact-dom.js";

export type Node = ICompNode | IDOMNode;
export type Tree = Node | string;

export type FunctionalComp = (...args: any[]) => Tree;

export interface ICompNode {
  kind: "comp";
  type: (typeof Component) | FunctionalComp;
  props: IProps;
}

export interface IDOMNode {
  kind: "dom";
  type: string;
  props: IProps;
}

export interface IProps extends IAttributes {
  children: Array<Node | string>;
}

interface IAttributes {
  className?: string;
  style?: object;
}


export type Node = CompNode | DOMNode
export type Tree = Node | string

export interface CompNode {
  kind: "comp",
  type: Function,
  props: Props
}

export interface DOMNode {
  kind: "dom",
  type: string,
  props: Props
}

export interface Props extends Attributes {
  children: (Node | string)[]
}

interface Attributes {
  className?: string,
  style?: object
}



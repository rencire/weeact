export class Component {
  constructor() {}

}

export interface CompNode {
  kind: "comp",
  comp: Function | Component,
  type: string,
  props: Props
}

export interface DOMNode {
  kind: "dom",
  type: string,
  props: Props
}

export interface Props {
  className?: string,
  style?: object,
  children: (CompNode | DOMNode | string)[]
}


export type Node = DOMNode | string
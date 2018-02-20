export class Component {
  constructor() {}

}

export interface PreRenderNode {
  kind: 'prerender',
  type: Function | Component | string,
  props: Props<PreRenderNode>
}


export interface DOMNode {
  kind: "dom",
  type: string,
  props: Props<DOMNode>
}

export interface Props<Child> extends Attributes {
  children: (Child | string)[]
}

interface Attributes {
  className?: string,
  style?: object,
}



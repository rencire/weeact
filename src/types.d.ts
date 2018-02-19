export interface TreeNode {
  type: string,
  props: Props
}

export interface Props {
  className?: string,
  style?: object,
  children: (string | TreeNode)[]
}

export type ChildNode = TreeNode | string
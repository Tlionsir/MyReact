import diff from './diff';

/**
 * render函数
 * @param virtualDOM
 * @param container
 * @param oldDOM 默认值为根节点的第一个子元素（react的每个组件都需要一个根节点包裹）
 */
export default function render(virtualDOM, container, oldDOM = container.firstChild) {
  diff(virtualDOM, container, oldDOM);
}

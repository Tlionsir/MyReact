import mountElement from './mountElement';
import updateTextNode from './updateTextNode';

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
  // 判断 oldDOM 是否存在
  // 1.如果不存在的情况下直接挂载virtualDOM，适用于组件初次渲染
  if (!oldDOM) {
    mountElement(virtualDOM, container);
  }
  // 2.如果存在且类型相同的情况
  else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // 判断节点类型：
    // 如果是文字节点，直接更新节点内容
    if (virtualDOM.type === 'text') {
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    }
  }
}

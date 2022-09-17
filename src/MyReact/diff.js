import mountElement from './mountElement';
import updateTextNode from './updateTextNode';
import updateNodeElement from './updateNodeElement';
import diffComponent from './diffComponent';

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
  // 判断 oldDOM 是否存在
  // 1.如果不存在的情况下直接挂载virtualDOM，适用于组件初次渲染
  if (!oldDOM) {
    mountElement(virtualDOM, container);
  }
  // 3.如果要对比的两个子节点类型不同，且节点类型不是组件类型
  else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 不需要对比，直接使用新的virtualDOM生成DOM对象
    const newElement = createElement(virtualDOM);
    oldDOM.parentNode.replaceChild(newElement, oldDOM);
  }
  // 4.组件类型更新
  else if (typeof virtualDOM.type === 'function') {
    diffComponent(virtualDOM, oldComponent, oldDOM, container);
  }
  // 2.如果存在且类型相同的情况
  else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // 判断节点类型：
    // 如果是文字节点，直接更新节点内容
    if (virtualDOM.type === 'text') {
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 元素节点则更新属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
    }
  }
}

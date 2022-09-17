import mountElement from './mountElement';
import updateTextNode from './updateTextNode';
import updateNodeElement from './updateNodeElement';
import diffComponent from './diffComponent';
import unMountNode from './unMountNode';

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

    // 处理真正的diff逻辑：带key和不带key的情况
    // 1.将拥有key属性的子元素放在一个单独的对象中
    const keyedElements = {};
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      let domElement = oldDOM.childNodes[i];
      // 只处理元素节点
      if (domElement.nodeType === 1) {
        const key = domElement.getAttribute('key');
        if (key) {
          keyedElements[key] = domElement;
        }
      }
    }
    // 判断不带key属性的元素的数量是否为 0
    const hasNoKey = Object.keys(keyedElements).length === 0;
    // 处理不带key的情况
    if (hasNoKey) {
      // 对比子节点
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i]);
      });
    } else {
      // 处理带key的情况
      // 2.循环 virtualDOM 的子元素，获取子元素的key属性
      virtualDOM.children.forEach((child, i) => {
        const key = child.props.key;
        if (key) {
          // 如果key存在，取出元素
          const document = keyedElements[key];
          if (document) {
            // 3.看看当前位置的元素是不是我们期望的元素
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== document) {
              // 如果不是，将新元素插入到旧元素之前
              oldDOM.insertBefore(document, oldDOM.childNodes[i]);
            }
          } else {
            // 新增元素
            const addElement = true;
            mountElement(child, oldDOM, oldDOM.childNodes[i], addElement);
          }
        }
      });
    }

    // 删除旧节点
    // 1.获取旧节点
    const oldChildNodes = oldDOM.childNodes;
    // 2.判断旧节点的数量如果大于新节点的数量，则执行删除操作
    if (oldChildNodes.length > virtualDOM.children.length) {
      if (hasNoKey) {
        // 有节点需要被删除，倒序删除
        for (let i = oldChildNodes.length; i > virtualDOM.children.length; i--) {
          unMountNode(oldChildNodes[i]);
        }
      } else {
        // 通过key属性删除节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          const oldChild = oldChildNodes[i];
          const oldChildKey = oldChild._virtualDOM.props.key;
          let found = false;
          for (let j = 0; j < virtualDOM.children.length; j++) {
            if (oldChildKey === virtualDOM.children[j].props.key) {
              found = true;
              break;
            }
          }
          if (!found) {
            unMountNode(oldChild);
          }
        }
      }
    }
  }
}

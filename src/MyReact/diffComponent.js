import mountElement from './mountElement';
import updateComponent from './updateComponent';

/**
 * 组件类型对比
 * 区分同一组件和不同组件
 * @param virtualDOM 组件本身的 virtualDOM 对象 通过它可以获取到组件最新的 props
 * @param oldComponent 要更新的组件的实例对象 通过它可以调用组件的生命周期函数 可以更新组件的 props 属性 可以获取到组件返回的最新的 Virtual DOM
 * @param oldDOM 要更新的 DOM 对象，在更新组件时 需要在已有DOM对象的身上进行修改 实现DOM最小化操作 获取旧的 Virtual DOM 对象
 * @param container 如果要更新的组件和旧组件不是同一个组件 要直接将组件返回的 Virtual DOM 显示在页面中 此时需要 container 做为父级容器
 */
export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) {

  if (isSameComponent(virtualDOM, oldComponent)) {
    // 同一组件，做组件更新操作
    updateComponent(virtualDOM, oldComponent, oldDOM, container);
  } else {
    // 不同组件，直接调用 mountElement 重新渲染
    mountElement(virtualDOM, container, oldDOM);
  }
}

/**
 * 判断是否为同一组件
 * 判断条件为 virtualDOM 中类组件函数是否为旧组件的构造函数
 * @param virtualDOM
 * @param oldComponent
 * @returns {boolean}
 */
function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor;
}

/**
 * 判断 virtualDOM 是否为组件类型
 */

export default function isFunction(virtualDOM) {
  return virtualDOM && typeof virtualDOM.type === 'function';
}

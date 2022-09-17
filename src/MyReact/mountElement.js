import mountNativeElement from './mountNativeElement';
import isFunction from './isFunction';
import mountComponent from './mountComponent';

export default function mountElement(virtualDOM, container, oldDOM,addElement) {
  // Component：组件类型 或 NativeElement：节点类型
  if (isFunction(virtualDOM)) {
    // 组件类型通过 mountComponent 方法进行组件渲染
    mountComponent(virtualDOM, container, oldDOM, addElement);
  } else {
    // 节点类型通过调用mountNativeElement方法转换NativeElement
    mountNativeElement(virtualDOM, container, oldDOM, addElement);
  }
}

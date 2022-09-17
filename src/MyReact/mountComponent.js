/**
 * 渲染组件类型
 * 需要再单独对函数组件和类组件分别处理
 */
import isFunctionComponent from './isFunctionComponent';
import isFunction from './isFunction';
import mountNativeElement from './mountNativeElement';

export default function mountComponent(virtualDOM, container, oldDOM) {
  // 保存组件构建后的结果
  let nextVirtualDOM = null;
  // 保存类组件的实例
  let component = null;
  if (isFunctionComponent(virtualDOM)) {
    // 函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM);
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM);
    component = nextVirtualDOM.component;
  }
  // 获取nextVirtualDOM后再次判断类型是否是函数类型
  if (isFunction(nextVirtualDOM)) {
    // 函数类型，递归调用mountComponent
    mountComponent(nextVirtualDOM, container, oldDOM);
  } else {
    // 非函数类型，直接构建节点，生成DOM元素
    mountNativeElement(nextVirtualDOM, container, oldDOM);
  }
  // 如果类组件实例存在
  if (component) {
    // 调用实例属性中的生命周期函数
    component.componentDidMount();
    // 如果组件实例的props属性上有ref属性，则将组件实例传给ref方法
    if (component.props && component.props.ref) {
      component.props.ref(component);
    }
  }
}

function buildFunctionComponent(virtualDOM) {
  // 函数组件的 virtualDOM.type 为函数组件本身，调用时将props属性传给组件
  return virtualDOM.type(virtualDOM.props || {});
}

function buildClassComponent(virtualDOM) {
  // 类组件的 virtualDOM.type 为类组件本身，调用时将props属性传给组件
  // 获取类组件实例
  const component = new virtualDOM.type(virtualDOM.props || {});
  // 调用实例的render方法生成virtualDOM
  const nextVirtualDOM = component.render();
  // 将组件的实例挂载到virtualDOM上，则后续在virtualDOM上就可以直接使用组件的实例
  nextVirtualDOM.component = component;
  return nextVirtualDOM;
}

import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';

/**
 * 将virtualDOM转换为真是的DOM节点
 * @param virtualDOM
 * @returns {null}
 */
export default function createDOMElement(virtualDOM) {
  let newElement = null;
  // 创建DOM节点时区分文字节点和非文字节点
  if (virtualDOM.type === 'text') {
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 非文字节点处理
    newElement = document.createElement(virtualDOM.type);
    // 为元素节点添加/更新属性
    updateNodeElement(newElement, virtualDOM);
  }
  // 将virtualDOM挂载到element节点上
  newElement._virtualDOM = virtualDOM;
  // 递归处理所有子节点
  virtualDOM.children.forEach(child => {
    // 因为不确定子元素是 NativeElement 还是Component 所以调用 mountElement 方法进行分类处理
    // 并且此时父节点 newElement 就变成了所有子节点的挂载点
    mountElement(child, newElement);
  });
  // 处理元素节点的ref属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement);
  }
  return newElement;
}

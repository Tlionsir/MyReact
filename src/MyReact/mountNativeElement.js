import createDOMElement from './createDOMElement';
import unMountNode from './unMountNode';

export default function mountNativeElement(virtualDOM, container, oldDOM) {
  // 将虚拟DOM转换成DOM对象
  const newElement = createDOMElement(virtualDOM);

  // 根据oldDOM是否存在，添加对比逻辑
  if (oldDOM) {
    // 如果旧的节点存在，则将新节点插入到旧节点前方
    container.insertBefore(newElement, oldDOM);
  } else {
    // 如果旧的节点不存在则将创建好的DOM对象进行挂载
    container.appendChild(newElement);
  }


  // 获取组件的实例对象
  const component = virtualDOM.component;
  // 如果组件实例对象存在
  if (component) {
    // 判断旧节点是否存在，存在则删除
    if (oldDOM) {
      unMountNode(oldDOM);
    }
    // 将DOM对象存储在类组件实例对象中
    component.setDOM(newElement);
  }
}

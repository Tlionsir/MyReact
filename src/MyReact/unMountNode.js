/**
 * 删除节点，如果是组件的话同时调用组件卸载时的生命周期函数
 * @param node
 */
export default function unMountNode(node) {
  // 获取节点的 _virtualDOM 对象
  const virtualDOM = node._virtualDOM;

  // 1.文本节点可以直接删除
  if (virtualDOM.type === 'text') {
    node.remove();
    // 阻止程序向下运行
    return;
  }

  // 2.看下节点是否由组件生成的
  const component = virtualDOM.component;
  // 如果component 存在，说明节点是组件生成的，调用组件卸载生命周期函数
  if (component) {
    component.componentWillUnmount();
  }

  // 3.看下节点上是否有ref属性,有则清除引用
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null);
  }

  // 4.看下节点中是否有事件属性，清除事件属性
  Object.keys(virtualDOM.props)
    .forEach(propsName => {
      if (propsName.slice(0, 2) === 'on') {
        const eventName = propsName.toLowerCase()
          .slice(2);
        const eventHandler = virtualDOM.props[propsName];
        node.removeEventListener(eventName, eventHandler);
      }
    });

  // 递归处理子节点
  if (node.childNodes.length > 0) {
    // 方法一：
    for (let i = 0; i < node.childNodes.length; i++) {
      unMountNode(node.childNodes[i]);
      // 每次移除后都会导致 node.childNodes.length 变化，所以需要保证 i 的有效性
      i--;
    }
    // // 方法二：
    // while (node.childNodes.length > 0) {
    //   const currentNode = node.childNodes.pop();
    //   unMountNode(currentNode);
    // }
  }

  // 属性事件等解除后再删除节点
  node.remove();
}

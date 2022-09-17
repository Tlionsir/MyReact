export default function createElement(type, props, ...children) {
  /**
   * 1.对原有的子元素数组进行拷贝，然后在拷贝出的内容上操作
   * 2.构建 virtualDom 结构
   *  i.判断子节点是否为对象把文本节点区分出来单独处理
   *  ii.针对子节点中的 bool 值和 null 进行处理，筛除不展示
   *  iii.将 children 属性挂在到 props 下
   */
  // concat 可用做处理多维数组拍平
  const childElements = [].concat(...children)
    .reduce((result, child) => {
      if (child !== false && child !== true && child !== null) {
        if (child instanceof Object) {
          result.push(child);
        } else {
          result.push(createElement('text', { textContent: child }));
        }
      }
      return result;
    }, []);
  return {
    type,
    props: Object.assign({ children: childElements }, props),
    children: childElements
  };
}

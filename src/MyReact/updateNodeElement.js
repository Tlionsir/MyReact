/**
 * 初次渲染时是为元素节点添加属性
 * 再次渲染时可以对比更新元素身上的属性及事件
 */
export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM = {}) {
  // 1.获取节点对应的属性对象 props
  const newProps = virtualDOM.props || {};
  const oldProps = oldVirtualDOM.props || {};

  // 2.初次渲染时给元素添加属性，再次渲染时对比旧属性进行添加更新操作
  Object.keys(newProps)
    .forEach(propName => {
      // 获取属性值
      const newPropsValue = newProps[propName];
      const oldPropsValue = oldProps[propName];

      // 判断不等的情况下已经包含了初次渲染时的情况
      // 因为初次渲染时 newPropsValue 为 undefined
      if (newPropsValue !== oldPropsValue) {
        // 1.判断属性是否为事件属性 onClick -> click,onChange -> change
        if (propName.slice(0, 2) === 'on') {
          const eventName = propName.toLowerCase()
            .slice(2);
          newElement.addEventListener(eventName, newPropsValue);
          // 删除原有的事件的事件处理函数
          if (oldPropsValue) {
            newElement.removeEventListener(eventName, oldPropsValue);
          }
        }
        // 2.针对value值和checked需要使用对象属性的方式赋值
        else if (propName === 'value' || propName === 'checked') {
          newElement[propName] = newPropsValue;
        }
        // 3.针对于非 children 属性可以直接通过setAttribute设置值
        else if (propName !== 'children') {
          if (propName === 'className') {
            newElement.setAttribute('class', newPropsValue);
          } else {
            newElement.setAttribute(propName, newPropsValue);
          }
        }
      }
    });

  // 判断属性被删除的情况
  // 属性被删除时 oldVirtualDOM 内存在，virtualDOM 内不存在
  Object.keys(oldProps)
    .forEach(propName => {
      // 获取属性值
      const newPropsValue = newProps[propName];
      const oldPropsValue = oldProps[propName];
      if (!newPropsValue) {
        // 1.移除事件
        if (propName.slice(0, 2) === 'on') {
          const eventName = propName.toLowerCase()
            .slice(2);
          newElement.removeEventListener(eventName, oldPropsValue);
        }
        // 处理非 children 属性
        else if (propName !== 'children') {
          if (propName === 'value') {
            newElement.value = '';
          } else {
            newElement.removeAttribute(propName);
          }
        }
      }
    });
}

/**
 * 同一组件的更新操作，同时可以调用组件更新过程中的生命周期函数
 * @param virtualDOM
 * @param oldComponent
 * @param oldDOM
 * @param container
 */
import diff from './diff';

export default function updateComponent(virtualDOM, oldComponent, oldDOM, container) {
  // 1.调用componentWillReceiveProps
  const newProps = virtualDOM.props;
  oldComponent.componentWillReceiveProps(newProps);
  // 2.调用shouldComponentUpdate
  if (oldComponent.shouldComponentUpdate(newProps)) {
    // 获取未更新前的props
    let prevProps = oldComponent.props;
    // 3.调用componentWillUpdate
    oldComponent.componentWillUpdate(newProps);
    // 调用父类的updateProps方法更新props属性
    oldComponent.updateProps(newProps);
    // 获取组件返回的最新的 virtualDOM
    const nextVirtualDOM = oldComponent.render();
    // 更新 component 组件的实例对象
    nextVirtualDOM.component = oldComponent;
    // 更新操作完成后进行diff对比
    diff(nextVirtualDOM, container, oldDOM);
    // 4.调用componentDidUpdate
    oldComponent.componentDidUpdate(prevProps);
  }
}

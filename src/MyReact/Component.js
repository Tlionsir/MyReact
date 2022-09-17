import diff from './diff';

export default class Component {
  constructor(props) {
    // 初始化组件的props属性
    this.props = props;
  }

  setState(state) {
    // 设置子组件的setState方法
    // 将新的state属性更新到旧的state上
    this.state = Object.assign({}, this.state, state);
    // 获取最新要渲染的virtualDOM对象,通过调用组件的render方法生成
    const virtualDOM = this.render();
    // 获取旧的virtualDOM对象，进行对比
    const oldDOM = this.getDOM();
    // 通过旧的virtualDOM可以获取到组件的容器对象
    const container = oldDOM.parentNode;
    // 通过diff方法对比后渲染到页面
    diff(virtualDOM, container, oldDOM);
  }

  setDOM(dom) {
    // 在类组件实例化时挂载到类实例上
    this._dom = dom;
  }

  getDOM() {
    return this._dom;
  }

  // 更新props属性
  updateProps(props) {
    this.props = props;
  }

  // 生命周期函数
  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state;
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentDidUpdate(prevProps, preState) {
  }

  componentWillUnmount() {
  }

}

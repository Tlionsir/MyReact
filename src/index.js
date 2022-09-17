import MyReact from './MyReact';

const root = document.getElementById('root');

// jsx解析测试
const virtualDOM = (
  <div className="container">
    <h1>你好 My React</h1>
    <h2>(编程届扛把子)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert('你好')}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input type="text" value={111}/>
  </div>
);
// MyReact.render(virtualDOM, root);

// 函数组件的 Virtual DOM
// {
//     type: f function() {},
//     props: {}
//     children: []
// }

// 函数组件测试
const HelloWorld = () => <span>hello world!</span>;

// MyReact.render(<HelloWorld/>, root);

// 类组件测试
class TestClass extends MyReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'default title'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ title: 'changed title' });
  }

  render() {
    return (
      <div>
        {this.props.name}
        {this.props.age}
        <div>
          title: {this.state.title}
          <button onClick={this.handleClick}>点击改变title属性</button>
        </div>
      </div>
    );
  }

}

MyReact.render(<TestClass name="张三" age={20} />, root)

// console.log(TestClass);

### 手动实现简易版react
1. 创建 Virtual DOM
   1. 在 React 代码执行前，JSX 会被 Babel 转换为 React.createElement 方法的调用，在调用 createElement 方法时会传入元素的类型，元素的属性，以及元素的子元素，createElement 方法的返回值为构建好的 Virtual DOM 对象。
   2. 

/**
 * 一、learn-react/my-react/src/myReact/creatElement.js
 *    1.对原有的子元素数组进行拷贝，然后在拷贝出的内容上操作
 *    2.构建 virtualDom 结构
 *      i.判断子节点是否为对象把文本节点区分出来单独处理
 *      ii.针对子节点中的 bool 值和 null 进行处理，筛除不展示
 *      iii.将 children 属性挂在到 props 下
 * 二、learn-react/my-react/src/index.html
 *    1.在html文件中添加根节点，方便后续Dom内容挂载
 * 三、创建render函数，处理函数挂在
 *    1.learn-react/my-react/src/myReact/render.js
 *      i.创建render方法，并暴露给框架外部使用
 *      ii.具体功能通过diff方法实现
 *    2.learn-react/my-react/src/myReact/diff.js
 *      i.diff方法内则通过是否存在oldDOM进行区分，
 *      ii.不存在则不需要进行对比，直接调用mountElement处理
 *    3.learn-react/my-react/src/myReact/mountElement.js
 *      mountElement内部来处理当前virtualDOM是否是组件类型的还是普通类型
 *    4.learn-react/my-react/src/myReact/mountNativeElement.js
 *      i.分别对文本节点和元素节点进行构建
 *      ii.递归创建子节点
 *      iii.将转换之后的节点进行页面渲染
 *    5.learn-react/my-react/src/myReact/createDOMElement.js
 *      i.对创建元素节点方法进行抽离
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

import createDOMElement from './createDOMElement';

export default function mountNativeElement(virtualDOM, container) {
  // 将虚拟DOM转换成DOM对象
  const newElement = createDOMElement(virtualDOM);

  // 将创建好的DOM对象进行挂载
  container.appendChild(newElement);
}

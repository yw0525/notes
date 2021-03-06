const MyComponent = {
  // 组件名称
  name: 'MyComponent',
  // 组件的渲染函数，返回值必须为虚拟 DOM
  render() {
    return {
      type: 'div',
      children: '我是文本内容'
    }
  }
}

// 用来描述组件的 VNode 对象，type 属性值为组件的选项对象
const CompVNode = {
  type: MyComponent
}
// 调用渲染器渲染组件
renderer.render(CompVNode, document.querySelector('#app'))

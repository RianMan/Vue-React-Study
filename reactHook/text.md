### hook的学习笔记

- Hook： 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。<b>Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。不要在循环，条件或嵌套函数中调用 Hook。</b>


- useEffect: 是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。

1.  State Hook

- useState: 解构出来两个变量 [count ,setCount ],前面如同我们this.state.count,
后面就是我们的this.setState({count: this.state.count + 1}),而且我们可以在之前的函数式组件或者无状态组件里面使用state了，
因为之前这种傻瓜式组件纯粹的接受父组件的参数渲染，没有任何的行为和能力去修改自己的状态和样式，但是现在具备了这样的能力，解决了一个我们经常不得不因为一个状态去写一个class组件。

2. Effect Hook
- useEffect: 第一个参数副作用的一个函数，第二参数代表修改什么state才执行，非必填
```
useEffect(() => {document.title = `You clicked ${count} times`;},[count])
```

3. 自定义Hook

- 自定义 Hook 必须以 “use” 开头

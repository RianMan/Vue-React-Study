### 探究react-router的原理

1. HashRouer
    - 基于html5的history的原理实现的  window.addEventListener('hashchange',callback);

    - 它是外层的夫组件，下面包含一些子组件，让自组件通过逻辑的判断去实现页面的展示；

    - 在这个router体系里面有三个属性，location，match，history,所以我们自己去实现的时候先去把这三个属性挂载context上面去,那么我们在自组件就可以通过this.context拿到他们的值
    ```
        static childContextTypes = {
            location: PropTypes.string,
            history:  PropTypes.objectOf,
            match:  PropTypes.objectOf,
        }

        getChildContext(){
            return {
                location: this.state.location,
                history:{},
                match:{},
            }
        }
    ```

    - location
        > 它里面包含了一些路由相关的信息
    
    - history
        > 这里面定义了一些路由跳转的方法
    
    - match
        > 这里面可以拿到一些路由的参数

2. Route
    - 里面有几个属性，如 path: 匹配的路径， component：要渲染的组件， exact：是否精确匹配等属性

    - 实现的原理也是通过拿到当前的路径去和我们传入的path进行判断，是就渲染不是就不渲染

    - 然后我们在组件里面通过this.context可以拿到夫组件传来的三个属性
    
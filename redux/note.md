### 学习redux原理

#### redux---createStore

1. 这是redux核心方法之一,导出三个比较重要的函数
        
    >  getState: 获取仓库的状态
    >  dispatch: 通知监听的函数执行，和调用reducer函数
    >  subscribe: 添加一个监听函数，并且返回一个取消监听的函数

    ```
        function CreateStore(reducer,preState){
            let state = preState;
            let listeners = [];

            //给外面提供获取内部state的方法
            function getState(){
                return state;
            }

            //添加事件监听，当调用dispatch的时候触发函数执行
            // 返回一个取消事件监听的函数 
            function subscribe(fn){
                listeners.push(fn);
                return function(){
                    listeners = listeners.filter(v => v!=fn);
                }
            }

            //调用action的改变去触发reducer的变化
            function dispatch(action){
                state = reducer(state,action);
                listeners.forEach((listener) => listener());
            }

            return {getState,dispatch,subscribe}
        }
    ```
    
2. reducer

    > 其实reducer就是一个纯函数，接受一个传入的state得值，根据传入的action的type做不同的逻辑处理，返回一个state

#### redux---combineReducer

1. 对于大型的项目来说，每个组件其实就有一组状态，所以我们必须把action，state，reducer全部的写在一个相同的模块（计数器，列表，...）,这样有个问题我们无法去用单个creatStore传入reducer和preState，所以必须得合并reducer，返回一个新的reducers
    > 其实就是给每一个导出的reducer函数加一个key，放在一个对象里面，且这个key不能重复，由于在react项目这个问题更加不可能发生，所以我们可以去导出我们每一个模块的reducer，然后通过combineReducer函数
    ```
        function combineReducer(reducers){
            //遍历出我们导出对象的一个个keys作为下个总state对象的key，就不会出现key值重复///的情况
            let keys = Object.keys(reducers);

            //不管怎么搞，它肯定是返回一个reducer，而reducer一定返回一个更新后的state，
            //记住这两点就很好去写这个函数，我之前一直卡在这里不会去写
            // 这个函数就是一个普通的reducer，结构都是一模一样
            return function(state={},action){
                const stateObj = keys.reduce((memo,key)=>{
                    //执行了每一个独立reducer，然后返回了一个state挂载到总的对象上

                    //因为在createStore里面其实我们第一次的时候调用了一次dispatch
                    //其实第一次就一次产生一个初始值
                    memo[key] = reducers[key](state[key], action)
                    return memo;
                },{})
                //这个就是我们的初始值，而且我们在每个组件里面就通过key去拿我们对应的组件
                //状态
                return stateObj;
            }
        }
    ```

#### reduc---bindActionCreator

1. 这个函数的作用只是包装了一下我们的actions，让我们定义action更加强大，不需要每次都去dispatch(action.increment)这样去写重复的代码，只需要action.increment即可

    ```
        function bindActionCreator(actions,dispatch){
            //因为actions就是一个对象(规定)，那我们在返回一个增强的对象
            let newAction = {}
            for(key in actions){
                newAction[key] = function(){
                    //这里的arguments就是为了我们后期可以传入一些参数被真正的
                    //actions[key]这个函数接收到然后去调用
                    //例如我们会调用actions.addItem('新内容')
                    dispatch(actions[key].apply(null,arguments))
                }
            }
            return newAction;
        }
    ```
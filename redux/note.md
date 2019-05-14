### 学习redux原理

#### redux---CreateStore
    1. 这是redux核心方法之一
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
    
    2. 这个代码块是redux.creatStore的核心功能和思想，reducer就是一个todolist,也是一个函数执行
        ```
            function reducer(state = initialState,action) {
                switch (action.type) {
                    case CHANGE_TITLE_COLOR:
                        state = {...state,title:{...state.title,color: action.color}};
                        return state
                    case CHANGE_TITLE_TEXT:
                        state = {...state,title:{...state.title,text:action.text}};
                        return state
                    case CHANGE_CONTENT_COLOR:
                        state = {...state,content:{...state.content,color:action.color}};
                        return state
                    case CHANGE_CONTENT_TEXT:
                        state = {...state,content:{...state.content,color:action.text}};
                        return state
                    default:
                        return state
                }
            }
        ```

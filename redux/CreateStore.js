function createStore(preState,reducer){
    let state = preState;
    let listeners = [];

    function getState(){
        return state;
    }

    function subscribe(fn){
        listeners.push(fn);
        //返回一个取消监听的方法
        return function(){
            listeners = listeners.filter(v => v !==fn);
        }
    }

    // 调用一次确保第一次的时候有初始状态
    dispatch({type:'0oooo'})
    function dispatch(action){
        // 接受一个state和action，返回处理后的state
        state = reducer(state,action)
        listeners.forEach(fn => fn());
    }

    return {
        getState,subscribe,dispatch
    }
}

export default createStore;
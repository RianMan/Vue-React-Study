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

    // 调用一次 让state有一个默认值
    dispatch({ type: '@@redux/INIT' });
    //调用action的改变去触发reducer的变化
    function dispatch(action){
        state = reducer(state,action);
        listeners.forEach((listener) => listener());
    }

    return {getState,dispatch,subscribe}
}

export default CreateStore;

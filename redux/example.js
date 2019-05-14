const initialStore = {
    title: { color: 'blue', text: '我是标题' },
    content: { color: 'green', text: '我是段落我是段落我是段落' },
}


const CHANGE_TITLE_COLOR = 'CHANGE_TITLE_COLOR';
const CHANGE_TITLE_TEXT = 'CHANGE_TITLE_TEXT';
const CHANGE_CONTENT_COLOR = 'CHANGE_CONTENT_COLOR';
const CHANGE_CONTENT_TEXT = 'CHANGE_CONTENT_TEXT';


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

// 这里管理我们的状态，找到对应的action做相应的处理
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

const store = CreateStore(reducer,initialStore);


function render() {
    const titleDom = document.getElementById('title');
    const contentDom = document.getElementById('content');
    titleDom.style.color = store.getState().title.color;
    titleDom.innerHTML = store.getState().title.text;
    contentDom.style.color = store.getState().content.color;
    contentDom.innerHTML = store.getState().content.text;
}
render();
store.subscribe(render)
setTimeout(()=>{
    store.dispatch({type:'CHANGE_TITLE_COLOR',color:'pink'});
    store.dispatch({type:'CHANGE_TITLE_TEXT',text:'我是一个粉色的标题'});
},1400)
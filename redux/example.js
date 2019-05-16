const store = {
    title: {color:'#000',text:'我是标题'},
    content: {color:'#777',text:'我是段落'},
}
// 1.首先我们声明了一个仓库去保存我们的状态
const h = document.querySelector('h2');
const p = document.querySelector('p');

function outputHtml(dom,kind){
    return function set(){
        dom.style.color = store[kind].color;
        dom.innerHTML = store[kind].text;
    }
}

let setTitle = outputHtml(h,'title');
let setContent = outputHtml(p,'content');
// 定义一个渲染到页面的函数
function render(){
    setTitle();
    setContent();
}
render();
setTimeout(()=>{
    store.title.color = 'red';
    store.title.text = '我是一个新标题';
    render();
},1000)
// 到此我们定义了一套去渲染仓库里面属性的方法和逻辑

// ------------
/**
    但是我们有个问题
    1. store太暴露了，容易被修改
    2. 修改的动作能不能集中去管理,增加修改的门槛
 */
// 1. 定义了一个dispatch去修改状态
// 为了把 action 和 state 串起来，开发一些函数，这就是 reducer
 function reducer(state,action){
    switch (action.type) {
        case 'CHANGE_TITLE_COLOR':
            state.title.color = action.color;
        case 'CHANGE_TITLE_TEXT':
            state.title.text = action.text;
        case 'CHANGE_CONTENT_COLOR':
            state.content.color = action.color;
        case 'CHANGE_CONTENT_TEXT':
            state.content.text = action.text;
        default:
            return  state;
    }
 }

 
//2. 这样我们最新的修改方式就好了很多，因为更直观，更容易去维护
//3. 接下来吧dispatch里面的东西抽出去，叫做reducer
const changeTitleColorAction = {type:'CHANGE_TITLE_COLOR' ,color:'blue'};
const changeTitleColorText = {type:'CHANGE_TITLE_TEXT' ,text:'我是最帅的标题'};


//  setTimeout(()=>{
//     dispatch(store,changeTitleColorAction)
//     dispatch(store,changeTitleColorText)
//     dispatch(store,{type:'CHANGE_CONTENT_COLOR' ,color:'pink'})
//     dispatch(store,{type:'CHANGE_CONTENT_TEXT' ,text:'我是最帅的段落'})
//     render();
// },2000);
const  { getState,subscribe,dispatch }= createStore(store,reducer)
render()
subscribe(render)
setTimeout(() => {
    dispatch(changeTitleColorAction)
}, 2000);

function createStore(preStore,reducer){
    let store = preStore;
    let listeners = [];

    function getState(){
        return store;
    }

    function subscribe(fn){
        listeners.push(fn);
        //返回一个取消监听的方法
        return function(){
            listeners = listeners.filter(v => v !==fn);
        }
    }

    function dispatch(action){
        reducer(preStore,action)
        listeners.forEach(fn => fn());
        return action;
    }

    return {
        getState,subscribe,dispatch
    }
}
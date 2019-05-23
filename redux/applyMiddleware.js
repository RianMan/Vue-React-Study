export default function(middleware){
    return function(createStore){
        return function(reducres){
            let store = createStore(reducres,{});
            let dispatch;
            let middlewareApi = {
                getState: store.getState,
                dispatch: action => dispatch(action)
            }
            middleware = middleware(middlewareApi);
            dispatch = middleware(store.dispatch);
            return {...store,dispatch}
        }
    }
}
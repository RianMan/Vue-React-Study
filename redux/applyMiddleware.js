import compose from './compose';
export default function(...middlewares){
    return function(createStore){
        return function(reducres){
            let store = createStore(reducres,{});
            let dispatch;
            let middlewareApi = {
                getState: store.getState,
                dispatch: action => dispatch(action)
            }
            middlewares = middlewares.map(mid => mid(middlewareApi));
            dispatch = compose(...middlewares)(store.dispatch);
            return {...store,dispatch}
        }
    }
}
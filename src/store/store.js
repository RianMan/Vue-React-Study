import { createStore,applyMiddleware } from '../../redux';
import reducers from './reducer';



//1.store.dispatch

// let logger1 = function({dispatch,getState}){
//     return function(next){
//         return function(action){
//             console.log('老状态1：',getState());
//             next(action);
//             console.log('新状态1：',getState());
//         }
//     }
// }
let logger = function({dispatch,getState}){
    return function(next){
        return function(action){
            console.log(11)
            console.log('老状态：',getState());
            next(action)
            console.log('新状态：',getState());
        }
    }
}
/**
 * 
function(action){
    console.log('老状态：',getState());
    next = action => {
                    // console.log(dispatch.toLocaleString(),'[0][0]')
                    return dispatch(action)
    },
    next(action)
    console.log('新状态：',getState());
}
 */
/**
 * 
 * 最后的dispatch就是这个
 * function(action){
        if(typeof action === 'function'){
            // 这个dispatch就不是真正的disptach
            action(dispatch,getState)
        }else{
            next(action)
        }
    } 
 */
let time = 1;
let thunk = function({dispatch,getState}){
    return function(next){
        return function(action){
            console.log(time++);
            if(typeof action === 'function'){
                // 这个dispatch就不是真正的disptach
                action(dispatch,getState)
            }else{
                console.log(next.toLocaleString(),'== 60 ==',time)
                next(action)
            }
        }
    }
}

function compose(...funcs){
    return (...args) => {
        console.log(args,'args')
        if (funcs.length === 0) {
          return args[0]
        }
        const last = funcs[funcs.length - 1]
        const rest = funcs.slice(0, -1)
        return rest.reduceRight((composed, f) => f(composed), last(...args))
      }
}
// function applyMiddleware(...middlewares){
//     return function(createstore){
//         return function(reducer){
//             let store = createstore(reducer,{});
//             let dispatch;
//             let middlewareApi = {
//                 getState: store.getState,
//                 dispatch: action => {
//                     // console.log(dispatch.toLocaleString(),'[0][0]')
//                     return dispatch(action)
//                 },
//             }
//             // middlewares = middlewares(middlewareApi)
//             // dispatch = middlewares(store.dispatch);
//             middlewares = middlewares.map(mid => mid(middlewareApi));
//             dispatch = compose(...middlewares)(store.dispatch);
//             return {...store,dispatch}
//         }
//     }
// }
const store = applyMiddleware(logger)(createStore)(reducers);

export default store;
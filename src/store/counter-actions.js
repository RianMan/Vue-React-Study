import * as types from './action-types';

export default {
    increment(){
        return {type: types.INCREMENT}
    },
    decrement(){
        return {type: types.DECREMENT}
    },
    delayIncrement(){
        return function(dispatch){
            setTimeout(() => {
                console.log(dispatch.toLocaleString(),'[][]')
                return dispatch({type: types.INCREMENT})
            }, 1000);
        }
    }
}
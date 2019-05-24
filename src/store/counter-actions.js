import * as types from './action-types';

export default {
    increment(){
        return {type: types.INCREMENT}
    },
    decrement(){
        return {type: types.DECREMENT}
    },
    delayIncrement(){
        return {type: types.DELAY_INCREMENT}
    }
}
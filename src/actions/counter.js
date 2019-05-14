//生产actions

import * as types from './actionType';

export default {
    increment(){
        return {type: types.INCREMENT}
    },
    decrement(){
        return {type: types.DECREMENT}
    }
}
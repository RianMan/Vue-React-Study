//生产actions

import * as types from './actionType';

export const todo = {
    additem(){
        return {type: types.ADDITEM}
    },
    delitem(){
        return {type: types.DELITEM}
    }
}
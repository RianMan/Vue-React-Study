import * as types from './action-types';

export default {
    addItemAction(content){
        return {
            type: types.ADDITEM,
            content
        }
    },
    delItemAction(index){
        return {
            type: types.DELITEM,
            index
        }
    }
}
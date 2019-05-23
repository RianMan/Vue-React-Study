import * as types from './action-types';

let initValue = {
    list:[],
}

export default function(state = initValue,action){
    switch (action.type) {
        case types.ADDITEM:
            return {...state,list:[...state.list,action.content]}
        case types.DELITEM:
            return {...state,list:[...state.list.slice(0,action.index),...state.list.slice(action.index+1)]}
        default:
            return state;
    }
}
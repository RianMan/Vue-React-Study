import * as types from './action-types';

let initValue = []

export default function(state = initValue,action){
    switch (action.type) {
        case types.ADDITEM:
            return [...state,action.content]
        case types.DELITEM:
            return [...state.slice(0,action.index),...state.slice(action.index+1)]
        default:
            return state;
    }
}
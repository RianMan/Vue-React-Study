import * as types from '../actions/actionType';

const initialState = {
    items: []
}
export default function(state = initialState, action){
    switch (action.type) {
        case types.ADDITEM:
            return {...state, items:[...state.items,{content: action.content}]}
        case types.DELITEM:
            return {...state, items:[...state.items.slice(0,action.index),
                ...state.items.slice(action.index + 1)]}
        default:
            return state;
    }
}
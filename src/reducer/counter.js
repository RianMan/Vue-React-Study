import * as types from '../actions/actionType';
let initialState = {
    number: 0,
}
export default function(state=initialState,action){
    switch (action.type) {
        case types.INCREMENT:
            console.log(state)
            return {number:state.number + 1}
        case types.DECREMENT:
            return {number:state.number - 1}
        default:
            return state;
    }
}
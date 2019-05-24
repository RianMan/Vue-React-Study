import * as types from './action-types';

let initValue = {
    userData:{},
}

export default function(state = initValue,action){
    switch (action.type) {
        case types.GET_USER_DATA:
            return {...state,userData:action.data}
        case types.TOKEN_DATA:
                return {...state,token:action.token}
        case types.USER_REQUEST_FAILED:
            return state;
        default:
            return state;
    }
}
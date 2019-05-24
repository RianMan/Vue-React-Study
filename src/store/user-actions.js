import * as types from './action-types';

export default {
    getUser(data){
        return {type: types.DELAY_USER_DATA, data}
    },
    login(password){
        console.log(password,'data')
        return {type: types.GET_PASSWORD, password}
    }
}
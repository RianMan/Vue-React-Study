export default function(reducers){
    let keys = Object.keys(reducers);
    return function(state={},action){
        return keys.reduce((memo,key) => {
            memo[key] = reducers[key](state[key],action);
            return memo;
        },{})
    }
}
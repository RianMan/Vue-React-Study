export default function(actions,dispatch){
    let obj = {};
    for (const key in actions) {
        if (actions.hasOwnProperty(key)) {
            obj[key] = function(){
                if(typeof actions[key] === 'function'){
                    dispatch(actions[key].apply(null,arguments))
                }
                if(typeof actions[key] === 'object'){
                    dispatch(actions[key])
                }
            }
        }
    }
    return obj;
}
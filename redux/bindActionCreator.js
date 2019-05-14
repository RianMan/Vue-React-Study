export default (action,dispatch) => {
    console.log(action,'action')
    let newAction = {}
    for (const key in action) {
        if (action.hasOwnProperty(key)) {
            const element = action[key];
            newAction[key] = function(){
                dispatch(element.apply(this, arguments))
            }
        }
    }
    return newAction;
}
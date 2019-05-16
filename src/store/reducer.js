import counter from './counter-reducer';
import todo from './todo-reducer';
import { combineReducers } from '../../redux';

export default combineReducers({
    counter,
    todo,
})
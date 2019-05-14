import todo from './todo';
import counter from './counter';
import {CombineReducer} from '../../redux/index';

export default CombineReducer({
    todo,
    counter,
})
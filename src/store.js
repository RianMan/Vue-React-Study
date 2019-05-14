import { CreateStore } from '../redux/index';
import reducers from './reducer';

console.log(CreateStore(reducers))
export default CreateStore(reducers);

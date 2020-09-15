import { createStore,applyMiddleware } from '../../redux/index';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../saga/sagas'
import reducers from './reducer';


//创建一个saga中间价
const sagaMiddleware = createSagaMiddleware()


const logger = store => next => action => { 
    console.log(store,'dispatch:', action); 
    next(action);
    console.log(store,'finish:', action);
};

const thunk = store => next => action => 
typeof action === 'function' ? action(store.dispatch, store.getState) : next(action)

// const store = createStore(
//     reducers,
//     applyMiddleware(logger,thunk)
// )
const store = applyMiddleware(logger,thunk)(createStore)(reducers)
// sagaMiddleware.run(rootSaga)

export default store;
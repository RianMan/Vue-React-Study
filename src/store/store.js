import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../saga/sagas'
import reducers from './reducer';

//创建一个saga中间价
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store;
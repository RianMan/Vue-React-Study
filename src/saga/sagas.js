import { put, takeEvery, all,call,select, take} from 'redux-saga/effects'
// import { delay } from 'redux-saga';
import * as types from '../store/action-types';
import { getUser, loginApi } from '../request/userReq';
// const delay = (ms) => new Promise(res => setTimeout(res, ms))

// 请求函数
// const getUser = () => {
//   return new Promise((res)=>{
//     fetch('http://localhost:9898/user').then((data)=>{
//       res(data.json());
//     })
//   })
// }

//调用请求函数并通过pu发出action改变状态
function * fetchUserData() {
    try {
      const data = yield call(getUser);
      yield put({type: types.GET_USER_DATA, data});
    } catch (error) {
      console.log(error,'error')
      yield put({ type: types.USER_REQUEST_FAILED, error })
    }
    
}

// export function * incrementAsync() {
//     yield call(delay,1000)
//     yield put({ type: types.INCREMENT })
// }

// export function* watchIncrementAsync() {
//   yield takeEvery(types.DELAY_INCREMENT, incrementAsync)
// }

//发出异步执行动作
function * watchGetUserAsync() {
    yield takeEvery(types.DELAY_USER_DATA, fetchUserData)
}

function * watchLoginAsync() {
  while (true) {
    let { password } = yield take(types.GET_PASSWORD);
    const token = yield call(loginApi, password)
    yield put({type: types.TOKEN_DATA, token})
  }
}

function* watchAndLog() {
  yield takeEvery('*', function * logger(action) {
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  })
}

  
export default function * rootSaga() {
  yield all([
    watchGetUserAsync(),
    watchAndLog(),
    watchLoginAsync(),
  ])
}




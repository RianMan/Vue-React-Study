### redux-saga的笔记
---

1. 用法：
> 首先在我们通过apllyMiddleware使用中间价的时候加上我们的saga;<br>
```
import createSagaMiddleware from 'redux-saga'
import { watchIncrementAsync } from '../saga/sagas'
//watchIncrementAsync 为我们申请的saga配置

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
)
const sagaMiddleware = createSagaMiddleware()
sagaMiddleware.run(watchIncrementAsync)
//这样我们就把中间价配置好了，只用去写我们的watchIncrementAsync里面的逻辑了
```

- **worker saga**:
> 做所有的工作，如调用 API，进行异步请求，并且获得返回结果
```
export function * fetchUserData() {
    try {
      const data = yield call(getUser);
      yield put({type: types.GET_USER_DATA, data});
    } catch (error) {
      console.log(error,'error')
      yield put({ type: types.USER_REQUEST_FAILED, error })
    }
```

- **watcher saga**:
>监听被 dispatch 的 actions，当接收到 action 或者知道其被触发时，调用 worker saga 执行任务
```
export function * watchGetUserAsync() {
    yield takeEvery(types.DELAY_USER_DATA, fetchUserData)
}
```

- **root saga**:
>立即启动 sagas 的唯一入口

2. 和redux-thunk比较：
> redux-thunk我们在申请action的时候写一个异步函数，这样导致我们的action很乱，有简单对象也没有简单对面，但是saga里面都是简单对象，它把逻辑处理写在自己的watchIncrementAsync里面去了，这样文件就很好维护

3. redux-thunk的缺点

- action 虽然扩展了，但因此变得复杂，后期可维护性降低；
- thunks 内部测试逻辑比较困难，需要mock所有的触发函数；
- 协调并发任务比较困难，当自己的 action 调用了别人的 action，别人的 action 发生改动，则需要自己主动修改；
- 业务逻辑会散布在不同的地方：启动的模块，组件以及thunks内部。

4. redux-saga的特点

- saga的应用场景是复杂异步，如长时事务LLT(long live.transcation)等业务场景。
- 方便测试，可以使用takeEvery打印logger。
- 提供takeLatest/takeEvery/throttle方法，可以便利的实现对事件的仅关注最近事件、关注每一次、事件限频
- 提供cancel/delay方法，可以便利的取消、延迟异步请求
- 提供race(effects),[…effects]方法来支持竞态和并行场景
- 提供channel机制支持外部事件

5. redux 的 Api：

- take VS tackEvery

> take 只有在执行流达到时才回响应 action ,而 takeEvery 则一经注册，都会响应 action
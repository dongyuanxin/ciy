const {
  call,
  put,
  takeEvery,
  takeLatest,
  delay,
  all,
} = require("redux-saga/effects");

function fetchUser(userId) {
  return {
    name: "dongyuanxin",
    sex: 1,
    userId,
  };
}

function* fetchUserSaga(action) {
  console.log("call fetchUserSaga");
  yield delay(1000);

  try {
    const user = yield call(fetchUser, action.payload.userId);
    yield put({ type: "USER_FETCH_SUCCEEDED", payload: user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* mySaga() {
  console.log("call mySaga");
  yield takeEvery("USER_FETCH_REQUESTED", fetchUserSaga);
  // 开启这个派生任务，就会一直无线循环下去。
  // yield takeEvery("USER_FETCH_SUCCEEDED", fetchUserSaga);
}

module.exports = {
  mySaga,
};

const { createStore, applyMiddleware } = require("redux");
const createSagaMiddleware = require("redux-saga").default;
const { mySaga } = require("./my-saga");
const { reducer } = require("./reducer");

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

store.dispatch({ type: "USER_FETCH_REQUESTED", payload: { userId: "useid" } });

store.dispatch({ type: "USER_FETCH_REQUESTED", payload: { userId: "useid" } });

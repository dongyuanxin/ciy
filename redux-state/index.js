const { createStore, combineReducers } = require("redux");

function counter(state = 0, action) {
  switch (action.type) {
    case "INCR":
      console.log("[1] incr");
      return state + 1;
    case "DECR":
      console.log("[1] decr");
      return state - 1;
    default:
      return state;
  }
}

function counter2(state = 0, action) {
  switch (action.type) {
    case "INCR":
      console.log("[2] incr");
      return state + 1;
    case "DECR":
      console.log("[2] decr");
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({
    counter,
    counter2,
  })
);

store.subscribe(() => {
  console.log(">>> state is", store.getState());
});

store.dispatch({ type: "INCR" });

// store.dispatch({ type: "INCR" });

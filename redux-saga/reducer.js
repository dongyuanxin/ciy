function reducer(state = {}, action) {
  switch (action.type) {
    case "USER_FETCH_REQUESTED":
      console.log("reducer USER_FETCH_REQUESTED");
      return state;
    case "USER_FETCH_SUCCEEDED":
      console.log("reducer USER_FETCH_SUCCEEDED");
      return state;
    case "USER_FETCH_FAILED":
      console.log("reducer USER_FETCH_FAILED");
      return state;
    default:
      return state;
  }
}

module.exports = {
  reducer,
};

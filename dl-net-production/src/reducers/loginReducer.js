const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log("action", action);
      console.log("state", state);
      return {
        ...action.payload
        // ...state,
        // login: 
      }
    default:
      return state;
  }
};

export default loginReducer;



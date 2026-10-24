import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  login:loginReducer,
  counter: counterReducer,
});

export default rootReducer;



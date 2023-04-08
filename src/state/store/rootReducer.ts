import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '../duck/user';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserState } from './types';
import { loginParams } from '../../../services';

const initialState: UserState = {
  login: {
    isRequesting: false,
    isAuthenticated: false,
    userName: null,
    userId: null,
    token: null
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state: UserState, _action: PayloadAction<loginParams>) => {
      state.login = { ...initialState.login, isRequesting: true };
    },
    loginSuccess: (state: UserState, action: PayloadAction<any>) => {
      const { user_name, user_id, access_token } = action.payload;

      state.login.isRequesting = false;
      state.login.isAuthenticated = true;
      state.login.userName = user_name;
      state.login.userId = user_id;
      state.login.token = access_token
    },
    loginFailure: (state: UserState) => {
      state.login = initialState.login;
    },
    logout: (state: UserState) => {
      state.login = initialState.login;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = userSlice.actions;
export const { reducer: userReducer } = userSlice;


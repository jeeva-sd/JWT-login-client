import { call, put, takeLatest } from 'redux-saga/effects';
import { loginFailure, loginSuccess } from './reducer';
import { api } from '../../../services';
import { setAuthenticate, setToken, setUserInfo } from '../../cookies';

export function* loginRequest(action: ReturnType<any>): Generator {
  try {
    const response: any = yield call(api.user.login, action.payload);

    setAuthenticate(true);
    setToken(response.access_token);
    setUserInfo({ userId: response.user_id, userName: response.user_name });

    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure());
    console.error(error);
  }
}

export function* watchLoginRequest() {
  yield takeLatest('user/loginRequest', loginRequest);
}
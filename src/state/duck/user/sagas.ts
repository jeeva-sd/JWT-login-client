import { call, put, takeLatest } from 'redux-saga/effects';
import { loginFailure, loginSuccess } from './reducer';
import { api } from '../../../services';
import { setAuthenticate, setToken, setUserInfo } from '../../cookies';
import { toast } from 'react-toastify';

export function* loginRequest(action: ReturnType<any>): Generator {
  try {
    const response: any = yield call(api.user.login, action.payload);

    if (!response || response?.user_id === null) {

      toast.info('Invalid Credentials', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      yield put(loginFailure());
      return
    };

    setAuthenticate(true);
    setToken(response.access_token);
    setUserInfo({ userId: response.user_id, userName: response.user_name });

    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure());
  }
}

export function* watchLoginRequest() {
  yield takeLatest('user/loginRequest', loginRequest);
}
import { all } from 'redux-saga/effects';
import { watchLoginRequest } from '../duck/user/sagas';

export default function* rootSaga() {
  yield all([
    watchLoginRequest(),
  ]);
}

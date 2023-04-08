import webAPI from '../webAPI';
import { loginParams } from './types';

export class UserService {
  login = (params: loginParams) => webAPI.post(`/user/login`, params);
}
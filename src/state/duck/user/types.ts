export interface UserState {
  login: {
    isRequesting: boolean;
    isAuthenticated: boolean;
    userName: null | string;
    userId: string | null
    token: string | null;
  },
}

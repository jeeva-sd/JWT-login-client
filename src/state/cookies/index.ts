import Cookies from 'js-cookie';

export const setToken = (token: string | null) => {
    const options = { expires: 1, path: '/' };
    return Cookies.set('token', token as any, options);
}

export const getToken = (): string | null => {
    const token = Cookies.get('token');
    return token ? token : null;
}

export const setUserInfo = (userObj: any | null) => {
    const options = { expires: 1, path: '/' };
    return Cookies.set('userInfo', JSON.stringify(userObj), options);
}

export const getUserInfo = (): string | null => {
    const userInfo = Cookies.get('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
}

export const setAuthenticate = (isAuthenticated: boolean) => {
    return Cookies.set('authenticate', isAuthenticated as any);
}

export const getAuthenticate = (): string | null => {
    const token = Cookies.get('authenticate');
    return token ? token : null;
}

export const isAuthenticate = () => {
    const token = getToken();
    const isAuthenticate = getAuthenticate();
    return token && isAuthenticate;
}

export const clearCookies = () => {
    setAuthenticate(false);
    Cookies.remove('token');
}
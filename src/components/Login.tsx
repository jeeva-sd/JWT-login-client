import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuthenticate, getToken, setAuthenticate, setToken } from '../state/cookies';
import { loginRequest } from '../state/duck/user';
import { AppState, dispatch } from '../state/store';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated: authenticated, token } = useSelector((state: AppState) => state.user.login);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { accessToken, isAuthenticated } = useMemo(() => {
        const accessToken = token ? token : getToken();
        const isAuthenticated = authenticated ? authenticated : getAuthenticate();

        return { accessToken, isAuthenticated };
    }, [token, authenticated])

    useEffect(() => {
        if (isAuthenticated && accessToken) {
            navigate('/home');
            setAuthenticate(true);
            setToken(accessToken);
        }
    }, [isAuthenticated, navigate, accessToken]);

    const handleLogin = () => {
        if (userName && password) {
            dispatch(loginRequest({ userName, password }));
        } else {
            setError('Invalid username or password');
        }
    }

    return (
        <div>
            <h1>Login Page</h1>
            <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e?.target?.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginPage;

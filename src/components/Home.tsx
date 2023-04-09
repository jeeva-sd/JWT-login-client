import React from 'react';
import { clearCookies, getUserInfo } from '../state/cookies';
import { Button, Container } from '@mui/material';
import { dispatch } from 'src/state/store';
import { logout } from 'src/state/duck/user';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const userInfo: any = getUserInfo();

    const onLogout = () => {
        dispatch(logout());
        clearCookies();
        navigate('/')
    }

    return (
        <Container>
            <h1>Welcome Page</h1>
            <p>Welcome, {userInfo?.userName}</p>
            <Button color='error' onClick={() => onLogout()}>Logout</Button>
        </Container>
    );
};

export default Home;
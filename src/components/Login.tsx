import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, InputAdornment, CircularProgress } from '@mui/material';
import { getAuthenticate, getToken, setAuthenticate, setToken } from '../state/cookies';
import { loginRequest } from '../state/duck/user';
import { AppState, dispatch } from '../state/store';
import '../assets/scss/login.scss';

import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const zaperon_logo = require('../assets/images/zaperon_logo.png');
const user_avatar = require('../assets/images/ic_user.png');
const hidePassword = require('../assets/images/ic_hide_password.png');
const viewPassword = require('../assets/images/ic_unhide_password.png');

export default function SignIn() {
    const navigate = useNavigate();
    const { isAuthenticated: authenticated, token, isRequesting } = useSelector((state: AppState) => state.user.login);
    const initialError = { email: '', password: '' };

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(initialError);
    const [showPassword, setShowPassword] = useState(false);

    const { accessToken, isAuthenticated } = useMemo(() => {
        const accessToken = token ? token : getToken();
        const isAuthenticated = authenticated ? authenticated : getAuthenticate();

        return { accessToken, isAuthenticated };
    }, [token, authenticated]);

    useEffect(() => {
        if (isAuthenticated && accessToken) {
            navigate('/home');
            setAuthenticate(true);
            setToken(accessToken);
        }
    }, [isAuthenticated, navigate, accessToken]);

    const handleLogin = (event: any) => {
        event.preventDefault();

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!userName || !emailRegex.test(userName)) {
            setError({ ...error, email: 'Please enter a valid email address.' });
            return;
        } else setError({ ...error, email: '' });

        if (!password || password.length < 8) {
            setError({ ...error, password: 'Password must be at least 8 characters long.' });
            return;
        } else setError({ ...error, password: '' });

        if (userName && password) dispatch(loginRequest({ userName, password }));
    };

    const handleTogglePassword = () => setShowPassword(!showPassword);

    return (
        <Container component="main" maxWidth="xl" className='login_container'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <div className='avatar'>
                    <img className='user_avatar' src={user_avatar} alt='user_avatar' />
                </div>

                <Typography className='welcome' component="h1" variant="h5">
                    Welcome!
                </Typography>
                <Typography className='sub-text' component="span" variant="caption">
                    Let's connect to your workspace. Please enter your email to continue.
                </Typography>

                <Box component="form" onSubmit={(event) => handleLogin(event)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={userName || ''}
                        className='login_input'
                        error={Boolean(error?.email)}
                        helperText={error?.email}
                        style={{ borderColor: '2px solid black' }}
                        sx={{ borderColor: '2px solid #0000' }}
                        onChange={(e) => {
                            setUserName(e?.target?.value);
                            setError(initialError)
                        }}
                    />

                    <TextField
                        label="Password"
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password || ''}
                        onChange={(e) => {
                            setPassword(e?.target?.value);
                            setError(initialError);
                        }}
                        fullWidth
                        margin="normal"
                        error={Boolean(error?.password)}
                        helperText={error?.password}
                        className='login_input'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <img
                                        alt="password"
                                        style={{ cursor: 'pointer' }} src={!showPassword ? hidePassword : viewPassword}
                                        onClick={handleTogglePassword} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <div className='forget_password'>
                        <Link href="#" className='forget_password'>
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className='sign_in_button'
                        fullWidth
                        variant="contained"
                    >
                        {isRequesting ? <CircularProgress sx={{ color: 'white', height: '32px', width: '32px' }} color="inherit" /> : 'Sign In'}
                    </Button>
                </Box>
            </Box>

            <Box className='footer'>
                <div className='footer_content'>
                    <span className='powered_by'><span>Powered by</span> <img className='zaperon_logo' src={zaperon_logo} alt='zaperon_logo' /></span>
                    <span className='footer_right'>
                        <span className='footer_right_span'>Need Help?</span>
                        <span className='footer_right_span'>Privacy Policy <span style={{ color: '#A2A2A2' }}>&</span> Terms</span>
                    </span>
                </div>
            </Box>
        </Container>
    );
}
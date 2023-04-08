import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthenticate } from '../state/cookies';

const AuthGurad = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!getAuthenticate()) navigate("/");
    }, [navigate])

    return <>{children}</>;
}

export default AuthGurad;
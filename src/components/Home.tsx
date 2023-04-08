import React from 'react';
import { getUserInfo } from '../state/cookies';

const Home: React.FC = () => {
    const userInfo: any = getUserInfo();

    return (
        <div>
            <h1>Welcome Page</h1>
            <p>Welcome, {userInfo.userName}</p>
        </div>
    );
};

export default Home;
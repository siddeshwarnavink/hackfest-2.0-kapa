import { useState } from 'react';

import { API_URL } from '@/config/api';

interface IProfile {
    id: string;
    points: number;
    username: string;
    email: string;
    ethereumAddress: string;
};

export interface IAuthData {
    token: string;
    profile: IProfile;
};

interface IUseAuthProps {
    redirect: boolean;
};

const useAuth = (props: IUseAuthProps = { redirect: true }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [authData, setAuthData] = useState<null | IAuthData>(null);
    async function init() {
        if (localStorage.getItem('auth')) {
            const [response] = await Promise.all([
                fetch(`${API_URL}/auth/refreshToken`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
                    },
                }),
                new Promise((resolve) => setTimeout(resolve, 1500))
            ]);
            const fetchedAuthData = await response.json();
            localStorage.setItem('auth', JSON.stringify(fetchedAuthData));
            setAuthData(fetchedAuthData);
            setLoading(false);
        } else if (props.redirect && window.location.pathname !== '/auth') {
            window.location.replace('/auth');
        } else {
            setLoading(false);
        }
    }
    return {
        loading,
        init,
        authData,
        setAuthData
    };
}

export default useAuth;
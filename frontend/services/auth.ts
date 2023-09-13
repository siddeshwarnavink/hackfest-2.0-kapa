import { API_URL } from '@/config/api';

export const fetchProfile = async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
        }
    });
    const data = await response.json();
    return data;
}

export const fetchOtherProfile = async (profileId: string) => {
    const response = await fetch(`${API_URL}/user/${profileId}`, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
        }
    });
    const data = await response.json();
    return data;
}
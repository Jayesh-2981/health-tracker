import api from './api';

export async function getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
}

export async function logout() {
    const response = await api.post('/auth/logout');
    return response.data;
}

export function getGoogleLoginUrl() {
    return `${api.defaults.baseURL}/auth/google`;
}
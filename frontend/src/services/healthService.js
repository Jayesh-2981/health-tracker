import api from './api.js';

export async function getHealthStatus() {
    const response = await api.get('/health');

    return response.data;
}

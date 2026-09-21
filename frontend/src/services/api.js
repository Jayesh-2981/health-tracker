import axios from 'axios';
import { apiBaseUrl } from '../utils/env.js';

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default api;
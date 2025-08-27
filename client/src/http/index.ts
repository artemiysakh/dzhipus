import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export const API_URL =  process.env.REACT_APP_API_URL || 'https://dzhipusserver-production.up.railway.app/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config)=>{
    
const token = localStorage.getItem('token');
if (token) {
    config.headers.Authorization = `Bearer ${token}`;
}

    return config;
})
$api.interceptors.response.use((config) => config, async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Refresh token error:', e);
            localStorage.removeItem('token');
        }
    }
    throw error;
});

export default $api;



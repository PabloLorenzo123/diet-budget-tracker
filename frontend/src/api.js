import axios from 'axios';
import { ACCESS_TOKEN, USER } from './constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL // 'http://192.168.4.128:8000/api/' //
})

api.interceptors.request.use(
    (config) => {
        try {
            // Fetch user data from localStorage
            const storedUser = localStorage.getItem(USER);
            const user = JSON.parse(storedUser);
            const token = user[ACCESS_TOKEN];
            if (token) {
                // Set Authorization header if token exists
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
             // console.error("Error parsing user data:", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;

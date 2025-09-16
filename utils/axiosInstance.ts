import axios, { AxiosResponse, AxiosError } from "axios";

// create an axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                console.error('Unauthorized! Redirecting to login.');
            } else if (status === 403) {
                console.error(
                    "Forbidden! You don't have permission to access this resource."
                );
            } else if (status === 500) {
                console.error('Server Error! Please try again later.');
            }
        } else {
            console.error('Network error! Please check your connection.');
        }
        return Promise.reject(error);
    }
);

// attach token automatically to every request
axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn('⚠️ No access token found in localStorage!');
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

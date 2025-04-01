import axios from 'axios';

export const API_URL = 'http://54.174.64.250:8000';

const getAccessToken = () => localStorage.getItem('accessToken');

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('accessToken', token);
        apiClient.defaults.headers.Authorization = `Bearer ${token}`;
        console.log("Token set in localStorage and API client:", token);
    } else {
        localStorage.removeItem('accessToken');
        delete apiClient.defaults.headers.Authorization;
        console.log("Token removed from localStorage and API client");
    }
};

export const logout = () => {
    setAuthToken(null);
    window.location.href = '/signin';
};

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log("401 Unauthorized error - logging out");
            logout();
        }
        return Promise.reject(error);
    }
);
const token = getAccessToken();
if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
    console.log("Token loaded from localStorage on app init");
}
const api = {
    getMoneyData: async () => {
        try {
            console.log("Fetching money data, token present:", !!getAccessToken());
            const response = await apiClient.get('/money-data');
            return response.data;
        } catch (error) {
            console.error("Money data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch money data" };
        }
    },
    getSpreadData: async () => {
        try {
            const response = await apiClient.get('/spread-data');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: "Failed to fetch spread data" };
        }
    },
    getOverUnderData: async () => {
        try {
            const response = await apiClient.get('/over-under-data');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: "Failed to fetch over/under data" };
        }
    },
    getNewsData: async () => {
        try {
            console.log("Fetching News data, token present:", !!getAccessToken());
            const response = await apiClient.get('/news-data');
            return response.data;
        } catch (error) {
            console.error("News data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch news data" };
        }
    },
};

export default api;
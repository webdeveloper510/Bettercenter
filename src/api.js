import axios from 'axios';

export const API_URL = 'http://54.174.64.250:8000';

// Retrieve token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Create Axios instance
export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to update token dynamically after login
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('accessToken', token);
        apiClient.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
        localStorage.removeItem('accessToken');
        delete apiClient.defaults.headers.Authorization;
    }
};

// Ensure the Authorization header is always set if a token exists
const token = getAccessToken();
if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
}

// API Methods
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
};

export default api;

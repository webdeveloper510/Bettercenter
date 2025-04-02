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
    } else {
        localStorage.removeItem('accessToken');
        delete apiClient.defaults.headers.Authorization
    }
};

export const logout = () => {
    setAuthToken(null);
};

const token = getAccessToken();
if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
    console.log("Token loaded from localStorage on app init");
}

const api = {
    register: async (userData) => {
        try {
            console.log("Registering new user");
            const response = await apiClient.post('/register', userData);
            if (response.data && response.data.token) {
                setAuthToken(response.data.token);
            }
            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error.response ? error.response.data : { message: "Registration failed" };
        }
    },
    getMoneyData: async () => {
        try {
            console.log("Fetching money data without authentication");
            const response = await axios.get(`${API_URL}/money-data`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            console.error("Money data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch money data" };
        }
    },
    getSpreadData: async () => {
        try {
            console.log("Fetching spread data without authentication");
            const response = await axios.get(`${API_URL}/spread-data`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: "Failed to fetch spread data" };
        }
    },
    getOverUnderData: async () => {
        try {
            console.log("Fetching over/under data without authentication");
            const response = await axios.get(`${API_URL}/over-under-data`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: "Failed to fetch over/under data" };
        }
    },
    getNewsData: async () => {
        try {
            console.log("Fetching news data without authentication");
            const response = await axios.get(`${API_URL}/news-data`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            console.error("News data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch news data" };
        }
    },
};

export default api;

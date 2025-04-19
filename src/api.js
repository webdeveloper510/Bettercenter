import axios from 'axios';
import { format } from 'date-fns';

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
    getMoneyData: async (date) => {
        try {
            const formattedDate = date || ''; 
            const response = await axios.get(`${API_URL}/nba-money-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            console.error("Money data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch money data" };
        }
    },
    getSpreadData: async (date) => {
        try {
            const formattedDate = date || ''; 
            const response = await axios.get(`${API_URL}/nba-spread-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: "Failed to fetch spread data" };
        }
    },
    getOverUnderData: async (date) => {
        try {
            const formattedDate = date || ''; 
            const response = await axios.get(`${API_URL}/nba-over-under-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: "Failed to fetch over/under data" };
        }
    },
    getMlbMoneyData: async (date) => {
        try {
            const formattedDate = date || '';
            const response = await axios.get(`${API_URL}/mlb-money-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            console.error("Money data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch money data" };
        }
    },
    getMlbSpreadData: async (date
    ) => {
        try {
            const formattedDate = date || '';
            const response = await axios.get(`${API_URL}/mlb-spread-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: "Failed to fetch spread data" };
        }
    },
    getMlbOverUnderData: async (date) => {
        try {
            const formattedDate = date || '';
            const response = await axios.get(`${API_URL}/mlb-over-under-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: "Failed to fetch over/under data" };
        }
    },
    getNhlMoneyData: async (date) => {
        try {
            const formattedDate = date || '';
            const response = await axios.get(`${API_URL}/nhl-money-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            console.error("Money data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch money data" };
        }
    },
    getNhlSpreadData: async (date) => {
        try {
            const formattedDate = date || '';
            const response = await axios.get(`${API_URL}/nhl-spread-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: "Failed to fetch spread data" };
        }
    },
    getNhlOverUnderData: async (date) => {
        try {
            const formattedDate = date || '';
            const response = await axios.get(`${API_URL}/nhl-over-under-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: "Failed to fetch over/under data" };
        }
    },
    getNewsData: async () => {
        try {
            const response = await axios.get(`${API_URL}/news-data`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            console.error("News data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch news data" };
        }
    },
    getNbaTeamsData: async () => {
        try {
            const response = await axios.get(`${API_URL}/nba-teams`, {
                headers: { 'Content-Type': 'application/json' } 
        
            });
            console.log("🚀 ~ getNbaTeamsData: ~ response:", response)
            return response.data;
          
        } catch (error) {
            console.error("News data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch news data" };
        }
    },
    getNhlTeamsData: async () => {
        try {
            const response = await axios.get(`${API_URL}/nhl-teams`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            console.error("News data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch news data" };
        }
    },
    getMlbteamsData: async () => {
        try {
            const response = await axios.get(`${API_URL}/mlb-teams`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            console.error("News data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch news data" };
        }
    },
    getNbaInjuriesData: async () => {
        try {
            const response = await axios.get(`${API_URL}/nba-injuries-data`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data.data;
        } catch (error) {
            console.error("News data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch news data" };
        }
    },
    getMlbInjuriesData: async () => {
        try {
            const response = await axios.get(`${API_URL}/mlb-injuries-data`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data.data;
        } catch (error) {
            console.error("News data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch news data" };
        }
    },
    getNhlInjuriesData: async () => {
        try {
            const response = await axios.get(`${API_URL}/nhl-injuries-data`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data.data;
        } catch (error) {
            console.error("News data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch news data" };
        }
    },
    getNbaScheduleData: async (date) => {
        try {
            const formattedDate = date || ''; 
            const response = await axios.get(`${API_URL}/nba-schedule-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            console.log("Schedule data fetched:", response.data);
            return response.data.data;
        } catch (error) {
            console.error("Schedule data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch schedule data" };
        }
    },
    getNhlScheduleData: async (date) => {
        try {
            const formattedDate = date || ''; 
            const response = await axios.get(`${API_URL}/nhl-schedule-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            console.log("Schedule data fetched:", response.data);
            return response.data.data;
        } catch (error) {
            console.error("Schedule data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch schedule data" };
        }
    },
    getMlbScheduleData: async (date) => {
        try {
            const formattedDate = date || ''; 
            const response = await axios.get(`${API_URL}/mlb-schedule-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            console.log("Schedule data fetched:", response.data);
            return response.data.data;
        } catch (error) {
            console.error("Schedule data fetch error:", error);
            throw error.response ? error.response.data : { message: "Failed to fetch schedule data" };
        }
    },
};

export default api;

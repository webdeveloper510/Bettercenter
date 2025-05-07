import axios from 'axios';
import { format } from 'date-fns';

export const API_URL = 'http://54.209.247.111:8000';

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
            return error.response ? error.response.data : { message: "Registration failed" };
        }
    },
    getBlogsData: async () => {
        try {
            const response = await axios.get(`${API_URL}/get-blog-data`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            console.error("Blog data fetch error:", error);
            return error.response ? error.response.data : { message: "Failed to fetch blog data" };
        }
    },
    getBlogById: async (id) => {
        try {
          const response = await axios.get(`${API_URL}/get-blog-data/${id}`, {
            headers: { 'Content-Type': 'application/json' }
          });
          return response.data;
        } catch (error) {
          console.error("Error fetching blog by ID:", error);
          return error.response ? error.response.data : { message: "Failed to fetch blog" };
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
            return error.response ? error.response.data : { message: "Failed to fetch money data" };
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
        return error.response ? error.response.data : { message: "Failed to fetch spread data" };
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
            return error.response ? error.response.data : { message: "Failed to fetch over/under data" };
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
            return error.response ? error.response.data : { message: "Failed to fetch money data" };
        }
    },
    getMlbDefaultData: async (date) => {
        try {
            const formattedDate = date || '';
            const response = await axios.get(`${API_URL}/mlb-default-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            console.error("Default data fetch error:", error);
            return error.response ? error.response.data : { message: "Failed to fetch default data" };
        }
    }
    ,
    getMlbSpreadData: async (date) => {
        try {
            const formattedDate = date || '';
            const response = await axios.get(`${API_URL}/mlb-spread-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { message: "Failed to fetch spread data" };
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
            return error.response ? error.response.data : { message: "Failed to fetch over/under data" };
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
            return error.response ? error.response.data : { message: "Failed to fetch money data" };
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
            return error.response ? error.response.data : { message: "Failed to fetch spread data" };
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
            return error.response ? error.response.data : { message: "Failed to fetch over/under data" };
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
            return error.response ? error.response.data : { message: "Failed to fetch news data" };
        }
    },
    getNbaTeamsData: async () => {
        try {
            const response = await axios.get(`${API_URL}/nba-teams`, {
                headers: { 'Content-Type': 'application/json' } 
        
            });
          
            return response.data;
          
        } catch (error) {
            console.error("News data fetch error:", error);
            return error.response ? error.response.data : { message: "Failed to fetch news data" };
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
            return error.response ? error.response.data : { message: "Failed to fetch news data" };
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
            return error.response ? error.response.data : { message: "Failed to fetch news data" };
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
            return error.response ? error.response.data : { message: "Failed to fetch news data" };
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
            return error.response ? error.response.data : { message: "Failed to fetch news data" };
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
            return error.response ? error.response.data : { message: "Failed to fetch news data" };
        }
    },
    getNbaScheduleData: async (date) => {
        try {
            const formattedDate = date || ''; 
            const response = await axios.get(`${API_URL}/nba-schedule-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
       
            return response.data.data;
        } catch (error) {
            console.error("Schedule data fetch error:", error);
            return error.response ? error.response.data : { message: "Failed to fetch schedule data" };
        }
    },
    getNhlScheduleData: async (date) => {
        try {
            const formattedDate = date || ''; 
            const response = await axios.get(`${API_URL}/nhl-schedule-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
          
            return response.data.data;
        } catch (error) {
            console.error("Schedule data fetch error:", error);
            return error.response ? error.response.data : { message: "Failed to fetch schedule data" };
        }
    },
    getMlbScheduleData: async (date) => {
        try {
            const formattedDate = date || ''; 
            const response = await axios.get(`${API_URL}/mlb-schedule-data/?date=${formattedDate}`, {
                headers: { 'Content-Type': 'application/json' } 
            });
        
            return response.data.data;
        } catch (error) {
            console.error("Schedule data fetch error:", error);
            return error.response ? error.response.data : { message: "Failed to fetch schedule data" };
        }
    },
    getadmindata: async () => {
        try {
            const response = await axios.get(`${API_URL}/admin-user`, {
            })
            return response.data;
        } catch (error) {
            console.error("Error fetching websites:", error);
            return { status: "error", data: [] };
        }
    },
    getAdminPicks: async (adminId) => {
        try {
            const response = await apiClient.post('/admin-user-picks/', {
                id: adminId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            return response.data;
        } catch (error) {
            console.error("Admin picks fetch error:", error);
            return error.response ? error.response.data : { message: "Failed to fetch admin picks" };
        }
    },
    
    
    getPickDetailsAuth: async (pickId) => {
        try {
            const token = getAccessToken();
            if (!token) {
                return new Error('User not authenticated');
            }
            const response = await apiClient.post('/singlepick-with-login/', {
                     id: pickId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            return response.data;
        } catch (error) {
            console.error("Pick details fetch error:", error);
            return error.response ? error.response.data : { message: "Failed to fetch pick details" };
        }
    },
    getPickDetailsPublic: async (pickId) => {
        try {
            const response = await axios.post(`${API_URL}/singlepick-without-login/`,{
                id: pickId
            } ,{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            return response.data;
        } catch (error) {
            console.error("Pick details fetch error:", error);
            return error.response ? error.response.data : { message: "Failed to fetch pick details" };
        }
    },
  
    getPickDetails: async (pickId) => {
        try {
            const token = getAccessToken();
            
            if (token) {
            
                return await api.getPickDetailsAuth(pickId);
            } else {
        
                return await api.getPickDetailsPublic(pickId);
            }
        } catch (error) {
            console.error("Pick details fetch error:", error);
            return error;
        }
    },
    placeOrderAuth: async (orderData) => {
        try {
            const token = getAccessToken();
            if (!token) {
                return new Error('User not authenticated');
            }
            
            const response = await apiClient.post('/create-order-with-login/', {
                ...orderData,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            return response.data;
        } catch (error) {
            console.error("Order placement error:", error);
            return error.response ? error.response.data : { message: "Failed to place order" };
        }
    },

    placeOrderPublic: async (orderData) => {
        try {
            const response = await axios.post(`${API_URL}/create-order-without-login/`, orderData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            return response.data;
        } catch (error) {
            console.error("Order placement error:", error);
            return error.response ? error.response.data : { message: "Failed to place order" };
        }
    },
    placeOrder: async (orderData) => {
        try {
            const token = getAccessToken();
            
            if (token) {
                return await api.placeOrderAuth(orderData);
            } else {

                return await api.placeOrderPublic(orderData);
            }
        } catch (error) {
            console.error("Order placement error:", error);
            return error;
        }
    },
    purchaseOrderAuth: async (orderDetails) => {
        try {
            const token = getAccessToken();
            if (!token) {
                return new Error('User not authenticated');
            }
            
            const response = await apiClient.post('/update-order-with-login/', {
                ...orderDetails,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            return response.data;
        } catch (error) {
            console.error("Order placement error:", error);
            return error.response ? error.response.data : { message: "Failed to place order" };
        }
    },

    purchaseOrderPublic: async (orderDetails) => {
        try {
            const response = await axios.post(`${API_URL}/update-order-without-login/`, orderDetails, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            return response.data;
        } catch (error) {
            console.error("Order placement error:", error);
            return error.response ? error.response.data : { message: "Failed to place order" };
        }
    },
    purchaseOrder: async (orderDetails) => {
        try {
            const token = getAccessToken();
            
            if (token) {
                return await api.purchaseOrderAuth(orderDetails);
            } else {

                return await api.purchaseOrderPublic(orderDetails);
            }
        } catch (error) {
            console.error("Order placement error:", error);
            return error;
        }
    },
    getSubscriptionStatus: async (userId) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${API_URL}/picks-subscription-status/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Subscription status fetch error:", error);
            return error.response ? error.response.data : { message: "Failed to fetch subscription status" };
        }
    },
    
};

export default api;
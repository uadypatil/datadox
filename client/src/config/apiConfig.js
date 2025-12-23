// config/apiConfig.js
const API_BASE_URL = "http://localhost:3000/api/v1/";

export const apiConfig = {
    auth: {
        login: `${API_BASE_URL}auth/user`,
        signUp: `${API_BASE_URL}users`,
    },  

    dataSource: {
        GET_BY_USER: `${API_BASE_URL}sources/data/user`,
        GET_BY_ID: `${API_BASE_URL}sources/data`,
        SET: `${API_BASE_URL}sources/data`,
    }
};

export default apiConfig;

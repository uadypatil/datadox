// integration/integrationHouse.js
import axios from "axios";
import apiConfig from "../config/apiConfig";

const axiosInstance = axios.create({
    baseURL: apiConfig.baseUrl,       // e.g. "https://localhost:7161"
    headers: {
        "Content-Type": "application/json"
    },
});

// Optional: Add interceptors for debugging or auth tokens
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API ERROR:", error.response || error.message);
        return Promise.reject(error);
    }
);

export const integrationHouse = {

    get: async (url) => {
        const response = await axiosInstance.get(url);
        return response.data;
    },

    post: async (url, data) => {
        const response = await axiosInstance.post(url, data);
        return response.data;
    },

    put: async (url, data) => {
        const response = await axiosInstance.put(url, data);
        return response.data;
    },

    delete: async (url) => {
        const response = await axiosInstance.delete(url);
        return response.data;
    }
};

export default integrationHouse;

// utils/useProductIntegrationHouse.js
import apiConfig from "../config/apiConfig";
import integrationHouse from "./integrationHouse";

export const useDataIntegrationHouse = () => {
    const userId = sessionStorage.getItem("id");

    const getDataSource = async () => {
        const response = integrationHouse.get(`${apiConfig.dataSource.GET_BY_USER}/${userId}`);
        return response;
    };

    const getDataSourceById = async (id) => {
        const response = integrationHouse.get(`${apiConfig.dataSource.GET_BY_ID}/${id}`);
        return response;
    };

    const addDataSource = async (formData) => {
        const response = integrationHouse.post(apiConfig.dataSource.SET, formData);
        return response;
    };

    return {
        getDataSource,
        getDataSourceById,
        addDataSource,
    };
};

export default useDataIntegrationHouse;

// utils/useProductIntegrationHouse.js
import apiConfig from "../config/apiConfig";
import integrationHouse from "./integrationHouse";

export const useAuthIntegrationHouse = () => {

    const authenticateLogin = async (formData) => {
        const response = await integrationHouse.post(apiConfig.auth.login, formData);
        console.log(response)
        if(response.success){
            sessionStorage.setItem("username", response.user.name);
            sessionStorage.setItem("id", response.user.id);
            sessionStorage.setItem('loggedin', true);
            return true;
        }else{
            return false;
        }
    };

    const userRegistration = async (formData) => {
        const response = integrationHouse.post(apiConfig.auth.signUp, formData);
        return response;
    };

    return {
        authenticateLogin,
        userRegistration,
    };
};

export default useAuthIntegrationHouse;

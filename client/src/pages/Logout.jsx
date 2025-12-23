import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("loggedin");
        sessionStorage.clear();

        navigate("/login", { replace: true });
    }, [navigate]);

    return null;
};

export default Logout;

import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";

const AnimatedLoginButton = () => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    const springStyle = useSpring({
        transform: hovered ? "scale(1.05)" : "scale(1)",
        boxShadow: hovered
            ? "0px 8px 15px rgba(0, 0, 0, 0.2)"
            : "0px 4px 6px rgba(0, 0, 0, 0.1)",
        config: { tension: 300, friction: 15 },
        cursor: "pointer"
    });

    const handleLoginClick = () => {
        navigate("/login"); // Navigate to login page
    };

    return (
        // <span style={{ cursor: "pointer" }}>
            <animated.button
                style={springStyle}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleLoginClick}
                className="btn btn-secondary px-6 py-3 rounded-xl"
            >
                Login
            </animated.button>
        // </span>
    );
};

export default AnimatedLoginButton;

import React from "react";
import { useSpring, animated } from "@react-spring/web";

const variants = {
    success: {
        bg: "bg-green-500",
        text: "text-white",
        icon: "✔",
    },
    error: {
        bg: "bg-red-500",
        text: "text-white",
        icon: "✖",
    },
    warning: {
        bg: "bg-yellow-500",
        text: "text-black",
        icon: "⚠",
    },
    info: {
        bg: "bg-blue-500",
        text: "text-white",
        icon: "i",
    },
};

const Alert = ({ type = "info", message, show, onClose }) => {
    const animation = useSpring({
        opacity: show ? 1 : 0,
        transform: show
            ? "translateX(0px) scale(1)"
            : "translateX(100px) scale(0.95)",
        config: { tension: 260, friction: 20 },
    });

    if (!show) return null;

    const variant = variants[type];

    return (
        <animated.div
            style={animation}
            className={`fixed top-6 right-6 z-50 ${variant.bg} ${variant.text}
      px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[280px]`}
        >
            <span className="text-2xl">{variant.icon}</span>
            <span className="flex-1 font-medium">{message}</span>
            <button
                onClick={onClose}
                className="text-xl font-bold hover:opacity-80"
            >
                ×
            </button>
        </animated.div>
    );
};

export default Alert;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition"; // adjust path
import useAuthIntegrationHouse from "../utils/useAuthIntegrationHouse";
import Alert from "../components/Alert";
import DarkVeil from "../components/DarkVeil";

const Signup = () => {
    const navigate = useNavigate();
    const { userRegistration } = useAuthIntegrationHouse();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [alert, setAlert] = useState({ show: false, type: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => {
            setAlert((prev) => ({ ...prev, show: false }));
        }, 3500);
    };

    // Form validation
    const validateForm = () => {
        let isValid = true;
        const newErrors = { name: "", email: "", password: "" };

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
            isValid = false;
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
            };

            const response = await userRegistration(payload);

            showAlert("success", "Account created successfully!");
            setTimeout(() => {
                navigate("/login");
            }, 1800); // faster transition after success
        } catch (error) {
            showAlert("error", error?.message || "Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <PageTransition>
            <Alert
                show={alert.show}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, show: false })}
            />

            <div className="relative min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center px-6 overflow-hidden">

                {/* Background Effect */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <DarkVeil />
                </div>

                <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Create Your Data<span className="text-indigo-700">dox</span> Account
                    </h2>

                    <form onSubmit={handleSignup} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition ${errors.name
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                    }`}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition ${errors.email
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                    }`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition ${errors.password
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                    }`}
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-xl text-white font-medium transition ${isLoading
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
                                }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                                        />
                                    </svg>
                                    Creating account...
                                </span>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-8">
                        <p className="text-gray-600 mb-3">Already have an account?</p>
                        <button
                            onClick={handleLoginRedirect}
                            className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Signup;
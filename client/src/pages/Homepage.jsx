import Antigravity from '../components/Antigravity';
import SplashCursor from '../components/SplashCursor';
import Particles from '../components/Particles';
import React, { useState } from "react";
import { useScroll, useSpring, animated, useTrail } from "@react-spring/web";
import AnimatedLoginButton from "../components/AnimatedLoginButton";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";

// Features data
const features = [
    {
        title: "Upload from Anywhere",
        desc: "Easily store your files or text from any device, anytime.",
    },
    {
        title: "Access Anywhere",
        desc: "Retrieve your data instantly, wherever you are.",
    },
    {
        title: "Secure & Reliable",
        desc: "Your data is encrypted and protected at all times.",
    },
    {
        title: "Fast & Efficient",
        desc: "Optimized for speed, saving you time and effort.",
    },
];

const Homepage = () => {
    const { scrollYProgress } = useScroll()
    const [hovered, setHovered] = useState(false);

    const navigate = useNavigate();
    // Hero animation
    const heroAnimation = useSpring({
        from: { opacity: 0, transform: "translateY(30px)" },
        to: { opacity: 1, transform: "translateY(0px)" },
        delay: 200,
    });

    // Features animation
    const trail = useTrail(features.length, {
        from: { opacity: 0, transform: "translateY(20px)" },
        to: { opacity: 1, transform: "translateY(0px)" },
        delay: 400,
    });

    const handleSignUp = () => {
        navigate("/signup");
    }

    const handleLoginClick = () => {
        navigate("/login");
    }
    return (
        <>
            {/* <SplashCursor /> */}
            <PageTransition>
                {/* <animated.div className="w-full font-sans bg-white text-gray-900" style={{ opacity: scrollYProgress }}> */}
                <animated.div className="w-full font-sans bg-white text-gray-900">
                    {/* Hero Section */}

                    {/* <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                       
                    </div> */}
                    <section className="relative w-full min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-center px-6 overflow-hidden">

                        {/* Antigravity Background */}
                        <div className="absolute inset-0 z-0">
                            <Particles
                                particleColors={['#ffffff', '#ffffff']}
                                particleCount={425}
                                particleSpread={20}
                                speed={0.1}
                                particleBaseSize={150}
                                moveParticlesOnHover={true}
                                alphaParticles={false}
                                disableRotation={false}
                            />
                            <Antigravity
                                count={1240}
                                magnetRadius={6}
                                ringRadius={5}
                                waveSpeed={1.8}
                                waveAmplitude={2.2}
                                particleSize={0.8}
                                lerpSpeed={1.05}
                                color="#be3691ff"
                                autoAnimate={true}
                                particleVariance={1}
                            />
                        </div>

                        {/* Hero Content */}
                        <animated.div
                            style={heroAnimation}
                            className="relative z-10 text-white max-w-3xl"
                        >
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Datadox
                            </h1>

                            <h2 className="text-4xl font-bold text-center mb-12">
                                Your Data, Anywhere, Anytime
                            </h2>

                            <p className="text-lg md:text-xl mb-8">
                                Effortlessly upload, store, and retrieve your data from anywhere,
                                securely and instantly.
                            </p>

                            <div className="space-x-4">
                                <button
                                    onClick={handleSignUp}
                                    className="btn btn-primary"
                                    style={{ cursor: "pointer" }}
                                >
                                    Get Started
                                </button>
                                <AnimatedLoginButton />
                            </div>
                        </animated.div>

                    </section>


                    {/* Features Section */}
                    <section className="container mx-auto px-6 py-20 bg-gray-50 text-gray-900">
                        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Datadox</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                            {trail.map((style, index) => (
                                <animated.div
                                    key={index}
                                    style={style}
                                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
                                >
                                    <h3 className="text-xl font-semibold mb-2">{features[index].title}</h3>
                                    <p className="text-gray-600">{features[index].desc}</p>
                                </animated.div>
                            ))}
                        </div>
                    </section>

                    {/* Call-to-Action Section */}
                    <section className="container mx-auto px-6 py-20 text-center bg-gray-100">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
                        <p className="text-gray-700 mb-6">
                            Experience seamless data management today. Try it for free or log in to your account.
                        </p>
                        <div className="space-x-4">
                            <button className="btn btn-primary">Try Now</button>
                            <button className="btn btn-secondary" onClick={handleLoginClick}>Login</button>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="container mx-auto px-6 py-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                        <p className="text-gray-700 mb-6">
                            Have questions or need support? Contact our team anytime and we’ll help you get the most out of Datadox.
                        </p>
                        <button className="btn btn-accent">Contact Us</button>
                    </section>

                    {/* Footer */}
                    <footer className="bg-gray-900 py-8 text-center text-sm text-gray-300">
                        <div className="mb-4 space-x-4">
                            <a href="#" className="hover:text-white">About Us</a>
                            <a href="#" className="hover:text-white">Documentation</a>
                            <a href="#" className="hover:text-white">Tutorials</a>
                            <a href="#" className="hover:text-white">Contact</a>
                            <a href="#" className="hover:text-white">Privacy Policy</a>
                            <a href="#" className="hover:text-white">Terms of Service</a>
                        </div>
                        <p>©2025 Datadox. All rights reserved.</p>
                    </footer>
                </animated.div>
            </PageTransition>
        </>
    );
};

export default Homepage;

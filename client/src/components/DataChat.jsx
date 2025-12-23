import React from "react";
import { useTrail, animated } from "@react-spring/web";

const DataChat = ({ data }) => {
    const trail = useTrail(data.length, {
        from: { opacity: 0, transform: "translateY(20px)" },
        to: { opacity: 1, transform: "translateY(0px)" },
        config: { tension: 250, friction: 20 },
    });

    return (
        <div className="max-w-4xl mx-auto py-16 px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
                Your Stored Data
            </h2>

            <div className="space-y-6">
                {trail.map((style, index) => {
                    const item = data[index];

                    return (
                        <animated.div
                            key={item.id}
                            style={style}
                            className="flex justify-start"
                        >
                            <div className="bg-white shadow-xl rounded-2xl p-5 max-w-[80%] border-l-4 border-indigo-500">
                                {/* TEXT DATA */}
                                {item.type === "text" && (
                                    <>
                                        <p className="text-gray-800 text-base">
                                            {item.content}
                                        </p>
                                        <span className="text-xs text-gray-500 block mt-2">
                                            {item.createdAt}
                                        </span>
                                    </>
                                )}

                                {/* FILE DATA */}
                                {item.type === "file" && (
                                    <>
                                        <p className="font-semibold text-gray-900 mb-2">
                                            📄 {item.fileName}
                                        </p>
                                        <a
                                            href={item.fileUrl}
                                            download
                                            className="btn btn-secondary btn-sm"
                                        >
                                            Download
                                        </a>
                                        <span className="text-xs text-gray-500 block mt-2">
                                            {item.createdAt}
                                        </span>
                                    </>
                                )}
                            </div>
                        </animated.div>
                    );
                })}
            </div>
        </div>
    );
};

export default DataChat;

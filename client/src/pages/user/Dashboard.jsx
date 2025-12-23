import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition";
import useDataIntegrationHouse from "../../utils/useDataIntegrationHouse";
import { formatDistanceToNow } from "date-fns";

// Mock user for now (replace with real auth later)

const Dashboard = () => {
    const { getDataSource, addDataSource, getDataSourceById } = useDataIntegrationHouse();
    const navigate = useNavigate();

    const [user] = useState(sessionStorage.getItem("username"));
    const [userId] = useState(sessionStorage.getItem("id"));
    const [dataSources, setDataSources] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [newContent, setNewContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    const messagesEndRef = useRef(null);

    // Fetch data sources on mount
    useEffect(() => {
        if (!sessionStorage.getItem("loggedin")) {
            navigate("/login");
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                const sources = await getDataSource(); // assuming this returns Promise
                setDataSources(sources || []);
                if (sources?.length > 0) {
                    setSelectedId(sources[0].id); // auto-select first
                }
            } catch (err) {
                setError("Failed to load data sources");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (!fetchStatus) {
            fetchData();
            setFetchStatus(true);
        }
    }, [getDataSource, fetchStatus]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const sources = await getDataSource(); // assuming this returns Promise
            setDataSources(sources || []);
            if (sources?.length > 0) {
                setSelectedId(sources[0].id); // auto-select first
            }
        } catch (err) {
            setError("Failed to load data sources");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Auto-scroll to bottom when new content is added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedId, dataSources]);

    // Handle adding new data source
    const handleAddData = async (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newContent.trim()) return;

        try {
            const newData = {
                userId: userId,
                title: newTitle.trim(),
                contentType: "text/plain", // or "application/json" if you want
                content: newContent.trim(),
            };

            const added = await addDataSource(newData);
            if (added)
                fetchData();
            // setDataSources((prev) => [...prev, added]);
            // setSelectedId(added.id);
            setNewTitle("");      // Reset fields
            setNewContent("");
        } catch (err) {
            setError("Failed to add data source");
            console.error(err);
        }
    };

    const selectedData = dataSources.find((item) => item.id === selectedId);

    // Hero animation
    const heroSpring = useSpring({
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0 },
        delay: 200,
    });

    return (
        <PageTransition>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                {/* Header */}
                <header className="bg-indigo-700 text-white shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Datadox Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <span>Welcome, {user}</span>
                            <button
                                onClick={() => navigate("/logout")}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar - Data Sources List */}
                    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col" style={{ height: "85dvh" }}>
                        <div className="p-4 border-b bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-800">Your Data Sources</h2>
                        </div>

                        {loading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : error ? (
                            <div className="p-4 text-red-600">{error}</div>
                        ) : dataSources.length === 0 ? (
                            <div className="flex-1 p-6 text-center text-gray-500">
                                No data sources yet. Start by adding one below!
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-scroll">
                                {dataSources.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedId(item.id)}
                                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${selectedId === item.id ? "bg-indigo-50 border-l-4 border-indigo-600" : ""
                                            }`}
                                    >
                                        <div className="font-medium text-gray-900 truncate">{item.title}</div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add new data source form at bottom of sidebar */}
                        <form onSubmit={handleAddData} className="p-4 border-t bg-gray-50">
                            <div className="space-y-4">
                                {/* Title Input */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        placeholder="Enter a title for your note..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        required
                                    />
                                </div>

                                {/* Content Textarea */}
                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                        Content
                                    </label>
                                    <textarea
                                        id="content"
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                        placeholder="Type your message or content here... (supports long text)"
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-y min-h-[120px]"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={!newTitle.trim() || !newContent.trim()}
                                        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                                    >
                                        Add Note
                                    </button>
                                </div>
                            </div>
                        </form>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 flex flex-col bg-gray-100">
                        {selectedData ? (
                            <animated.div style={heroSpring} className="flex-1 p-6 overflow-y-auto">
                                <div className="max-w-4xl mx-auto">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedData.title}</h2>
                                    <div className="text-sm text-gray-500 mb-6">
                                        Created {formatDistanceToNow(new Date(selectedData.createdAt), { addSuffix: true })}
                                    </div>

                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                        <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm leading-relaxed">
                                            {selectedData.content}
                                        </pre>
                                    </div>
                                </div>
                            </animated.div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-500">
                                {loading ? "Loading..." : "Select a data source or create a new one"}
                            </div>
                        )}
                    </main>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
                    <p>© {new Date().getFullYear()} Datadox. All rights reserved.</p>
                </footer>
            </div>
        </PageTransition>
    );
};

export default Dashboard;
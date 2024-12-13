import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if the admin is already logged in
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
        if (isLoggedIn) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://jan-seva-kendra-api.vercel.app/api/admin-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Invalid username or password");
            }

            const result = await response.json();
            alert(result.message);

            // Save login state
            localStorage.setItem("isAdminLoggedIn", true);
            setIsAuthenticated(true);
        } catch (err) {
            alert(err.message);
            setIsAuthenticated(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isAdminLoggedIn");
        setIsAuthenticated(false);
        navigate("/");
    };

    if (isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 my-16 max-w-md w-full">
                    <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                        Welcome, Admin!
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-16 px-4 bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full"
            >
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Admin Login
                </h1>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Username:
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Admin;
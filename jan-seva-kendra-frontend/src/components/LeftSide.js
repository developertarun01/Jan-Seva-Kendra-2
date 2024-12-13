import React, { useState } from "react";

function LeftSide() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative h-screen flex">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-blue-600 text-white transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } w-64 shadow-lg`}
            >
                <div className="p-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Menu</h2>
                    <button
                        className="text-white focus:outline-none"
                        onClick={toggleSidebar}
                    >
                        ✕
                    </button>
                </div>
                <ul className="mt-4 space-y-4 px-4">
                    <li>
                        <a
                            href="#"
                            className="block text-lg hover:bg-blue-500 rounded-md px-2 py-1"
                        >
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block text-lg hover:bg-blue-500 rounded-md px-2 py-1"
                        >
                            Profile
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block text-lg hover:bg-blue-500 rounded-md px-2 py-1"
                        >
                            Settings
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block text-lg hover:bg-blue-500 rounded-md px-2 py-1"
                        >
                            Logout
                        </a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="">
                <button
                    className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 transition"
                    onClick={toggleSidebar}
                >
                    {isOpen ? "Close" : "Open"} Menu
                </button>
            </div>
        </div>
    );
}

export default LeftSide;

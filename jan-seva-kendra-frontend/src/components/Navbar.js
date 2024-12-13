import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Jan Seva Kendra
        </Link>

        {/* Hamburger Icon */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Links for Desktop */}
        <ul className="hidden md:flex space-x-4">
          {/* <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li> */}
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/faqs" className="hover:text-gray-200">
              FAQs
            </Link>
          </li>

          <li>
            <Link to="/admin" className="hover:text-gray-200">
              Admin
            </Link>
          </li>
        </ul>

        {/* Links for Mobile */}
        {isMenuOpen && (
          <ul className="absolute top-16 left-0 w-full bg-blue-600 text-white flex flex-col items-center space-y-4 py-4 shadow-lg md:hidden">
            <li>
              <Link
                to="/"
                className="hover:text-gray-200"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-gray-200"
                onClick={toggleMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-200"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/faqs"
                className="hover:text-gray-200"
                onClick={toggleMenu}
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="hover:text-gray-200"
                onClick={toggleMenu}
              >
                Admin
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-yellow-500">
              MoonPhaseCalculator
            </Link>
          </div>

          {/* Menu Items (Desktop) */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-yellow-400">
              Calculator
            </Link>
            <Link to="/howitworks" className="hover:text-yellow-400">
              How It Works
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 transform transition-transform ${
                  isOpen ? 'rotate-90' : 'rotate-0'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-yellow-400"
              onClick={() => setIsOpen(false)} 
            >
              Calculator
            </Link>
            <Link
              to="/howitworks"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-yellow-400"
              onClick={() => setIsOpen(false)} 
            >
              How It Works
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

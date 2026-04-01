import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Charifund
        </h1>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 transform transition-all duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-sm font-medium text-red-600 hover:text-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-blue-700 transition"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
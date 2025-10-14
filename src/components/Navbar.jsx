import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsRegister }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("user");

    // Update state to show register page
    setIsRegister(false);

    // Navigate to register page
    navigate("/register");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-4">
      {/* Left Side - Logo / Brand */}
      <a className="navbar-brand fw-bold text-primary" href="/">
        🛒 ShopVerse
      </a>

      {/* Right Side */}
      <div className="ms-auto d-flex align-items-center">
        {/* User Info */}
        <div className="d-flex align-items-center me-3">
          <FaUserCircle size={22} className="me-2 text-primary" />
          <span className="fw-semibold">Admin</span>
        </div>

        {/* Logout Button */}
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

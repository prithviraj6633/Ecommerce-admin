import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTags, FaListAlt, FaBox } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex flex-column bg-white border-end vh-100 p-4 shadow-sm">
      <h4 className="text-center fw-bold mb-4 text-primary">Admin Panel</h4>

      <ul className="list-unstyled">
        <li className="mb-3">
          <Link
            to="/brands"
            className={`d-flex align-items-center px-3 py-2 rounded text-decoration-none ${
              isActive("/brands") ? "bg-primary text-white" : "text-dark"
            }`}
          >
            <FaTags className="me-2" />
            Brands
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/categories"
            className={`d-flex align-items-center px-3 py-2 rounded text-decoration-none ${
              isActive("/categories") ? "bg-primary text-white" : "text-dark"
            }`}
          >
            <FaListAlt className="me-2" />
            Categories
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/products"
            className={`d-flex align-items-center px-3 py-2 rounded text-decoration-none ${
              isActive("/products") ? "bg-primary text-white" : "text-dark"
            }`}
          >
            <FaBox className="me-2" />
            Products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

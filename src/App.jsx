import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import BrandPage from "./pages/brand/brandPage";
import CategoryPage from "./pages/category/categoryPage";
import ProductPage from "./pages/product/productPage";
import Sidebar from "./components/sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import LoginPage from "./components/LoginPage.jsx";

function App() {
  const [isRegistered, setIsRegister] = useState(!!localStorage.getItem("user"));

  return (
    <Router>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        {/* Show navbar only if logged in */}
        {isRegistered && <Navbar setIsRegister={setIsRegister} />}

        <div className="d-flex flex-grow-1">
          {/* Show sidebar only if logged in */}
          {isRegistered && <Sidebar />}

          {/* Main content */}
          <div className="flex-grow-1 p-4 bg-light">
            <Routes>
              {/* Default route */}
              <Route
                path="/"
                element={
                  isRegistered ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/register"
                element={<RegisterPage setIsRegister={setIsRegister} />}
              />
              <Route path="/brands" element={<BrandPage />} />
              <Route path="/categories" element={<CategoryPage />} />
              <Route path="/products" element={<ProductPage />} />

              {/* Fallback */}
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;

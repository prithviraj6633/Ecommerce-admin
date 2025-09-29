import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const inputRef = useRef();

  // Autofocus email input
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || {});
  }, []);

  function handleLogin(e) {
    e.preventDefault();

    try {
      if (user.email === email && user.password === password) {
        alert("✅ Login Success");
        navigate("/"); // redirect after login
      } else {
        alert("❌ Invalid credentials");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0 p-5 rounded-4" style={{ maxWidth: "420px", width: "100%" }}>
        
        {/* Logo / Title */}
        <div className="text-center mb-4">
          <span style={{ fontSize: "3rem" }}>🛒</span>
          <h3 className="mt-2 text-primary fw-bold">Ecommerce Admin</h3>
          <p className="text-muted small">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              type="email"
              ref={inputRef}
              className="form-control rounded-3 shadow-sm"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-3 shadow-sm"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember me + Forgot password */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label small" htmlFor="remember">
                Remember me
              </label>
            </div>
            <a href="#" className="small text-decoration-none text-primary">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100 py-2 rounded-3 fw-semibold">
            Login
          </button>

          {/* Register Link */}
          <div className="text-center mt-3">
            <small>
              Don’t have an account?{" "}
              <Link to="/register" className="text-decoration-none fw-semibold text-primary">
                Register here
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

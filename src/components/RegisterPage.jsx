import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = ({ setIsRegister }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleRegister(event) {
    event.preventDefault();
    const payload = { name: userName, email, password };
    console.log(payload, "payload");

    localStorage.setItem("user", JSON.stringify(payload));
    setIsRegister(true);
    navigate("/");
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="text-center text-primary mb-4">Create Account</h2>
        
        <form onSubmit={handleRegister}>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="userName" className="form-label fw-semibold">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Terms checkbox */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              required
            />
            <label className="form-check-label" htmlFor="terms">
              I agree to the <a href="#">Terms & Conditions</a>
            </label>
          </div>

          {/* Buttons */}
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Register
          </button>

          <div className="text-center">
            <small>
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none fw-semibold">
                Login here
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

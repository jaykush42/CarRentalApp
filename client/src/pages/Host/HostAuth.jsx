// src/pages/HostAuth.jsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupHost, loginHost } from "../../redux/slices/authHostSlice";
import { Navigate } from "react-router-dom";
import "../Auth.css";
import { CITIES } from "../../utils/cities";

const HostAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authHost);

  const [mode, setMode] = useState("login");
  const [passwordMismatch, setPasswordMismatch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    city: "",
    hostPin: "",
  });

  const [contactError, setContactError] = useState("");
  const [pinError, setPinError] = useState("");
  const [formError, setFormError] = useState("");

  const validateContactNumber = (number) => /^[6-9]\d{9}$/.test(number);
  const validateHostPin = (pin) => /^\d{6}$/.test(pin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setContactError("");
    setPinError("");
    setFormError("");
    setPasswordMismatch;

    if (!validateHostPin(formData.hostPin)) {
      setPinError("Host PIN must be a 6-digit number.");
      setTimeout(() => setPinError(""), 3000);
      return;
    }

    if (mode === "signup") {
      if (!validateContactNumber(formData.contactNumber)) {
        setContactError(
          "Invalid contact number. It should be a 10-digit number starting with 6-9."
        );
        setTimeout(() => setContactError(""), 3000);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setPasswordMismatch("Passwords do not match.");
        setTimeout(() => setPasswordMismatch(""), 3000);
        return;
      }

      dispatch(signupHost(formData))
        .unwrap()
        .catch((err) => {
          if (err.message && err.message.includes("already registered")) {
            setFormError("Host already registered, please login.");
          } else {
            setFormError("Signup failed, please try again.");
          }
          setTimeout(() => setFormError(""), 3000);
        });
    } else {
      dispatch(
        loginHost({
          email: formData.email,
          password: formData.password,
          hostPin: formData.hostPin,
        })
      )
        .unwrap()
        .catch(() => {
          setFormError("Login failed, check your credentials.");
          setTimeout(() => setFormError(""), 3000);
        });
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/host/dashboard" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="login-card p-5 shadow-lg rounded w-100"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="mb-4 text-center">
          {mode === "signup" ? "Host Sign Up" : "Host Login"}
        </h2>

        <div className="d-flex justify-content-center gap-3 mb-4">
          <button
            type="button"
            className={`btn w-50 ${
              mode === "login" ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>

          <button
            type="button"
            className={`btn w-50 ${
              mode === "signup" ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <input
                type="text"
                className="form-control mb-3"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {mode === "signup" && (
            <input
              type="text"
              className="form-control mb-3"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          )}
          {mode === "signup" && (
            <select
              className="form-control mb-3"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}

          {contactError && (
            <small className="text-danger">{contactError}</small>
          )}

          <div className="input-group mb-3">
            <input
              className="form-control"
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {mode === "signup" && (
            <div className="input-group mb-3">
              <input
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          )}

          <input
            type="password"
            className="form-control mb-3"
            name="hostPin"
            placeholder="6-digit Host PIN"
            value={formData.hostPin}
            onChange={handleChange}
            required
          />

          {pinError && <small className="text-danger">{pinError}</small>}

          <button
            type="submit"
            className="btn btn-danger w-100"
            disabled={auth.isLoading}
          >
            {auth.isLoading
              ? mode === "signup"
                ? "Signing Up..."
                : "Logging In..."
              : mode === "signup"
              ? "Sign Up"
              : "Login"}
          </button>
        </form>

        {passwordMismatch && (
          <small className="text-danger">{passwordMismatch}</small>
        )}

        {formError && (
          <div className="alert alert-danger mt-3">{formError}</div>
        )}
        {auth.error && !formError && (
          <div className="alert alert-danger mt-3">{auth.error}</div>
        )}
      </div>
    </div>
  );
};

export default HostAuth;

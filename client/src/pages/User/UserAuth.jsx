import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, loginUser } from "../../redux/slices/authUserSlice";
import { useLocation, useNavigate } from "react-router-dom";
import "../Auth.css";
import { CITIES } from "../../utils/cities";


const UserAuth = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authUser);

  const [mode, setMode] = useState("login");
  const [contactError, setContactError] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    city: "",
  });

  const validateContactNumber = (number) => /^[6-9]\d{9}$/.test(number);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setContactError("");
    setPasswordMismatch("");

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

      try {
        await dispatch(signupUser(formData)).unwrap();
      } catch (err) {
        setFormError(err.message || "Sign up failed. Please try again.");
        setTimeout(() => setFormError(""), 3000);
        return;
      }
    } else {
      try {
        await dispatch(
          loginUser({
            email: formData.email,
            password: formData.password,
          })
        ).unwrap();
      } catch (err) {
        setFormError(err.message || "Login failed. Please try again.");
        setTimeout(() => setFormError(""), 3000);
        return;
      }
    }
  };

  if (auth.isAuthenticated) {
    const from = state?.url ? `${state.url}${state.id}` : "/cars";
    return navigate(from, {
      state: {
        id: state?.id,
        city: state?.city || auth.user?.city || "",
        startDate: state?.startDate,
        endDate: state?.endDate,
        selectedOptions: state?.selectedOptions,
        withDriver: state?.withDriver,
      },
    });
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="signup-form p-5 shadow-lg rounded">
        <h2 className="mb-4 text-center">
          {mode === "signup" ? "User Sign Up" : "User Login"}
        </h2>

        <div className="d-flex justify-content-center gap-3 mb-4">
          <button
            type="button"
            className={`btn w-50 ${
              mode === "login" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`btn w-50 ${
              mode === "signup" ? "btn-primary" : "btn-outline-primary"
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
                className="form-control mb-3"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
              {contactError && (
                <small className="text-danger">{contactError}</small>
              )}

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
            </>
          )}

          {mode === "login" && <h6>Email Address</h6>}
          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {mode === "login" && <h6>Password</h6>}
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
          {passwordMismatch && (
            <small className="text-danger">{passwordMismatch}</small>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
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

        {auth.isAuthenticated && (
          <div className="alert alert-success mt-3">
            Successfully {mode === "signup" ? "signed up" : "logged in"}!
          </div>
        )}

        {auth.error && (
          <div className="alert alert-danger mt-3">{auth.error}</div>
        )}
      </div>
    </div>
  );
};

export default UserAuth;

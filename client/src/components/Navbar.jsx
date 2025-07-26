// src/components/Navbar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authUserSlice";
import { logoutHost } from "../redux/slices/authHostSlice";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authUser);
  const { host } = useSelector((state) => state.authHost);

  const navigate = useNavigate();

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = () => {
    if (user) dispatch(logoutUser());
    if (host) dispatch(logoutHost());
    if (!user || !host) {
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-body">
      <div className="container d-flex align-items-center mt-1">
        {!host && (
          <Link className="navbar-brand fs-3 fw-bold" to="/">
            Rent&Go
          </Link>
        )}
        {host && <Link className="navbar-brand fs-3 fw-bold">Rent&Go</Link>}

        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${
            isNavCollapsed ? "collapse" : ""
          } navbar-collapse justify-content-center`}
          id="navbarNav"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            {!host && (
              <li className="nav-item">
                <Link
                  className="nav-link text-black fs-5 fw-bolder mr-3"
                  to="/cars"
                >
                  Cars
                </Link>
              </li>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-black fs-5 fw-bolder mr-3"
                    to="/bookings"
                  >
                    My Bookings
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link text-black fs-5 fw-bolder mr-3"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}

            {host && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-black fs-5 fw-bolder mr-3"
                    to="/host/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link text-black fs-5 fw-bolder mr-3"
                    to="/host/cars"
                  >
                    Cars Status
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link text-black fs-5 fw-bolder mr-3"
                    to="/host/manageCars"
                  >
                    Manage Cars
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link text-black fs-5 fw-bolder mr-3"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {user || host ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/auth/user">
                    <button
                      type="button"
                      className="btn btn-outline-primary me-2"
                    >
                      User Login
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/auth/host">
                    <button type="button" className="btn btn-outline-danger">
                      Host Login
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

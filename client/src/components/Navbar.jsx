import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body">
            <div className="container">
                <Link className="navbar-brand fs-3 fw-bold" to="/">My App</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {user && user.isAdmin && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">Admin Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/cars">Manage Cars</Link>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">User Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/book">Book Car</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/bookings">My Bookings</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {user ? (
                            <li className="nav-item">
                                <button className="btn btn-outline-danger" onClick={() => dispatch(logout())}>Logout</button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        <button type="button" className="btn btn-outline-light me-2">Login</button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">
                                        <button type="button" className="btn btn-warning">Sign-up</button>
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

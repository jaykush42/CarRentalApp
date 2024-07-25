import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import './Navbar.css';

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-body">
            <div className="container d-flex align-items-center mt-1">
                <Link className="navbar-brand fs-3 fw-bold" to="/">Rent&Go</Link>

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

                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-center`} id="navbarNav">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-black fs-5 fw-bolder mr-3" to="/cars">Cars</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-black fs-5 fw-bolder mr-3" to="/bookings">My Bookings</Link>
                        </li>

                        {user && user.isAdmin && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-black fs-5 fw-bolder mr-3" to="/admin/cars">Manage Cars</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-black fs-5 fw-bolder mr-3" to="/profile">Profile</Link>
                                </li>
                            </>
                        )}
                        {user && !user.isAdmin && (
                            <>
                                
                                <li className="nav-item">
                                    <Link className="nav-link text-black fs-5 fw-bolder mr-3" to="/profile">Profile</Link>
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
                                    <Link className="nav-link text-black fs-5 fw-bolder mr-3" to="/login">
                                        <button type="button" className="btn btn-outline-success me-2">Login</button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-black fs-5 fw-bolder mr-3" to="/signup">
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

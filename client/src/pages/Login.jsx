import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import './Auth.css';  // Import custom CSS for additional styling

const Login = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="login-card p-5 shadow-lg rounded">
                <h2 className="mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>Login</button>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    );
};

export default Login;

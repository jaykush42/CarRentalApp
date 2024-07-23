import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import './Auth.css';  // Import custom CSS for additional styling

const Login = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error, isAuthenticated } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({ email: '', password: '' });
    // const [message, setMessage] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (dateError) {
        //     setMessage('Error: ' + dateError);
        //     return;
        // }
        dispatch(login(formData));
    };

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 w-60">
            <div className="login-card p-5 shadow-lg rounded w-60">
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
                {error && <div class="alert alert-danger mt-3" role="alert">{"Login failed, check email and password"}</div>}
            </div>
        </div>
       
    );
};

export default Login;

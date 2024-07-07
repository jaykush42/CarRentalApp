import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import './Auth.css';  // Import custom CSS for additional styling

const Signup = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(formData));
    };

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="signup-form p-5 shadow-lg rounded">
                <h2 className="mb-4">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" className="form-control" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>Signup</button>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    );
};

export default Signup;

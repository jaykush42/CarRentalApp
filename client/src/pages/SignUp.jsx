import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import './Auth.css';  // Import custom CSS for additional styling

const Signup = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', contactNumber: '', city: '' });
    const [contactError, setContactError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validateContactNumber = (number) => {
        const regex = /^[6-9]\d{9}$/;
        return regex.test(number);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateContactNumber(formData.contactNumber)) {
            setContactError('Invalid contact number. It should be a 10-digit number starting with 6-9.');
            return;
        }
        setContactError('');
        dispatch(signup(formData));
    };

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className=" d-flex justify-content-center align-items-center min-vh-100">
            <div className="signup-form p-5 shadow-lg rounded">
                <h2 className="mb-4">SignUp</h2>
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
                    <div className="mb-3">
                        <input type="number" className="form-control" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
                        {contactError && <small className="text-danger">{contactError}</small>}
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" name="city" placeholder="City Name" value={formData.city} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>Signup</button>
                </form>
                {error && <div class="alert alert-danger mt-3" role="alert">{"Failed to SignUp, try again"}</div>}
            </div>
        </div>
    );
};

export default Signup;

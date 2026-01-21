// src/pages/UserProfile.jsx

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Profile.css';
import { updateUserDetails, changePassword } from '../../redux/slices/authUserSlice';

const UserProfile = () => {
    const { user, isLoading } = useSelector((state) => state.authUser); // ✅ updated slice
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        contactNumber: user?.contactNumber || '',
        city: user?.city || '',
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserDetails(formData));
        setIsEditing(false);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        dispatch(changePassword(passwordData));
        setIsChangingPassword(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            contactNumber: user?.contactNumber || '',
            city: user?.city || '',
        });
    };

    const handlePasswordCancelClick = () => {
        setIsChangingPassword(false);
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    return (
        <div className="container mt-5 profile-cont">
            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h1 className="h4 mb-0">User Profile</h1>
                </div>
                {user && (
                    <div className="card-body">
                        {/* VIEW MODE */}
                        {!isEditing && !isChangingPassword && (
                            <>
                                <div className="row mb-3">
                                    <div className="col-md-3"><strong>Name:</strong></div>
                                    <div className="col-md-9">{user.name}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3"><strong>Email:</strong></div>
                                    <div className="col-md-9">{user.email}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3"><strong>Contact Number:</strong></div>
                                    <div className="col-md-9">
                                        {user.contactNumber &&
                                            String(user.contactNumber).replace(/(\d{3})\d{4}(\d{3})/, '$1XXXX$2')}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3"><strong>City:</strong></div>
                                    <div className="col-md-9">{user.city}</div>
                                </div>
                                <button onClick={() => setIsEditing(true)} className="btn btn-success">
                                    Update Details
                                </button>
                                <button
                                    onClick={() => setIsChangingPassword(true)}
                                    className="btn btn-warning ml-3 mx-4"
                                >
                                    Change Password
                                </button>
                            </>
                        )}

                        {/* EDIT PROFILE */}
                        {isEditing && (
                            <form onSubmit={handleSubmit}>
                                {['name', 'email', 'contactNumber', 'city'].map((field) => (
                                    <div className="row mb-3" key={field}>
                                        <div className="col-md-3"><strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong></div>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button type="submit" className="btn btn-success mx-4">
                                    Save Changes
                                </button>
                                <button type="button" onClick={handleCancelClick} className="btn btn-danger ml-2">
                                    Cancel
                                </button>
                            </form>
                        )}

                        {/* CHANGE PASSWORD */}
                        {isChangingPassword && (
                            <form onSubmit={handlePasswordSubmit}>
                                {['CurrentPassword', 'NewPassword', 'ConfirmPassword'].map((field) => (
                                    <div className="row mb-3" key={field}>
                                        <div className="col-md-3"><strong>{field.replace(/([A-Z])/g, ' $1')}:</strong></div>
                                        <div className="col-md-9">
                                            <div className="input-group">
                                                <input
                                                    type={showPasswords[field] ? 'text' : 'password'}
                                                    name={field}
                                                    value={passwordData[field]}
                                                    onChange={handlePasswordChange}
                                                    className="form-control"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => togglePasswordVisibility(field)}
                                                >
                                                    {showPasswords[field] ? 'Hide' : 'Show'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button type="submit" className="btn btn-success mx-4">
                                    Change Password
                                </button>
                                <button type="button" onClick={handlePasswordCancelClick} className="btn btn-danger ml-2">
                                    Cancel
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;

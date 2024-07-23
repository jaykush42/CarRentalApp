import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserDetails } from '../redux/actions/authActions';
import './UserProfile.css';

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        contactNumber: user?.contactNumber || '',
        city: user?.city || '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserDetails(formData));
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
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

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h1 className="h4 mb-0">User Profile</h1>
                </div>
                {user && (
                    <div className="card-body">
                        {!isEditing ? (
                            <>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>Name:</strong>
                                    </div>
                                    <div className="col-md-9">
                                        {user.name}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>Email:</strong>
                                    </div>
                                    <div className="col-md-9">
                                        {user.email}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>Contact Number:</strong>
                                    </div>
                                    <div className="col-md-9">
                                        {user.contactNumber}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>City:</strong>
                                    </div>
                                    <div className="col-md-9">
                                        {user.city}
                                    </div>
                                </div>
                                <button onClick={handleEditClick} className="btn btn-success">
                                    Update Details
                                </button>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>Name:</strong>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>Email:</strong>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>Contact Number:</strong>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>City:</strong>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success mx-4">
                                    Save Changes
                                </button>
                                <button type="button" onClick={handleCancelClick} className="btn btn-danger ml-2">
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

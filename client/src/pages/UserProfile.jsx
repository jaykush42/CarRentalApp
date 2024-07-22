import React from 'react';
import { useSelector } from 'react-redux';
import './UserProfile.css';

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h1 className="h4 mb-0">User Profile</h1>
                </div>
                {user && (
                    <div className="card-body">
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;

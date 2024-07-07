import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div>
            <h1>User Profile</h1>
            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
};

export default UserProfile;

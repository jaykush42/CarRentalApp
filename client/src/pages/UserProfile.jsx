// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import './UserProfile.css';
// import { updateUserDetails, changePassword } from '../redux/slices/authSlice';

// const UserProfile = () => {
//     const { user } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();
//     const [isEditing, setIsEditing] = useState(false);
//     const [isChangingPassword, setIsChangingPassword] = useState(false);
//     const [formData, setFormData] = useState({
//         name: user?.name || '',
//         email: user?.email || '',
//         contactNumber: user?.contactNumber || '',
//         city: user?.city || '',
//     });
//     const [passwordData, setPasswordData] = useState({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: '',
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handlePasswordChange = (e) => {
//         setPasswordData({
//             ...passwordData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(updateUserDetails(formData));
//         setIsEditing(false);
//     };

//     const handlePasswordSubmit = (e) => {
//         e.preventDefault();
//         if (passwordData.newPassword !== passwordData.confirmPassword) {
//             alert("New passwords do not match!");
//             return;
//         }
//         // Dispatch password change action (assumes `changePassword` action exists)
//         dispatch(changePassword(passwordData));
//         setIsChangingPassword(false);
//     };

//     const handleCancelClick = () => {
//         setIsEditing(false);
//         setFormData({
//             name: user?.name || '',
//             email: user?.email || '',
//             contactNumber: user?.contactNumber || '',
//             city: user?.city || '',
//         });
//     };

//     const handlePasswordCancelClick = () => {
//         setIsChangingPassword(false);
//         setPasswordData({
//             currentPassword: '',
//             newPassword: '',
//             confirmPassword: '',
//         });
//     };

//     return (
//         <div className="container mt-5 profile-cont">
//             <div className="card shadow-sm">
//                 <div className="card-header bg-success text-white">
//                     <h1 className="h4 mb-0">User Profile</h1>
//                 </div>
//                 {user && (
//                     <div className="card-body">
//                         {!isEditing && !isChangingPassword && (
//                             <>
//                                 <div className="row mb-3">
//                                     <div className="col-md-3">
//                                         <strong>Name:</strong>
//                                     </div>
//                                     <div className="col-md-9">{user.name}</div>
//                                 </div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-3">
//                                         <strong>Email:</strong>
//                                     </div>
//                                     <div className="col-md-9">{user.email}</div>
//                                 </div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-3">
//                                         <strong>Contact Number:</strong>
//                                     </div>
//                                     <div className="col-md-9">
//                                         {user.contactNumber &&
//                                             String(user.contactNumber).replace(/(\d{3})\d{4}(\d{3})/, '$1XXXX$2')}
//                                     </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-3">
//                                         <strong>City:</strong>
//                                     </div>
//                                     <div className="col-md-9">{user.city}</div>
//                                 </div>
//                                 <button onClick={() => setIsEditing(true)} className="btn btn-success">
//                                     Update Details
//                                 </button>
                                
//                                 <button
//                                     onClick={() => setIsChangingPassword(true)}
//                                     className="btn btn-warning ml-3 mx-4"
//                                 >
//                                     Change Password
//                                 </button>
//                             </>
//                         )}
//                         {isEditing && (
//                             <form onSubmit={handleSubmit}>
//                                  <div className="row mb-3">
//                                     <div className="col-md-3">
//                                         <strong>Name:</strong>
//                                     </div>
//                                     <div className="col-md-9">
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             value={formData.name}
//                                             onChange={handleChange}
//                                             className="form-control"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-3">
//                                         <strong>Email:</strong>
//                                     </div>
//                                     <div className="col-md-9">
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             className="form-control"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-3">
//                                         <strong>Contact Number:</strong>
//                                     </div>
//                                     <div className="col-md-9">
//                                         <input
//                                             type="text"
//                                             name="contactNumber"
//                                             value={formData.contactNumber}
//                                             onChange={handleChange}
//                                             className="form-control"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-3">
//                                         <strong>City:</strong>
//                                     </div>
//                                     <div className="col-md-9">
//                                         <input
//                                             type="text"
//                                             name="city"
//                                             value={formData.city}
//                                             onChange={handleChange}
//                                             className="form-control"
//                                         />
//                                     </div>
//                                 </div>

//                                 <button type="submit" className="btn btn-success mx-4">
//                                     Save Changes
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={handleCancelClick}
//                                     className="btn btn-danger ml-2"
//                                 >
//                                     Cancel
//                                 </button>
//                             </form>
//                         )}
//                         {isChangingPassword && (
//                             <form onSubmit={handlePasswordSubmit}>
//                                 <div className="row mb-3">
//                                     <div className="col-md-3">
//                                         <strong>Current Password:</strong>
//                                     </div>
//                                     <div className="col-md-9">
//                                         <input
//                                             type="password"
//                                             name="currentPassword"
//                                             value={passwordData.currentPassword}
//                                             onChange={handlePasswordChange}
//                                             className="form-control"
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-3">
//                                         <strong>New Password:</strong>
//                                     </div>
//                                     <div className="col-md-9">
//                                         <input
//                                             type="password"
//                                             name="newPassword"
//                                             value={passwordData.newPassword}
//                                             onChange={handlePasswordChange}
//                                             className="form-control"
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-3">
//                                         <strong>Confirm Password:</strong>
//                                     </div>
//                                     <div className="col-md-9">
//                                         <input
//                                             type="password"
//                                             name="confirmPassword"
//                                             value={passwordData.confirmPassword}
//                                             onChange={handlePasswordChange}
//                                             className="form-control"
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <button type="submit" className="btn btn-success mx-4">
//                                     Change Password
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={handlePasswordCancelClick}
//                                     className="btn btn-danger ml-2"
//                                 >
//                                     Cancel
//                                 </button>
//                             </form>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserProfile;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UserProfile.css';
import { updateUserDetails, changePassword } from '../redux/slices/authSlice';

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);
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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords({
            ...showPasswords,
            [field]: !showPasswords[field],
        });
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
                        {!isEditing && !isChangingPassword && (
                            <>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>Name:</strong>
                                    </div>
                                    <div className="col-md-9">{user.name}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>Email:</strong>
                                    </div>
                                    <div className="col-md-9">{user.email}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>Contact Number:</strong>
                                    </div>
                                    <div className="col-md-9">
                                        {user.contactNumber &&
                                            String(user.contactNumber).replace(/(\d{3})\d{4}(\d{3})/, '$1XXXX$2')}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>City:</strong>
                                    </div>
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
                        {isEditing && (
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
                                <button
                                    type="button"
                                    onClick={handleCancelClick}
                                    className="btn btn-danger ml-2"
                                >
                                    Cancel
                                </button>
                            </form>
                        )}

                        {isChangingPassword && (
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>Current Password:</strong>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="input-group">
                                            <input
                                                type={showPasswords.currentPassword ? 'text' : 'password'}
                                                name="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordChange}
                                                className="form-control"
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => togglePasswordVisibility('currentPassword')}
                                            >
                                                {showPasswords.currentPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>New Password:</strong>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="input-group">
                                            <input
                                                type={showPasswords.newPassword ? 'text' : 'password'}
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                className="form-control"
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => togglePasswordVisibility('newPassword')}
                                            >
                                                {showPasswords.newPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <strong>Confirm Password:</strong>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="input-group">
                                            <input
                                                type={showPasswords.confirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordChange}
                                                className="form-control"
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                            >
                                                {showPasswords.confirmPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success mx-4">
                                    Change Password
                                </button>
                                <button
                                    type="button"
                                    onClick={handlePasswordCancelClick}
                                    className="btn btn-danger ml-2"
                                >
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

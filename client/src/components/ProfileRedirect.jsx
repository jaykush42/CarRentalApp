// src/pages/ProfileRedirect.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import UserProfile from '../pages/User/UserProfile';
import HostProfile from '../pages/Host/HostProfile';

const ProfileRedirect = () => {
  const { user } = useSelector((state) => state.authUser);
  const { host } = useSelector((state) => state.authHost);
  
  if (user) return <UserProfile />;
  if (host) return <HostProfile />;
  
 console.log('Redirecting to Host Profile');

  return <Navigate to="/" />;
};

export default ProfileRedirect;

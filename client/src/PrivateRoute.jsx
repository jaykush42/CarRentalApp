import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated: isUserAuthenticated, isLoading: isUserLoading } = useSelector((state) => state.authUser);
  const { isAuthenticated: isHostAuthenticated, isLoading: isHostLoading } = useSelector((state) => state.authHost);

  const location = useLocation();

  const isHostRoute =
    location.pathname.startsWith('/cars/host') ||
    location.pathname.startsWith('/hosts');

  const isUserRoute =
    location.pathname.startsWith('/bookings') ||
    location.pathname.startsWith('/checkout');

  const isSharedRoute = location.pathname.startsWith('/profile');

  if (isUserLoading || isHostLoading) {
    return <div>Loading...</div>;
  }

  if (isHostRoute && !isHostAuthenticated) {
    return <Navigate to="/auth/host" />;
  }

  if (isUserRoute && !isUserAuthenticated) {
    return <Navigate to="/cars" />;
  }

  if (isSharedRoute && !isUserAuthenticated && !isHostAuthenticated) {
    return <Navigate to="/cars" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

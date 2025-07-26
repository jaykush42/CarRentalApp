// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import CarList from "./pages/User/CarList";
import CarDetails from "./pages/User/CarDetails";
import UserAuth from "./pages/User/UserAuth";
import HostAuth from "./pages/Host/HostAuth";
import ProfileRedirect from "./components/ProfileRedirect";
import UserBookings from "./pages/User/UserBookings";
import ManageCars from "./pages/Host/ManageCars";
import OrderDetails from "./pages/User/OrderDetails";
import PrivateRoute from "./PrivateRoute";
import CheckOut from "./pages/User/CheckOut"
import HostedCars from "./pages/Host/HostedCars";
import HostDashboard from "./pages/Host/HostDashboard";

const App = () => {
 
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/auth/user" element={<UserAuth />} />
          <Route path="/auth/host" element={<HostAuth />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfileRedirect />} />
            <Route path="/bookings" element={<UserBookings />} />
            <Route path="/host/manageCars" element={<ManageCars />} />
            <Route path="/host/cars" element={<HostedCars />} />
            <Route path="/host/dashboard" element={<HostDashboard />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;

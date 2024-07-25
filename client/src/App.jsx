import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust path as per your actual store location
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Profile from './pages/UserProfile';
import UserBookings from './pages/UserBookings';
import ManageCars from './pages/ManageCars';
import PrivateRoute from './PrivateRoute'; // Adjust path as per your actual PrivateRoute location
import CarList from './pages/CarList';
import CarDetails from './pages/CarDetails';
import Checkout from './pages/CheckOut';
import OrderDetails from './pages/OrderDetails'
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cars" element={<CarList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/car/:id" element={<CarDetails />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/bookings" element={<UserBookings />} />
                        <Route path="/admin/cars" element={<ManageCars />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-details/:id" element={<OrderDetails />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;

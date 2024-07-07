import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import UserBookings from './pages/UserBookings';
import AdminHome from './pages/AdminHome';
import ManageCars from './pages/ManageCars';
import BookingCar from './pages/BookingCar';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/bookings" element={<UserBookings />} />
                    <Route path="/book" element={<BookingCar />} />
                    <Route path="/admin" element={<AdminHome />} />
                    <Route path="/admin/cars" element={<ManageCars />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;

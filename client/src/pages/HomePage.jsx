import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import carImage from '/assets/main.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [pickUpDate, setPickUpDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate('/cars', { state: { location, category, pickUpDate, returnDate } });
  };

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1>Car Rental App</h1>
      </div>
      <div className="homepage-content">
        <div className="homepage-form">
          <h2>Find & Book a Great Deal Today</h2>
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label>Location</label>
              <select className="form-control" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option>Select Location</option>
                <option>Delhi</option>
                <option>Lucknow</option>
                <option>Bhopal</option>
              </select>
            </div>
            <div className="form-group">
              <label>Vehicle Class</label>
              <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Select class</option>
                <option>Economy</option>
                <option>Standard</option>
                <option>Luxury</option>
              </select>
            </div>
            <div className="form-group">
              <label>Pick-Up</label>
              <input type="date" className="form-control" value={pickUpDate} onChange={(e) => setPickUpDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Return</label>
              <input type="date" className="form-control" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
        <div className="homepage-image">
          <img src={carImage} alt="Car" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

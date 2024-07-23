// pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import './HomePage.css';
import carImage from '/assets/main.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [pickUpDate, setPickUpDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/cars', { state: { city, category, pickUpDate, returnDate } });
  };

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1>Car Rental App</h1>
      </div>
      <div className="homepage-content">
        <div className="homepage-form">
          <h2>Find & Book a Great Deal Today</h2>
          <SearchForm
            searchParams={{ category, city, startDate: pickUpDate, endDate: returnDate, priceRange: [0, 20000] }}
            handleSearchChange={(e) => {
              const { name, value } = e.target;
              if (name === 'category') setCategory(value);
              if (name === 'city') setCity(value);
              if (name === 'startDate') setPickUpDate(value);
              if (name === 'endDate') setReturnDate(value);
            }}
            handlePriceChange={(e) => {}}
            handleSearch={handleSearch}
            handleViewAll={() => {}}
            searchApplied={false}
            showPriceRange={false}
          />
        </div>
        <div className="homepage-image">
          <img src={carImage} alt="Car" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

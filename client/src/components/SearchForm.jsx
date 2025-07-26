// components/SearchForm.jsx

import React from "react";
import { Form, Button } from "react-bootstrap";
import { CITIES } from "../utils/cities";
import { useSelector } from "react-redux";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};


const SearchForm = ({
  searchParams,
  handleSearchChange,
  handlePriceChange,
  handleSearch,
  handleViewAll,
  searchApplied,
  showPriceRange,

}) => {

  const isAuthenticated =  useSelector((state) => state.authUser);

 
  return (
    
    <Form>
      {/* Category */}
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={searchParams.category}
          onChange={handleSearchChange}
        >
          <option value="">Select Category</option>
          <option value="Economy">Economy</option>
          <option value="Standard">Standard</option>
          <option value="Luxury">Luxury</option>
        </Form.Control>
      </Form.Group>

      {/* City */}
      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          as="select"
          name="city"
          value={searchParams.city}
          onChange={handleSearchChange}
          required={!isAuthenticated.isAuthenticated}
        >
          <option value="" disabled>Select Location</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Dates */}
      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={searchParams.startDate}
          min={getTodayDate()}
          onChange={handleSearchChange}
        />
      </Form.Group>

      <Form.Group controlId="endDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          value={searchParams.endDate}
          min={searchParams.startDate || getTodayDate()}
          onChange={handleSearchChange}
        />
      </Form.Group>

      {/* Price Range */}
      {showPriceRange && (
        <Form.Group controlId="priceRange">
          <Form.Label>
            Price Range (₹0 - ₹{searchParams.priceRange[1]})
          </Form.Label>
          <Form.Control
            className="form-range p-2"
            type="range"
            min="0"
            max="20000"
            name="priceRange"
            value={searchParams.priceRange[1]}
            onChange={handlePriceChange}
            style={{ background: "#afbdb3" }}
          />
        </Form.Group>
      )}

      {/* Buttons */}
      <Button variant="primary" className="w-100 mt-3" onClick={handleSearch}>
        Search
      </Button>

      {searchApplied && (
        <Button
          variant="secondary"
          className="w-100 mt-2"
          onClick={handleViewAll}
        >
          View All
        </Button>
      )}
    </Form>
  );
};

export default SearchForm;

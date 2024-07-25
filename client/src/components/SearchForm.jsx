// components/SearchForm.jsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const SearchForm = ({ searchParams, handleSearchChange, handlePriceChange, handleSearch, handleViewAll, searchApplied, showPriceRange }) => {
  return (
    <Form>
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="category" value={searchParams.category} onChange={handleSearchChange}>
          <option value="">Select Category</option>
          <option value="Economy">Economy</option>
          <option value="Standard">Standard</option>
          <option value="Luxury">Luxury</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control as="select" name="city" value={searchParams.city} onChange={handleSearchChange}>
          <option value="">Select Location</option>
          <option value="Lucknow">Lucknow</option>
          <option value="Bhopal">Bhopal</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date" name="startDate" value={searchParams.startDate} min={getTodayDate()} onChange={handleSearchChange} />
      </Form.Group>
      <Form.Group controlId="endDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control type="date" name="endDate" value={searchParams.endDate} min={searchParams.startDate || getTodayDate()} onChange={handleSearchChange} />
      </Form.Group>

      {showPriceRange && (
        <Form.Group controlId="priceRange">
          <Form.Label>Price Range (₹0 - ₹{searchParams.priceRange[1]})</Form.Label>
          <Form.Control className="form-range p-2" type="range" min="0" max="20000" name="priceRange" value={searchParams.priceRange[1]} onChange={handlePriceChange} style={{background:'#afbdb3'}}/>
        </Form.Group>
      )}

      <Button variant="primary" className="w-100 mt-3" onClick={handleSearch}>Search</Button>
      {searchApplied && <Button variant="secondary" className="w-100 mt-2" onClick={handleViewAll}>View All</Button>}
    </Form>
  );
};

export default SearchForm;

import React from "react";
import { Form, Button } from "react-bootstrap";
import { CITIES } from "../utils/cities";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

 const SearchForm = ({ searchParams, handleSearchChange, handleSearch }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(); 
  };

  return (
    <Form noValidate onSubmit={onSubmit}>
      {/* Category */}
      <Form.Group>
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
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          as="select"
          name="city"
          value={searchParams.city || ""}
          onChange={handleSearchChange}
        >
          <option value="" disabled>Select Location</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Dates */}
      <Form.Group>
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          min={getTodayDate()}
          value={searchParams.startDate}
          onChange={handleSearchChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          min={searchParams.startDate || getTodayDate()}
          value={searchParams.endDate}
          onChange={handleSearchChange}
        />
      </Form.Group>

      <Button type="submit" className="w-100 mt-3">Search</Button>
    </Form>
  );
};
export default SearchForm;

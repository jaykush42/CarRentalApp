import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../redux/slices/carSlice";
import { BiUser, BiCar, BiGasPump } from 'react-icons/bi';
import { TbManualGearbox } from "react-icons/tb";
import "./CarList.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

const CarList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { cars, isLoading } = useSelector((state) => state.cars);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchParams, setSearchParams] = useState({
    category: '',
    city: '',
    startDate: '',
    endDate: '',
    priceRange: [0, 20000]
  });
  const [searchApplied, setSearchApplied] = useState(false);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    if (location.state) {
      const { category, location: city, pickUpDate: startDate, returnDate: endDate } = location.state;

      setSearchParams({
        category: category || '',
        city: city || '',
        startDate: startDate || '',
        endDate: endDate || '',
        priceRange: [0, 20000]
      });

      handleSearch({
        category: category || '',
        city: city || '',
        startDate: startDate || '',
        endDate: endDate || '',
        priceRange: [0, 20000]
      });
    } else {
      setFilteredCars(cars);
    }
  }, [cars, location.state]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handlePriceChange = (e) => {
    setSearchParams({ ...searchParams, priceRange: [0, parseInt(e.target.value, 10)] });
  };

  const handleSearch = (params = searchParams) => {
    const filtered = cars.filter(car => {
      return (
        (params.category === '' || car.category === params.category) &&
        (params.city === '' || (car.city && car.city.toLowerCase().includes(params.city.toLowerCase()))) &&
        (params.priceRange[1] === 20000 || car.pricePerDay <= params.priceRange[1])
      );
    });
    setFilteredCars(filtered);
    setSearchApplied(true);
  };

  const handleViewAll = () => {
    setFilteredCars(cars);
    setSearchParams({
      category: '',
      city: '',
      startDate: '',
      endDate: '',
      priceRange: [0, 20000]
    });
    setSearchApplied(false);
  };

  const renderCarCategory = (category, displayName, carsToRender) => (
    <div className="car-category mb-5">
      <h2 className="mb-4">{displayName}</h2>
      <div className="row">
        {carsToRender.filter(car => car.category === category).map((car) => (
          <div className="col-md-4 mb-4" key={car._id}>
            <div className="card h-100 cardCont">
              {car.image && (
                <img
                  className="card-img-top"
                  src={car.image}
                  alt="Car image"
                  style={{ objectFit: 'cover', height: '200px' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{car.make} {car.model}</h5>
                <p className="card-text">
                  {car.year} <br />
                  <span className="text-success">Free cancellation up to 48h before pick-up time</span> <br />
                  <BiUser /> {car.seats} seats &nbsp;
                  <BiCar /> {car.doors} doors &nbsp;
                  <BiGasPump /> {car.fuel} &nbsp;
                  <TbManualGearbox /> {car.transmission}
                </p>
                <h4>₹{car.pricePerDay}/day</h4>
              </div>
              <Link className="nav-link" to="/book">
                <div className="text-center card-footer">
                  Rent Now
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAllCategories = () => (
    <>
      {renderCarCategory('Economy', 'Economy (from ₹5000/day)', cars)}
      {renderCarCategory('Standard', 'Standard (from ₹8000/day)', cars)}
      {renderCarCategory('Luxury', 'Luxury (from ₹12000/day)', cars)}
    </>
  );

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-3">Available Cars</h1>
        <p className="lead">Browse through our collection of available cars for rent.</p>
      </div>
      <div className="row">
        <div className="col-md-3 formCont">
          <h4>Search Cars</h4>
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
              <Form.Control type="text" name="city" value={searchParams.city} onChange={handleSearchChange} />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="startDate" value={searchParams.startDate} onChange={handleSearchChange} />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" name="endDate" value={searchParams.endDate} onChange={handleSearchChange} />
            </Form.Group>
            <Form.Group controlId="priceRange">
              <Form.Label>Price Range (₹0 - ₹{searchParams.priceRange[1]})</Form.Label>
              <Form.Control className="form-range" type="range" min="0" max="20000" name="priceRange" value={searchParams.priceRange[1]} onChange={handlePriceChange} />
            </Form.Group>
            <Button variant="primary" className="w-100 mt-3" onClick={() => handleSearch()}>Search</Button>
            {searchApplied && <Button variant="secondary" className="w-100 mt-2" onClick={handleViewAll}>View All</Button>}
          </Form>
        </div>
        <div className="col-md-9 offset-md-3">
          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {searchApplied ? (
                <>
                  {renderCarCategory(searchParams.category, "Searched Cars", filteredCars)}
                  {renderAllCategories()}
                </>
              ) : (
                renderAllCategories()
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarList;

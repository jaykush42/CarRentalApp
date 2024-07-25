import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../redux/slices/carSlice";
import { BiUser, BiCar, BiGasPump } from 'react-icons/bi';
import { TbManualGearbox } from "react-icons/tb";
import "./CarList.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from '../components/SearchForm';

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
      const { category, city, pickUpDate: startDate, returnDate: endDate } = location.state;

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

  const navigate = useNavigate();

  const handleRentNow = (car) => {
    navigate('/book', { state: { car: car, startDate: searchParams.startDate, endDate: searchParams.endDate } });
  };

  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`,{state:{startDate: searchParams.startDate, endDate: searchParams.endDate}});
  };

  const renderCarCategory = (category, displayName, carsToRender) => (
    <div className="car-category mb-3">
      <h2 className="">{displayName}</h2>
      <div className="container">
        <div className="row">
          {carsToRender.filter(car => car.category === category).map((car) => (
            <div className="col-md-4" key={car._id}>
              <div className="card h-100">
                {car.image && (
                  <img
                    className="card-img-top"
                    src={car.image}
                    alt="Car image"
                    onClick={() => handleCarClick(car._id)}
                  />
                )}
                <div className="card-body" onClick={() => handleCarClick(car._id)}>
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
                  <div className="text-center card-footer" onClick={() => handleRentNow(car)}>
                    Rent Now
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAllCategories = () => (
    <>
      {renderCarCategory('Economy', 'Economy (from ₹3000/day)', cars)}
      {renderCarCategory('Standard', 'Standard (from ₹5000/day)', cars)}
      {renderCarCategory('Luxury', 'Luxury (from ₹10000/day)', cars)}
    </>
  );

  return (
    <div className="main-container">
      <div className="text-center">
        <h1 className="heading">Available Cars</h1>
        <p className="lead">Browse through our collection of available cars for rent.</p>
      </div>
      <div className="main-cont">
        <div className="homepage-form">
          <h2>Search Cars</h2>
          <SearchForm
            searchParams={searchParams}
            handleSearchChange={handleSearchChange}
            handlePriceChange={handlePriceChange}
            handleSearch={() => handleSearch(searchParams)}
            handleViewAll={handleViewAll}
            showPriceRange={true}
            searchApplied={searchApplied}
          />
        </div>
        <div className="car-list">
          {isLoading ? (
            <div className="text-center loader">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {searchApplied ? (
                <>
                  {renderCarCategory(searchParams.category, "Searched Cars", filteredCars)}
                  <h1>Other Available Cars</h1>
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

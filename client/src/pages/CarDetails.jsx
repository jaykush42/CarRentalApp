import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById, updateRating } from "../redux/slices/carSlice";
import ReactStars from 'react-rating-stars-component';
import "./CarDetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { car, isLoading, error } = useSelector((state) => state.cars);
  const {isAuthenticated, token } = useSelector((state) => state.auth);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  // const [rating, setRating] = useState(car.rating);

  const additionalOptions = [
    { name: "Child seat", price: 250 },
    { name: "Baby chair", price: 400 },
    { name: "GPS", price: 150 },
    { name: "Trailer", price: 500 },
    { name: "Roof rack", price: 500 },
  ];

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (location.state) {
      const { startDate, endDate } = location.state;
      setStartDate(startDate || '');
      setEndDate(endDate || '');
    }
  }, [location.state]);

  useEffect(() => {
    if (car && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const optionsTotal = selectedOptions.reduce(
        (acc, option) => acc + option.price,
        0
      );
      const price = numberOfDays * (car.pricePerDay + optionsTotal);
      setTotalPrice(price);
    }
  }, [car, startDate, endDate, selectedOptions]);

  const handleOptionChange = (option) => {
    const isSelected = selectedOptions.includes(option);
    const newSelectedOptions = isSelected
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];
    setSelectedOptions(newSelectedOptions);
  };

  const handleRentNow = () => {
    if(!isAuthenticated)
    { 
      localStorage.setItem('redirectAfterLogin', location.pathname);
      navigate('/login')
    }

    if (!startDate || !endDate) {
      setMessage('Please select both the pick-up and return dates.');
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      setMessage('End date must be after the start date.');
      return;
    }

    navigate('/checkout', {
      state: {
        car,
        totalPrice,
        startDate,
        endDate,
        selectedOptions
      }
    });
  
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const ratingChanged = (newRating) => {
    const updatedRating = (car.rating * 5 + newRating) / 5;
    dispatch(updateRating({ id, updatedRating, token }));
};

  return (
    <div className="container mt-4 car-cont">
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  src={car.image}
                  className="img-fluid rounded-start"
                  alt={`${car.make} ${car.model}`}
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h3 className="text-large fw-bold">
                    {car.make} {car.model} ({car.year})
                  </h3>
                  <p className="card-text">
                    <strong>Price/Day:</strong> ₹{car.pricePerDay} <br />
                    <strong>Passengers:</strong> {car.seats} <br />
                    <strong>Doors:</strong> {car.doors} <br />
                    <strong>Large Bag:</strong> {car.largeBag || 2} <br />
                    <strong>Mileage:</strong> {car.mileage} <br />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Overview</h3>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Exterior Color:</strong>{" "}
                    {car.exteriorColor || "Silver"}
                  </p>
                  <p>
                    <strong>Air Conditioner:</strong>{" "}
                    {car.airCond || "Available"}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Fuel Type:</strong> {car.fuel}
                  </p>
                  <p>
                    <strong>Transmission:</strong> {car.transmission}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Insurance and Coverage</h5>
              <p className="card-text">
                Collision Damage Waiver and Theft Protection are included with
                this car. They cover damage and theft of the vehicle, excluding
                damage or loss of tires, windshield, glass, and undercarriage.
              </p>
              <p className="card-text">
                The car has a damage excess of ₹1205.0 (includes tax) and a
                theft excess of ₹1205.0 (includes tax). Please ensure that you
                have the excess amount available on your card when you pick up
                the car.
              </p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Rating</h5>
                <ReactStars 
                  count={5}
                  onChange={token ? ratingChanged : undefined}
                  size={24}
                  activeColor="#ffd700"
                  value={Math.round(car.rating)}
                />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">₹{car.pricePerDay} /day</h5>
              <form className="bg-light p-2 text-black rounded shadow-sm">
                <div className="mb-3">
                  <label htmlFor="pickUpDate" className="form-label">
                    Pick-Up *
                  </label>
                  <input
                    type="date"
                    id="pickUpDate"
                    className="form-control"
                    value={startDate}
                    min={getTodayDate()}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="returnDate" className="form-label">
                    Return *
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="returnDate"
                    value={endDate}
                    min={startDate || getTodayDate()}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
                
                <h6>Additional Options:</h6>
                {additionalOptions.map((option) => (
                  <div className="form-check" key={option.name}>
                    <input
                      className="form-check-input border-black"
                      type="checkbox"
                      value={option.name}
                      id={option.name}
                      onChange={() => handleOptionChange(option)}
                    />
                    <label className="form-check-label" htmlFor={option.name}>
                      {option.name}: ₹{option.price} /day
                    </label>
                  </div>
                ))}
                <div className="mt-3">
                  <h6>Total: ₹{totalPrice}</h6>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRentNow}
                  >
                    Rent Now
                  </button>
                </div>
              </form>
              {message && (
                <div className="alert alert-danger mt-3">{message}</div>
              )}
            </div>
          </div>
        </div>
        </div>
        </div>
  );
};

export default CarDetails;

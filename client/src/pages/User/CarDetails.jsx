import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById, updateRating } from "../../redux/slices/carSlice";
import ReactStars from "react-rating-stars-component";
import "./CarDetails.css";
import { CHARGES } from "../../utils/additionalCharges";

const CarDetails = () => {
  const location = useLocation();
  const { state } = location;
  const { id, selectedStartDate, selectedEndDate } = state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { car, isLoading, error } = useSelector((state) => state.cars);
  const { isAuthenticated, token } = useSelector((state) => state.authUser);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [startDate, setStartDate] = useState(selectedStartDate || "");
  const [endDate, setEndDate] = useState(selectedEndDate);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [withDriver, setWithDriver] = useState(false);

  const additionalOptions = CHARGES;

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (location.state) {
      const { startDate, endDate, selectedOptions } = location.state;
      setStartDate(startDate || "");
      setEndDate(endDate || "");
      setSelectedOptions(selectedOptions || []);
      setWithDriver(location.state.withDriver || false);
    }
  }, [location.state]);

  useEffect(() => {
    if (car && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const optionsTotal = selectedOptions.reduce(
        (acc, opt) => acc + opt.price,
        0
      );
      const driverCharge =
        withDriver && car.driver?.availability ? car.driver.pricePerDay : 0;
      const price =
        numberOfDays * (car.pricePerDay + optionsTotal + driverCharge);
      setTotalPrice(price);
    }
  }, [car, startDate, endDate, selectedOptions, withDriver]);

  const handleOptionChange = (option) => {
    const isSelected = selectedOptions.includes(option);
    const newSelected = isSelected
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];
    setSelectedOptions(newSelected);
  };

  const handleRentNow = () => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectAfterLogin", location.pathname);
      return navigate("/auth/user", {
        state: {
          url: "/car/",
          id,
          startDate,
          endDate,
          selectedOptions,
          withDriver,
        },
      });
    }

    if (!startDate || !endDate) {
      setMessage("Please select both the pick-up and return dates.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      setMessage("End date must be after the start date.");
      return;
    }

    navigate("/checkout", {
      state: {
        car,
        totalPrice,
        startDate,
        endDate,
        selectedOptions,
        withDriver,
      },
    });
  };

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const ratingChanged = (newRating) => {
    const updatedRating = (car.rating * 5 + newRating) / 5;
    dispatch(updateRating({ id, updatedRating, token }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4 car-cont">
      <div className="row">
        <div className="col-lg-8">
          {/* Car Info */}
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
                  <h3 className="fw-bold">
                    {car.make} {car.model} ({car.year})
                  </h3>
                  <h4>
                    <b>{car.vehicleId}</b>
                  </h4>
                  <p>
                    <strong>Price/Day:</strong> ₹{car.pricePerDay}
                    <br />
                    <strong>Passengers:</strong> {car.seats}
                    <br />
                    <strong>Doors:</strong> {car.doors}
                    <br />
                    <strong>Mileage:</strong> {car.mileage}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="card mb-4">
            <div className="card-body">
              <h3>Overview</h3>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Fuel:</strong> {car.fuel}
                  </p>
                  <p>
                    <strong>Transmission:</strong> {car.transmission}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Air Conditioner:</strong>{" "}
                    {car.airCond || "Available"}
                  </p>
                  <p>
                    <strong>Color:</strong> {car.exteriorColor || "Silver"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div className="card mb-4">
            <div className="card-body">
              <h5>Insurance & Coverage</h5>
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

          {/* Rating */}
          <div className="card mb-4">
            <div className="card-body">
              <h5>Rating</h5>
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

        {/* Booking Sidebar */}
        <div className="col-lg-4">
          {/* ✅ Driver Availability box at top */}
          <div className="card mb-3 border-success">
            <div className="card-body">
              <h5 className="fw-bold">Driver Availability</h5>
              {car.driver?.availability ? (
                <>
                  <p>Driver available at ₹{car.driver.pricePerDay}/day</p>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="withDriver"
                      checked={withDriver}
                      onChange={() => setWithDriver(!withDriver)}
                    />
                    <label className="form-check-label" htmlFor="withDriver">
                      Include Driver
                    </label>
                  </div>
                </>
              ) : (
                <p className="fw-bold text-danger">
                  Driver is not available on this car
                </p>
              )}
            </div>
          </div>

          {/* ✅ Booking Form */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">₹{car.pricePerDay} / day</h5>
              <form className="bg-light p-2 rounded text-black shadow-sm">
                {/* Pick-up */}
                <div className="mb-3">
                  <label className="form-label">Pick-Up *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    min={getTodayDate()}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>

                {/* Return */}
                <div className="mb-3">
                  <label className="form-label">Return *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    min={startDate || getTodayDate()}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>

                {additionalOptions.map((option) => (
                  <div className="form-check" key={option.name}>
                    <input
                      className="form-check-input border-black"
                      type="checkbox"
                      id={option.name}
                      onChange={() => handleOptionChange(option)}
                      checked={selectedOptions.some(
                        (selected) => selected.name === option.name
                      )}
                    />
                    <label className="form-check-label" htmlFor={option.name}>
                      {option.name}: ₹{option.price} /day
                    </label>
                  </div>
                ))}

                {/* Total */}
                <div className="mt-3">
                  <h6
                    className={`fw-bold fs-5 ${
                      withDriver ? "text-success" : ""
                    }`}
                  >
                    Total: ₹{totalPrice}
                  </h6>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
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

// src/pages/ManageCars.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHostCars,
  addCar,
  updateCar,
  deleteCar,
} from "../../redux/slices/carSlice";
import "./ManageCars.css";

const imageUrls = [
  "/assets/brezza.jpeg",
  "/assets/amaze.jpeg",
  "/assets/luxuryHyundai.jpg",
  "/assets/luxuryKiaSUV.jpg",
  "/assets/luxuryToyota.jpg",
  "/assets/standardHyundai.jpg",
  "/assets/standardNissan.jpg",
  "/assets/standardToyota.jpg",
  "/assets/luxuryToyotaInova.png",
  "/assets/economyWagonR.png",
];

const initialCarData = {
  city: "",
  make: "",
  model: "",
  year: "",
  pricePerDay: "",
  category: "",
  image: "",
  seats: "",
  doors: "",
  transmission: "",
  fuel: "",
  mileage: "",
  rating: "",
  driver: { availability: false, pricePerDay: 0 },
  available: true,
};

const ManageCars = () => {
  const dispatch = useDispatch();
  const { cars, isLoading } = useSelector((state) => state.cars);
  const { host, token } = useSelector((state) => state.authHost || {});

  const [carData, setCarData] = useState(initialCarData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (host && token) {
      dispatch(fetchHostCars({ hostId: host._id, token }));
    }
  }, [host, token, dispatch]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (name === "availability") {
      setCarData({
        ...carData,
        driver: { ...carData.driver, availability: checked },
      });
    } else if (name === "driverPricePerDay") {
      setCarData({
        ...carData,
        driver: { ...carData.driver, pricePerDay: Number(value) },
      });
    } else if (type === "checkbox") {
      setCarData({ ...carData, [name]: checked });
    } else {
      setCarData({ ...carData, [name]: value });
    }
  };

  const resetForm = () => {
    setCarData(initialCarData);
    setIsEditing(false);
    setEditingCarId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!host || !token) return;

    const payload = { hostId: host._id, carData, token };

    if (isEditing) {
      dispatch(updateCar({ ...payload, id: editingCarId })).then(resetForm);
    } else {
      dispatch(addCar(payload)).then(resetForm);
    }
  };

  const handleEdit = (car) => {
    setCarData({ ...car });
    setIsEditing(true);
    setEditingCarId(car._id);
    setShowForm(true);
  };

  const handleDelete = (carId) => {
    if (!host || !token) return;

    dispatch(deleteCar({ hostId: host._id, carId, token })).then((res) => {
      setMessage(
        res.type === "cars/deleteCar/fulfilled"
          ? "Car deleted successfully."
          : "Failed to delete car."
      );
      setTimeout(() => setMessage(""), 3000);
    });
  };

  return (
    <div className="container mt-4 text-white manageCar-cont">
      <h1>Manage Cars</h1>

      <button
        className="btn btn-primary mb-3 fs-4 fw-bold"
        onClick={() => setShowForm(true)}
      >
        {isEditing ? "Edit Car" : "Add Car"}
      </button>

      {message && <div className="alert alert-info">{message}</div>}

      {showForm && (
        <div className="shadow-sm p-3 mb-4 bg-light rounded text-black">
          <form onSubmit={handleSubmit}>
            {[
              ["vehicleId", "Vehicle ID"],
              ["city", "City"],
              ["make", "Make"],
              ["model", "Model"],
              ["year", "Year"],
              ["pricePerDay", "Price Per Day"],
              ["mileage", "Mileage"],
            ].map(([field, label]) => (
              <div className="form-group" key={field}>
                <label className="mt-2 fw-bold">{label}</label>
                <input
                  type="text"
                  name={field}
                  className="form-control"
                  value={carData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {[
              ["category", "Car Type", ["Economy", "Standard", "Luxury"]],
              ["seats", "Seats", ["5", "7"]],
              ["doors", "Doors", ["4", "5"]],
              ["transmission", "Transmission", ["Manual","Semi-Auto", "Automatic"]],
              ["fuel", "Fuel", ["Petrol", "Diesel"]],
              ["rating", "Rating", ["3", "4", "5"]],
            ].map(([field, label, options]) => (
              <div className="form-group" key={field}>
                <label className="mt-2 fw-bold">{label}</label>
                <select
                  name={field}
                  className="form-control"
                  value={carData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select {label}</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="form-group">
              <label className="mt-2 fw-bold">Image</label>
              <select
                name="image"
                className="form-control"
                value={carData.image}
                onChange={handleChange}
                required
              >
                <option value="">Select image</option>
                {imageUrls.map((url) => (
                  <option key={url} value={url}>
                    {url}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-check mt-3">
              <input
                type="checkbox"
                className="form-check-input"
                name="availability"
                checked={carData.driver?.availability || false}
                onChange={handleChange}
              />
              <label className="form-check-label fw-bold">
                Provides Driver
              </label>
            </div>

            {carData.driver?.availability && (
              <div className="form-group">
                <label className="mt-2 fw-bold">Driver Price Per Day</label>
                <input
                  type="number"
                  name="driverPricePerDay"
                  className="form-control"
                  value={carData.driver?.pricePerDay || ""}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            )}

            <div className="form-check mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                name="available"
                checked={carData.available}
                onChange={handleChange}
              />
              <label className="form-check-label fw-bold">Available</label>
            </div>

            <button type="submit" className="btn btn-success mt-3">
              {isEditing ? "Update Car" : "Add Car"}
            </button>
            <button
              type="button"
              className="btn btn-secondary mt-3 ms-2"
              onClick={resetForm}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {Array.isArray(cars) &&
            cars.map((car) => (
              <div className="col-md-4 mb-2" key={car._id}>
                <div className="card h-100">
                  <img className="card-img-top" src={car.image} alt="Car" />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0">
                        {car.make} {car.model}
                      </h5>
                      <span > <h5>{car.vehicleId}</h5></span>
                    </div>

                    <p className="mt-2">
                      {car.category} | ₹{car.pricePerDay}/day
                    </p>

                    <p>
                      {car.driver?.availability
                        ? `Driver: ₹${car.driver.pricePerDay}/day`
                        : "Driver: Not available"}
                    </p>

                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(car)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(car._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ManageCars;

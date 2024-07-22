import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../redux/slices/carSlice";
import axios from "axios";

// Array of image URLs from the assets folder
const imageUrls = [
  "/assets/brezza.jpeg",
  "/assets/amaze.jpeg",
  // Add more image URLs as needed
];

const ManageCars = () => {
  const dispatch = useDispatch();
  const { cars, isLoading } = useSelector((state) => state.cars);
  const [carData, setCarData] = useState({
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
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleChange = (e) =>
    setCarData({ ...carData, [e.target.name]: e.target.value });

  const handleImageChange = (e) =>
    setCarData({ ...carData, image: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(
        `http://localhost:5000/api/cars/${editingCarId}`,
        carData
      );
      setIsEditing(false);
      setEditingCarId(null);
    } else {
      await axios.post("http://localhost:5000/api/cars", carData);
    }
    dispatch(fetchCars());
    setCarData({
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
    });
    setShowForm(false);
  };

  const handleEdit = (car) => {
    setCarData({ ...car });
    setIsEditing(true);
    setEditingCarId(car._id);
    setShowForm(true);
  };

  const handleDelete = async (carId) => {
    await axios.delete(`http://localhost:5000/api/cars/${carId}`);
    dispatch(fetchCars());
  };

  return (
    <div className="container mt-4">
      <h1>Manage Cars</h1>
      <button
        className="btn btn-primary mb-3 fs-4 fw-bold"
        onClick={() => setShowForm(true)}
      >
        Add Car
      </button>
      {showForm && (
        <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded text-black">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
              <label className="mt-2 fw-bold">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={carData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="mt-2 fw-bold">Make</label>
              <input
                type="text"
                name="make"
                className="form-control"
                value={carData.make}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="mt-2 fw-bold">Model</label>
              <input
                type="text"
                name="model"
                className="form-control"
                value={carData.model}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="mt-2 fw-bold">Year</label>
              <input
                type="number"
                name="year"
                className="form-control"
                value={carData.year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="mt-2 fw-bold">Price per Day</label>
              <input
                type="number"
                name="pricePerDay"
                className="form-control"
                value={carData.pricePerDay}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="mt-2 fw-bold">Category</label>
              <select
                name="category"
                className="form-control"
                value={carData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Economy">Economy</option>
                <option value="Standard">Standard</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
            <div className="form-group">
              <label className="mt-2 fw-bold">Seats</label>
              <select
                name="seats"
                className="form-control"
                value={carData.seats}
                onChange={handleChange}
                required
              >
                <option value="">Select number of seats</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
            </div>
            <div className="form-group">
              <label className="mt-2 fw-bold">Doors</label>
              <select
                name="doors"
                className="form-control"
                value={carData.doors}
                onChange={handleChange}
                required
              >
                <option value="">Select number of doors</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="form-group">
              <label className="mt-2 fw-bold">Transmission</label>
              <select
                name="transmission"
                className="form-control"
                value={carData.transmission}
                onChange={handleChange}
                required
              >
                <option value="">Select transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            <div className="form-group">
              <label className="mt-2 fw-bold">Fuel</label>
              <select
                name="fuel"
                className="form-control"
                value={carData.fuel}
                onChange={handleChange}
                required
              >
                <option value="">Select fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>
            <div className="form-group">
              <label className="mt-2 fw-bold">Mileage</label>
              <input
                type="text"
                name="mileage"
                className="form-control"
                value={carData.mileage}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="mt-2 fw-bold">Image</label>
              <select
                name="image"
                className="form-control"
                value={carData.image}
                onChange={handleImageChange}
                required
              >
                <option value="">Select an image</option>
                {imageUrls.map((url) => (
                  <option key={url} value={url}>
                    {url}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-grid gap-3 mt-3 d-md-flex justify-content-start">
              <button type="submit" className="btn btn-success">
                {isEditing ? "Update Car" : "Add Car"}
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {cars.map((car) => (
            <div className="col-md-4 mb-4" key={car._id}>
              <div className="card list h-100">
                {car.image && (
                  <img className="card-img-top" src={car.image} alt="Car" />
                )}
                <div className="card-body">
                  <h5 className="card-title">
                    {car.make} {car.model}
                  </h5>
                  <div className="row">
                    <div className="col-6">
                      <p className="card-text">Year: {car.year}</p>
                      <p className="card-text">Price per Day: ₹{car.pricePerDay}</p>
                      <p className="card-text">Category: {car.category}</p>
                      <p className="card-text">Seats: {car.seats}</p>
                    </div>
                    <div className="col-6">
                      <p className="card-text">Doors: {car.doors}</p>
                      <p className="card-text">Transmission: {car.transmission}</p>
                      <p className="card-text">Fuel: {car.fuel}</p>
                      <p className="card-text">Mileage: {car.mileage}</p>
                    </div>
                  </div>
                  <div className="d-grid gap-4 d-flex justify-content-center">
                    <button
                      className="btn btn-warning mr-2"
                      onClick={() => handleEdit(car)}
                    >
                      Update
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCars;

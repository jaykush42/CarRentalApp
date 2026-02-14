import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchForm from "../components/SearchForm";
import carImage from "/assets/main.png";
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {

   const {user,isAuthenticated} = useSelector((state) => state.authUser);

  const [filters, setFilters] = useState({
    city: isAuthenticated ? user?.city || '' : '',
    category: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

const handleSearch = () => {
  if (!filters.city) {
    alert("Please select city");
    return; 
  }

  navigate("/cars", {
    state: {
      city: filters.city,
      category: filters.category,
      pickUpDate: filters.startDate,
      returnDate: filters.endDate,
    },
  });
};


  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1>Car Rental App</h1>
      </div>

      <div className="homepage-content d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="homepage-form p-4">
          <h2 className="mb-4">Find & Book a Great Deal Today</h2>

          <SearchForm
            searchParams={{
              city: filters.city,
              category: filters.category,
              startDate: filters.startDate,
              endDate: filters.endDate,
              priceRange: [0, 20000],
            }}
            handleSearchChange={handleInputChange}
            handleSearch={handleSearch}
            searchApplied={false}
            showPriceRange={false}
          />
        </div>

        <div className="homepage-image text-center">
          <img src={carImage} alt="Car" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

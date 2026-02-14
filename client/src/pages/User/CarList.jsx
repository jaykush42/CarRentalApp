import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { discoverCars, fetchAllCars } from "../../redux/slices/carSlice";
import { BiUser, BiCar, BiGasPump } from 'react-icons/bi';
import { TbManualGearbox } from "react-icons/tb";
import "./CarList.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from '../../components/SearchForm';

const CarList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { cars, isLoading } = useSelector((state) => state.cars);
  const { user, isAuthenticated } = useSelector((state) => state.authUser);


  const [searchParams, setSearchParams] = useState({
    category: '',
    city: user?.city || 'Delhi',
    startDate: '',
    endDate: '',
    priceRange: [0, 20000]
  });

  const [filteredCars, setFilteredCars] = useState([]);
  const [cityCars, setCityCars] = useState([]);
  const [searchApplied, setSearchApplied] = useState(false);

  useEffect(() => {
    const fetchInitialCars = async () => {
      if (location.state) {

        const { category, city, pickUpDate: startDate, returnDate: endDate } = location.state;
        const filters = { category, city, startDate, endDate, priceRange: [0, 20000] };
        setSearchParams(filters);
        handleSearch(filters);
      } else if (isAuthenticated && user?.city) {

        const filters = { city: user.city };
        setSearchParams(prev => ({ ...prev, city: user.city }));
        const result = await dispatch(discoverCars({ filterData: filters }));
        if (result.meta.requestStatus === "fulfilled") {
          setCityCars(result.payload);
        }
      } else {
        dispatch(fetchAllCars());
      }
    };

    fetchInitialCars();
  }, [dispatch, isAuthenticated, user, location.state]);

  useEffect(() => {
    if (!searchApplied) setFilteredCars([]);
  }, [cars, searchApplied]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handlePriceChange = (e) => {
    setSearchParams({ ...searchParams, priceRange: [0, parseInt(e.target.value, 10)] });
  };

  const handleSearch = async (params = searchParams) => {
       
  if (!searchParams.city) {
  alert("Please select a city");
  return;
}

    const result = await dispatch(discoverCars({ filterData: params }));
    if (result.meta.requestStatus === "fulfilled") {
      setFilteredCars(result.payload);
      setSearchApplied(true);

      if (params.city) {
        const cityResult = await dispatch(discoverCars({ filterData: { city: params.city } }));
        if (cityResult.meta.requestStatus === "fulfilled") {
          setCityCars(cityResult.payload);
        }
      }
    }
  };

  const handleViewAll = () => {
    dispatch(fetchAllCars());
    setFilteredCars([]);
    setCityCars([]);
    setSearchParams({
      category: '',
      city: isAuthenticated ? user?.city || '' : '',
      startDate: '',
      endDate: '',
      priceRange: [0, 20000]
    });
    setSearchApplied(false);
  };

  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`, {
      state: {
        id: carId,
        startDate: searchParams.startDate,
        endDate: searchParams.endDate
      }
    });
  };

  const renderCarCards = (carList, label) => {
    if (carList.length === 0) return null;
    return (
      <div className="car-category mb-4">
        <h2>{label}</h2>
        <div className="container">
          <div className="row">
            {carList.map((car) => (
              <div className="col-md-4" key={car._id}>
                <div className="card h-100">
                  {car.image && (
                    <img
                      className="card-img-top"
                      src={car.image}
                      alt="Car"
                      onClick={() => handleCarClick(car._id)}
                    />
                  )}
                  <div className="card-body" onClick={() => handleCarClick(car._id)}>
                    <h5 className="card-title">{car.make} {car.model}</h5>
                    <p className="card-text">
                      {car.year} <br />
                      <span className="text-success">Free cancellation up to 48h before pick-up</span> <br />
                      <BiUser /> {car.seats} seats &nbsp;
                      <BiCar /> {car.doors} doors &nbsp;
                      <BiGasPump /> {car.fuel} &nbsp;
                      <TbManualGearbox /> {car.transmission}
                    </p>
                    <h4>₹{car.pricePerDay}/day</h4>
                  </div>
                  <div className="text-center card-footer" onClick={() => handleCarClick(car._id)}>
                    Rent Now
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="main-container">
      <div className="text-center">
        <h1 className="heading">Available Cars</h1>
        <p className="lead">Browse through our collection of available cars for rent.</p>
      </div>

      <div className="main-cont">
        <div className="homepage-form1">
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
              {searchApplied && (
                <>
                  {renderCarCards(filteredCars, "Search Results")}
                  {cityCars.length > 0 && renderCarCards(cityCars, `Other Cars in ${searchParams.city || user?.city}`)}
                  {filteredCars.length === 0 && <h2 className=" text-white text-center">No cars found for the selected filters.</h2>}
                </>
              )}

              {!searchApplied && (
                <>
                  {isAuthenticated && user?.city
                    ? renderCarCards(cityCars, `Cars Available in ${user.city}`)
                    : renderCarCards(cars, "All Cars")}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarList;

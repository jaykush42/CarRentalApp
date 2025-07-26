import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchHostCars, updateStatus } from '../../redux/slices/carSlice';
import { Switch } from '@mui/material';
import './HostedCars.css';

const HostedCars = () => {
  const dispatch = useDispatch();
  const { host, token } = useSelector((state) => state.authHost);
  const { cars: hostedCars, isLoading } = useSelector((state) => state.cars);
  const [localCars, setLocalCars] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState({
    active: false,
    inactive: false,
    noDriver: false
  });

  useEffect(() => {
    if (host && token) {
      dispatch(fetchHostCars({ hostId: host._id, token }));
    }
  }, [dispatch, host, token]);

  useEffect(() => {
    setLocalCars(hostedCars);
  }, [hostedCars]);

  const handleToggle = (carId, field) => {
    setLocalCars(prevCars => {
      return prevCars.map(car => {
        if (car._id !== carId) return car;

        const updatedCar = JSON.parse(JSON.stringify(car));

        if (field === 'available') {
          updatedCar.available = !updatedCar.available;
          dispatch(updateStatus({
            hostId: host._id,
            id:carId,
            field,
            value: updatedCar.available,
            token
          }));
        } else if (field === 'driver.availability') {
          updatedCar.driver.availability = !updatedCar.driver.availability;
          dispatch(updateStatus({
            hostId: host._id,
            id:carId,
            field,
            value: updatedCar.driver.availability,
            token
          }));
        }

        return updatedCar;
      });
    });
  };

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderCarSection = (label, carList, sectionKey) => {
    if (carList.length === 0) return null;

    return (
      <div className="car-section my-4">
        <div
          className="section-header d-flex justify-content-between align-items-center mb-2"
          style={{ cursor: 'pointer' }}
          onClick={() => toggleSection(sectionKey)}
        >
          <h3 className='text-dark'>{label} ({carList.length})</h3>
         <h3 className='text-dark'><span>{collapsedSections[sectionKey] ? '+' : '-'}</span></h3>
        </div>

        {!collapsedSections[sectionKey] && (
          <div className="row">
            {carList.map((car) => (
              <div className="col-md-4" key={car._id}>
                <div className="card h-100 shadow-sm">
                  {car.image && (
                    <img
                      className="card-img-top"
                      src={car.image}
                      alt={`${car.make} ${car.model}`}
                      style={{ cursor: "pointer", height: "180px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title d-flex justify-content-between">
                      {car.make} {car.model}
                      <span className="text-muted fs-6">#{car.vehicleId}</span>
                    </h5>
                    <p className="card-text">
                      ₹{car.pricePerDay}/day • {car.category} • {car.transmission}
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="d-block">Available</small>
                        <Switch
                          checked={car.available}
                          onChange={() => handleToggle(car._id, 'available')}
                          color="primary"
                          size="small"
                        />
                      </div>
                      <div>
                        <small className="d-block">Driver Provided</small>
                        <Switch
                          checked={car.driver?.availability || false}
                          onChange={() => handleToggle(car._id, 'driver.availability')}
                          color="secondary"
                          size="small"
                        />
                      </div>
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

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <div>Loading cars...</div>
      </div>
    );
  }

  const activeCars = localCars.filter(car => car.available);
  const inactiveCars = localCars.filter(car => !car.available);
  const activeNoDriver = localCars.filter(car => car.available && !car.driver?.availability);

  return (
    <div className="main-container mt-5">
      <div className="text-center mb-4">
        <h1 className='text-white'>Your Hosted Cars</h1>
        <h5><p className="text-muted">Manage your fleet and driver availability</p></h5>
      </div>

      {renderCarSection("Active Cars", activeCars, 'active')}
      {renderCarSection("Inactive Cars", inactiveCars, 'inactive')}
      {renderCarSection("Active Cars without Driver Provided", activeNoDriver, 'noDriver')}
    </div>
  );
};

export default HostedCars;

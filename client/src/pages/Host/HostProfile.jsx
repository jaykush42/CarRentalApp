import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Profile.css";
import {
  updateHostDetails,
  changePassword,
  changeHostPin,
} from "../../redux/slices/authHostSlice";

const HostProfile = () => {
  const { host, token, isLoading } = useSelector((state) => state.authHost);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [pinData, setPinData] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: "",
  });

  const [showPin, setShowPin] = useState({
    currentPin: false,
    newPin: false,
    confirmPin: false,
  });

  const [formData, setFormData] = useState({
    name: host?.name || "",
    email: host?.email || "",
    contactNumber: host?.contactNumber || "",
    city: host?.city || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!host?._id || !token) return;

    dispatch(
      updateHostDetails({
        updatedData: formData,
        token,
      })
    );

    setIsEditing(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (!host?._id || !token) return;

    dispatch(
      changePassword({
        passwordData,
        token,
      })
    );

    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handlePinChange = (e) => {
    setPinData({ ...pinData, [e.target.name]: e.target.value });
  };

  const togglePinVisibility = (field) => {
    setShowPin((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();

    if (pinData.newPin !== pinData.confirmPin) {
      alert("New PINs do not match!");
      return;
    }

    if (!host?._id || !token) return;

    dispatch(
      changeHostPin({
        pinData,
        token,
      })
    );

    setIsChangingPin(false);
    setPinData({ currentPin: "", newPin: "", confirmPin: "" });
  };

  const handlePinCancelClick = () => {
    setIsChangingPin(false);
    setPinData({ currentPin: "", newPin: "", confirmPin: "" });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      name: host?.name || "",
      email: host?.email || "",
      contactNumber: host?.contactNumber || "",
      city: host?.city || "",
    });
  };

  const handlePasswordCancelClick = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="container mt-5 profile-cont">
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">
          <h1 className="h4 mb-0">Host Profile</h1>
        </div>
        {host && (
          <div className="card-body">
            {/* VIEW MODE */}
            {!isEditing && !isChangingPassword && (
              <>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <strong>Name:</strong>
                  </div>
                  <div className="col-md-9">{host.name}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <strong>Email:</strong>
                  </div>
                  <div className="col-md-9">{host.email}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <strong>Contact Number:</strong>
                  </div>
                  <div className="col-md-9">
                    {host.contactNumber &&
                      String(host.contactNumber).replace(
                        /(\d{3})\d{4}(\d{3})/,
                        "$1XXXX$2"
                      )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <strong>City:</strong>
                  </div>
                  <div className="col-md-9">{host.city}</div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-success"
                >
                  Update Details
                </button>
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="btn btn-warning mx-3"
                >
                  Change Password
                </button>

                <button
                  onClick={() => setIsChangingPin(true)}
                  className="btn btn-info mx-1"
                >
                  Change PIN
                </button>
              </>
            )}

            {/* EDIT PROFILE */}
            {isEditing && (
              <form onSubmit={handleSubmit}>
                {["name", "email", "contactNumber", "city"].map((field) => (
                  <div className="row mb-3" key={field}>
                    <div className="col-md-3">
                      <strong>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                      </strong>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="btn btn-success mx-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="btn btn-danger ml-2"
                >
                  Cancel
                </button>
              </form>
            )}

            {/* CHANGE PASSWORD */}
            {isChangingPassword && (
              <form onSubmit={handlePasswordSubmit}>
                {["currentPassword", "newPassword", "confirmPassword"].map(
                  (field) => (
                    <div className="row mb-3" key={field}>
                      <div className="col-md-3">
                        <strong>{field.replace(/([A-Z])/g, " $1")}:</strong>
                      </div>
                      <div className="col-md-9">
                        <div className="input-group">
                          <input
                            type={showPasswords[field] ? "text" : "password"}
                            name={field}
                            value={passwordData[field]}
                            onChange={handlePasswordChange}
                            className="form-control"
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => togglePasswordVisibility(field)}
                          >
                            {showPasswords[field] ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
                <button
                  type="submit"
                  className="btn btn-success mx-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Change Password"}
                </button>
                <button
                  type="button"
                  onClick={handlePasswordCancelClick}
                  className="btn btn-danger ml-2"
                >
                  Cancel
                </button>
              </form>
            )}

            {isChangingPin && (
              <form onSubmit={handlePinSubmit}>
                {["currentPin", "newPin", "confirmPin"].map((field) => (
                  <div className="row mt-3 mb-3" key={field}>
                    <div className="col-md-3">
                      <strong>{field.replace(/([A-Z])/g, " $1")}:</strong>
                    </div>
                    <div className="col-md-9">
                      <div className="input-group">
                        <input
                          type={showPin[field] ? "text" : "password"}
                          name={field}
                          value={pinData[field]}
                          onChange={handlePinChange}
                          className="form-control"
                          required
                          maxLength={6}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => togglePinVisibility(field)}
                        >
                          {showPin[field] ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="btn btn-success mx-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Changing..." : "Change PIN"}
                </button>
                <button
                  type="button"
                  onClick={handlePinCancelClick}
                  className="btn btn-danger ml-2"
                >
                  Cancel
                </button>
              </form>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default HostProfile;

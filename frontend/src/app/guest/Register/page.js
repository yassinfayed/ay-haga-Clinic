"use client";
import React from "react";
//import { Button } from './Register/Button.js';
import { useState } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { Button } from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { registerAction } from "@/app/redux/actions/authActions";
//import GenderDropdown from "../../../../components/DropDownmenu";
//import "./DropDown.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    eName: "",
    eNumber: "",
    erelationToPatient: "",
  });

  const handleGenderChange = (selectedGender) => {
    setFormData({
      ...formData,
      gender: selectedGender,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.registerReducer.isLoading);
  const isAuthenticated = useSelector(
    (state) => state.registerReducer.isAuthenticated
  );
  const error = useSelector((state) => state.registerReducer.error);

  // const {isAuthenticated, error,isLoading} = useSelector(state => state.registerReducer)

  useEffect(() => {
    if (isAuthenticated === true) {
      window.history.pushState(
        {},
        "",
        `/patient/${
          JSON.parse(localStorage.getItem("userInfo")).data.user.patient._id
        }`
      );
      window.location.reload();
    } else if (error) window.alert("error");
  }, [isLoading, error, isAuthenticated]);

  const handleSignUp = () => {
    // Gather data in the formData object and send it to the backend
    console.log("Form Data:", formData);
    // Add your code to send data to the backend here

    dispatch(
      registerAction({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.password,
        role: "patient",
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        mobileNumber: formData.mobileNumber,
        emergencyContact: {
          fullName: formData.eName,
          mobileNumber: formData.eNumber,
          // relationToPatient: formData.erelationToPatient
        },
      })
    );
  };

  return (
    <>
      <Navbar />
      {!isLoading && !isAuthenticated && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto rounded shadow my-4 py-3">
                <div className="text-center mt-3">
                  <h1 className="text-primary fw-bold">Sign Up</h1>
                  <div className="underline bg-primary"></div>
                  <div className="text-muted text-center pb-2">
                    Join us as a Patient!
                  </div>
                </div>

                <div className="d-flex">
                  <div className="col mx-2">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control py-3"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control py-3"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control py-3"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control py-3"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="tel"
                        className="form-control py-3"
                        placeholder="Mobile Number"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <select
                        className="form-control py-3"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Choose a gender...
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <p className="form-label ms-2 text-center">
                        Date of Birth
                      </p>
                      <input
                        type="date"
                        className="form-control"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col mx-2">
                    <h4 className="text-primary text-center">
                      Emergency Contact Details
                    </h4>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control py-3"
                        placeholder="Emergency Contact Name"
                        name="eName"
                        value={formData.eName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="tel"
                        className="form-control py-3"
                        placeholder="Emergency Contact Phone"
                        name="eNumber"
                        value={formData.eNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Button text="Sign Up" onClick={handleSignUp} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {isLoading && <h1>Loading</h1>}
      {isAuthenticated && <h1>Registration Successful</h1>}
      <Footer />
    </>
  );
};

export default Register;

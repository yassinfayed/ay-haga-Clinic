"use client";
import React, { useEffect } from "react";

import { useState } from "react";
import { Button } from "../../../../components/Button";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "@/app/redux/actions/authActions";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    educationalBackground: "",
    affiliation: "",
    hourlyRate: "",
    dateOfbirth: "",
    gender: "",
    mobileNumber: "",
    speciality: "",
    workingHours: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const useEffect()
  const { isAuthenticated, error, isLoading } = useSelector(
    (state) => state.registerReducer
  );

  useEffect(() => {
    if (isAuthenticated === true) {
      window.alert("Successfully applied");
    } else if (error) window.alert("error");
  }, [isLoading, error, isAuthenticated]);

  const handleSignUp = () => {
    dispatch(
      registerAction({
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.password,
        DateOfbirth: formData.dateOfbirth,
        gender: formData.gender,
        phoneNumber: formData.mobileNumber,
        HourlyRate: formData.hourlyRate,
        educationalbackground: formData.educationalBackground,
        speciality: formData.affiliation,
        role: "doctor",
        affiliation: formData.affiliation,
        workingHours: formData.workingHours,
      })
    );
    // window.alert("Application submitted")
  };

  const [action] = useState("Sign up");

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto rounded shadow py-4">
            <div className="text-center">
              <h1 className="text-primary fw-bold p-3">Sign Up</h1>
              <div
                className="bg-primary mx-auto"
                style={{ height: "3px", width: "40%" }}
              ></div>
              <div className="text-muted py-3 pt-3">Join us as a Doctor!</div>
            </div>
            <div className="px-4 py-3">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="educationalBackground" className="form-label">
                  Educational Background
                </label>
                <input
                  type="text"
                  id="educationalBackground"
                  className="form-control"
                  name="educationalBackground"
                  value={formData.educationalBackground}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="affiliation" className="form-label">
                  Affiliation
                </label>
                <input
                  type="text"
                  id="affiliation"
                  className="form-control"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="hourlyRate" className="form-label">
                  Hourly Rate
                </label>
                <input
                  type="number"
                  id="hourlyRate"
                  className="form-control"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfbirth"
                  className="form-control"
                  name="dateOfbirth"
                  value={formData.dateOfbirth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="number"
                  id="mobileNumber"
                  className="form-control"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  id="gender"
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
                <label htmlFor="speciality" className="form-label">
                  Speciality
                </label>
                <input
                  type="text"
                  id="speciality"
                  className="form-control"
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="workingHours" className="form-label">
                  Working Hours
                </label>
                <input
                  type="number"
                  id="workingHours"
                  className="form-control"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="text-center">
              <Button text="Sign Up" onClick={handleSignUp} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;

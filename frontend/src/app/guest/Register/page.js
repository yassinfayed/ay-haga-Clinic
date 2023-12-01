"use client";
import React from "react";
import { useState } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { Button } from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { registerAction } from "@/app/redux/actions/authActions";
import Image from "next/image";
import { Alert } from "react-bootstrap";
import TickAnimation from '../../../../public/tickanimation';
import Lottie from "lottie-react";



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

  const [phoneValid, setPhoneValid] = useState(true);
  const [emergencyPhoneValid, setEmergencyPhoneValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [dateValid, setDateValid] = useState(true);
  

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    return emailRegex.test(email);
  };

  const isPhoneValid = (phoneNumber) => {
    const phoneRegex = /^0[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  function isValidPassword(password) {
    const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[A-Z]).{8,}$/;
    return pattern.test(password);
  }

  function isDateValid(isoDate) {
    const inputDate = new Date(isoDate);
    const currentDate = new Date();
    const normalizedInputDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const normalizedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    return (normalizedInputDate <= normalizedCurrentDate)
  }

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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    }
  };

  // const {isAuthenticated, error,isLoading} = useSelector(state => state.registerReducer)

  useEffect(() => {
    if (isAuthenticated === true) {
      window.history.pushState(
        {},
        "",
        `/patient/${JSON.parse(localStorage.getItem("userInfo")).data.user.patient._id
        }`
      );
      window.location.reload();
    } 
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
          <div className="container mt-5">
            <div className="row col-md-7 mx-auto rounded shadow my-5 p-5">
              <div className="text-center mt-3">
                <h1 className="text-primary fw-bold text-size-50">Sign Up</h1>
                <h6 className="text-global text-center mb-3">
                  Join us as a Patient!
                </h6>
                <div className="underline mx-auto mb-3"></div>
              </div>
              {error && <Alert variant="danger" dismissible className="px-2 m-3">
                <strong>Error! </strong> Carefully fill out all required fields.
              </Alert>}
              <br />
              <div className="d-flex p-3 mt-3">
                <div className="col mx-2">
                  <h4 className="text-global mb-1">
                    Personal Details
                  </h4>
                  <h6 className="text-primary mb-4 text-muted">
                    Let us know more about you.
                  </h6>
                  <div className="personal-section px-2">
                    <div className="row">
                      <div className=" col-md-6 mb-1">
                        <label htmlFor="name" className="text-semibold form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control py-2"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-1">
                        <label htmlFor="email" className="text-semibold form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className={`py-2 ${!emailValid?"form-control-invalid":"form-control"}`}
                          placeholder="example@mail.com"
                          name="email"
                          value={formData.email}
                          onChange={(e)=>{setEmailValid(isEmailValid(e.target.value)); handleInputChange(e);}}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-1">
                        <label htmlFor="username" className="text-semibold form-label">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control py-2"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-1">
                        <label htmlFor="password" className="text-semibold form-label">
                          Password
                        </label>
                        <div className="row">
                          <div className="col-md-10">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className={`py-2 ${!passwordValid?"form-control-invalid":"form-control"}`}
                              placeholder="********"
                              name="password"
                              value={formData.password}
                              onChange={(e)=>{setPasswordValid(isValidPassword(e.target.value));handleInputChange(e)}}
                            />
                          </div>
                          <div className="col-md-2 d-flex align-items-center bg-white rounded">
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('password')}
                              className="border-0  bg-white rounded"
                            >
                              <Image src={showPassword ? "/hide.svg" : "/show.svg"} width={25} height={25} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-semibold form-label">
                        Phone Number
                      </label>
                      <div className="mb-1 position-relative d-flex align-items-center">
                        <span className="px-2 position-absolute start-0 text-global fw-bold">(+2)</span>
                        <input
                          type="tel"
                          className={`pl-5 py-2 ${!phoneValid?"form-control-invalid":"form-control"}`}
                          style={{ paddingLeft: '50px' }}
                          placeholder="01234567890"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={(e)=>{setPhoneValid(isPhoneValid(e.target.value)); handleInputChange(e);}}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="phone" className="text-semibold form-label">
                          Gender
                        </label>
                        <select
                          className="form-select py-2"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            Select...
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="phone" className="text-semibold form-label">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className={`py-2 ${!dateValid?"form-control-invalid":"form-control"}`}
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={(e)=>{setDateValid(isDateValid(e.target.value));console.log(e.target.value);console.log(dateValid);handleInputChange(e);}}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="w-50 mx-auto mb-5" />

                  <div className="mx-2">
                    <h4 className="text-global">
                      Emergency Contact Details
                    </h4>
                    <h6 className="text-primary mb-4 text-muted">
                      We will contact this person in case of any emergenices.
                    </h6>
                    <div className="row px-2">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="text-semibold form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control py-2"
                          placeholder=""
                          name="eName"
                          value={formData.eName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="phone" className="text-semibold form-label">
                          Phone Number
                        </label>
                        <div className="mb-1 position-relative d-flex align-items-center">
                          <span className="px-2 position-absolute start-0 text-global fw-bold">(+2)</span>
                          <input
                            type="tel"
                            className={`ps-5 py-2 ${!emergencyPhoneValid?"form-control-invalid":"form-control"}`}
                            placeholder="01234567890"
                            name="eNumber"
                            value={formData.eNumber}
                            onChange={(e)=>{setEmergencyPhoneValid(isPhoneValid(e.target.value)); handleInputChange(e);}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />

                </div>
              </div>
              <div className="text-center">
                <Button text="Sign Up" onClick={handleSignUp} />
              </div>
            </div>
          </div>
        </>
      )}
      {isLoading && <h1>Loading</h1>}
      {isAuthenticated && (
        <div className="d-flex flex-grow-1 min-vh-100 w-100 flex-col align-items-center justify-content-center">
          <div className="card p-5 text-center">
            <Lottie animationData={TickAnimation} loop={false} className="w-50 mx-auto" />
            <h1>Application Successful!</h1>
            <h5>Thank you, we'll get back to you as soon as possible.</h5>
          </div>
          {setTimeout(() => {
            window.history.pushState({}, "", "/patients/medicines");
            window.location.reload();
          }, 5000)}
        </div>
        
      )
      }
      <Footer />
    </>
  );
};

export default Register;

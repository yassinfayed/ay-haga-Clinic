"use client";
import React from "react";
import { useEffect } from "react";
import { login } from "../../redux/actions/authActions";
import { viewPatients } from "../../redux/actions/patientsActions";
import { viewDoctorDetails } from "../../redux/actions/doctorActions";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
//import { Button } from './Register/Button.js';
import { useState } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { Button } from "../../../../components/Button";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  let permission;
  let userInfo;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isAuthenticated, error } = useSelector((state) => state.loginReducer);

  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const role = JSON.parse(localStorage.getItem("userInfo")).data.user.role;
      const url =
        role === "administrator"
          ? "/admin"
          : role === "patient"
          ? `/patient/${
              JSON.parse(localStorage.getItem("userInfo")).data.user.patient._id
            }`
          : `/doctor/${
              JSON.parse(localStorage.getItem("userInfo")).data.user.doctor._id
            }`;
      console.log(role);
      console.log("here??");
      window.history.pushState({}, url, url);
      window.location.reload();
    }
    if (error) window.alert("error");
  }, [dispatch, isAuthenticated, error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    // Gather data in the formData object and send it to the backend
    console.log("Form Data:", formData);
    dispatch(login(formData.email, formData.password));
    // Add your code to send data to the backend here
  };

  return (
    <>
      <Navbar />
      <div className="container ">
        <div className="row gradient-background m-5 rounded shadow mx-auto">
        <div className="col-md-4 mx-auto m-5 p-5">
          <div className="text-size-50 text-bold text-light rounded">
          XClinics
          </div>
          <h2 className="text-semibold text-light rounded px-3">
            Convenient healthcare at your fingertips...
          </h2>
        </div>

          <div className="col-md-5 bg-light mx-auto rounded shadow m-5">
            <div className="text-center mt-5">
              <h1 className="text-primary fw-bold mb-2">Login</h1>
              <div className="underline-sm mx-auto"></div>
            </div>
            <div className="p-4">
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
              <div className="mb-3 row">
              <div className="col-md-10">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control py-3"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-2 d-flex align-items-center bg-light rounded">
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="border-0  bg-light rounded"
                >
                  <Image src={showPassword ? "/hide.svg" : "/show.svg"} width={35} height={35} />
                </button>
              </div>
              </div>
              <a href ="http://localhost:3000/guest/ForgotPassword">
                Forgot Password 
              </a>
              <div className="text-center pb-3">
                <Button text="Login" onClick={handleLogin} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default LoginForm;

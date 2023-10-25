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
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto rounded shadow m-5">
            <div className="text-center mt-5">
              <h1 className="text-primary fw-bold">Login</h1>
              <div className="underline bg-primary"></div>
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

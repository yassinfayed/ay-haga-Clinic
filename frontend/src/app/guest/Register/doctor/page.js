"use client";
import React, { useEffect } from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "@/app/redux/actions/authActions";
import Image from "next/image";
import TickAnimation from '../../../../../public/tickanimation';
import Lottie from "lottie-react";
import Navbar from "../../../../../components/Navbar";
import Footer from "../../../../../components/Footer";
import {
  Alert,
  Button,
  Form,
  InputGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateDateDoc
} from "../../../assets/validators";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    educationalBackground: "",
    affiliation: "",
    hourlyRate: "",
    DateOfbirth: "",
    gender: "",
    mobileNumber: "",
    speciality: "",
    workingHours: "",
  });

  const [files, setFiles] = useState({
    document1: null,
    document2: null,
    document3: null,
  });

  const dispatch = useDispatch();
  
  const [showPasswordConfirm, setShowPasswordConfrim] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true); // Passwords match state
  const [formValid, setFormValid] = useState(false);
  
  const handlePasswordConfirmChange = (e) => {
    const confirmPassword = e.target.value;
    setPasswordMatch(
      formData.password === confirmPassword ||
        formData.passwordConfirm === confirmPassword
    );
    handleInputChange(e);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const NewFormData = new FormData();
    NewFormData.append('username', formData.username);
    NewFormData.append('name', formData.name);
    NewFormData.append('email', formData.email);
    NewFormData.append('password', formData.password);
    NewFormData.append('passwordConfirm', formData.password);
    NewFormData.append('DateOfbirth', formData.DateOfbirth);
    NewFormData.append('gender', formData.gender);
    NewFormData.append('phoneNumber', formData.phoneNumber);
    NewFormData.append('HourlyRate', formData.hourlyRate);
    NewFormData.append('educationalbackground', formData.educationalBackground);
    NewFormData.append('role', 'doctor');
    NewFormData.append('affiliation', formData.affiliation);
    NewFormData.append('workingHours', formData.workingHours);
    NewFormData.append('speciality', formData.speciality);
    NewFormData.append('documents',files.document1);
    NewFormData.append('documents',files.document2);
    NewFormData.append('documents',files.document3);
    
    dispatch(
      registerAction(NewFormData)
    );
  };

  
  const { isAuthenticated, error, isLoading } = useSelector(
    (state) => state.registerReducer
  );

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowPasswordConfrim(!showPasswordConfirm);
    }
  };

  useEffect(() => {

    console.log(isAuthenticated)

    const isValid =
    validateEmail(formData.email) &&
    validatePhoneNumber(formData.mobileNumber) &&
    validatePassword(formData.password) &&
    validateDateDoc(formData.DateOfbirth) && 
    passwordMatch;

    setFormValid(isValid);

    if (isAuthenticated === true) {
      window.history.pushState(
        {},
        "",
        `/doctor/${JSON.parse(localStorage.getItem("userInfo")).data.user.doctor._id
        }`
      );
      window.location.reload();
    }
  }, [isLoading, error, isAuthenticated, formData, passwordMatch]);

  const handleFileUpload = (e, documentKey) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => ({
      ...prevFiles,
      [documentKey]: file,
    }));
  };


  const [action] = useState("Sign up");

  return (
    <>
      {!isAuthenticated &&
        <>
          <Navbar/>
          <Container className="mt-5">
            <Row className="col-md-7 mx-auto rounded shadow my-5 p-2">
              <Col>
                <div className="text-center mt-3">
                  <h1 className="text-primary fw-bold text-size-50">Sign Up</h1>
                  <h6 className="text-global text-center mb-3">
                    Join us as a Doctor!
                  </h6>
                  <div className="underline mx-auto mb-5"></div>
                </div>
                <br />
                {error && <Alert variant="danger" dismissible><strong>Error! {"  "}</strong>{error}</Alert>}
                <div className="d-flex p-3">
                  <Col>
                    <h4 className="text-global mb-1">Personal Details</h4>
                    <h6 className="text-primary mb-4 text-muted">
                      Let us know more about you.
                    </h6>
                    <Form onSubmit={handleSignUp}>
                      <div className="personal-section px-2">
                        <Row className="py-2">
                          <Col md={6}>
                            <Form.Group className="mb-1">
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                placeholder="e.g. John Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-1">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                placeholder="e.g. example@mail.com"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required={true}
                                isInvalid={
                                  formData.email && !validateEmail(formData.email)
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                Please enter a valid email address.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="py-2">
                          <Col>
                            <Form.Group className="mb-1">
                              <Form.Label>Username</Form.Label>
                              <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Label>Phone Number</Form.Label>
                              <div className="mb-1 position-relative d-flex align-items-center">
                                <span className="px-2 position-absolute start-0 text-global fw-bold">
                                  (+2)
                                </span>
                                <Form.Control
                                  type="Number"
                                  className="pl-5 form-control py-2"
                                  style={{ paddingLeft: "60px" }}
                                  placeholder="01234567890"
                                  name="mobileNumber"
                                  value={formData.mobileNumber}
                                  onChange={handleInputChange}
                                  required
                                  isInvalid={
                                    formData.mobileNumber &&
                                    !validatePhoneNumber(formData.mobileNumber)
                                  }
                                />
                              </div>
                              <Form.Control.Feedback
                                type="invalid"
                                style={{ marginTop: "5px" }} // Adjust margin-top as needed
                              >
                                Please enter a valid phone number (10 digits).
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="py-2">
                          <Col>
                            <Form.Group className="mb-1">
                              <Form.Label>Password</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  value={formData.password}
                                  onChange={handlePasswordConfirmChange}
                                  required
                                  isInvalid={
                                    formData.password &&
                                    !validatePassword(formData.password)
                                  }
                                />
  
                                <Button
                                  variant="outline-secondary" className="border-light"
                                  onClick={() =>
                                    togglePasswordVisibility("password")
                                  }
                                >
                                  <Image
                                    src={showPassword ? "/hide.svg" : "/show.svg"}
                                    width={25}
                                    height={25}
                                  />
                                </Button>
                                <Form.Control.Feedback type="invalid">
                                  Password must be at least 8 characters,
                                  including 1 uppercase letter and 1 digit.
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-1">
                              <Form.Label>Confirm Password</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type={showPasswordConfirm ? "text" : "password"}
                                  name="passwordConfirm"
                                  value={formData.passwordConfirm}
                                  required
                                  isInvalid={!passwordMatch}
                                  onChange={handlePasswordConfirmChange}
                                />
  
                                <Button
                                  variant="outline-secondary" className="border-light"
                                  onClick={() =>
                                    togglePasswordVisibility("passwordConfirm")
                                  }
                                >
                                  <Image
                                    src={
                                      showPasswordConfirm
                                        ? "/hide.svg"
                                        : "/show.svg"
                                    }
                                    width={25}
                                    height={25}
                                  />
                                </Button>
                                <Form.Control.Feedback type="invalid">
                                  Passwords do not match.
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="py-2">
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Gender</Form.Label>
                              <Form.Select
                                className="py-2"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="" disabled>
                                  Select...
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Date of Birth</Form.Label>
                              <Form.Control
                                type="date"
                                required
                                name="DateOfbirth"
                                value={formData.DateOfbirth}
                                isInvalid={
                                  formData.DateOfbirth && !validateDateDoc(formData.DateOfbirth)
                                }
                                onChange={handleInputChange}
                              />
                              <Form.Control.Feedback type="invalid">
                                Applying doctors need to be atleast 25 years old.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                      <hr className="w-50 mx-auto mb-5" />
                      <div className="mx-2">
                        <h4 className="text-global mb-1">
                        Professional Details
                        </h4>
                        <h6 className="text-primary mb-3 text-muted">
                          Let us know more about your work experience.
                        </h6>
                        <Form.Group className="mb-3" controlId="educationalBackground">
                        <Form.Label className="text-semibold">Educational Background</Form.Label>
                        <Form.Control type="text" name="educationalBackground" value={formData.educationalBackground} onChange={handleInputChange} required/>
                        </Form.Group>

                        {/* Row for Affiliation and Speciality */}
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Group controlId="affiliation">
                              <Form.Label className="text-semibold">Affiliation</Form.Label>
                              <Form.Control type="text" name="affiliation" value={formData.affiliation} onChange={handleInputChange} required/>
                            </Form.Group>
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Group controlId="speciality">
                              <Form.Label className="text-semibold">Speciality</Form.Label>
                              <Form.Control type="text" name="speciality" value={formData.speciality} onChange={handleInputChange} required/>
                            </Form.Group>
                          </Col>
                        </Row>

                        {/* Row for Hourly Rate and Working Hours */}
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Group controlId="hourlyRate">
                              <Form.Label className="text-semibold">Hourly Rate</Form.Label>
                              <Form.Control type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleInputChange} required/>
                            </Form.Group>
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Group controlId="workingHours">
                              <Form.Label className="text-semibold">Working Hours</Form.Label>
                              <Form.Control type="number" name="workingHours" value={formData.workingHours} onChange={handleInputChange} required/>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                      <hr className="w-50 mx-auto mb-5" />
                      <div className="">
                        <h4 className="text-global mb-1">
                          Required Documents
                        </h4>
                        <h6 className="text-primary mb-3 text-muted">
                        Note that all files should be in following formats: PDF, JPEG, JPG, PNG.
                        </h6>
                        <Form.Group controlId="document1" className="p-2 d-flex align-items-center justify-content-between">
                          <Form.Label className="col-lg-3">National ID</Form.Label>
                          <Form.Control type="file" onChange={(e) => handleFileUpload(e, 'document1')} />
                        </Form.Group>

                        <Form.Group controlId="document2" className="p-2 d-flex align-items-center justify-content-between">
                          <Form.Label className="col-lg-3">Medical Degree</Form.Label>
                          <Form.Control type="file" onChange={(e) => handleFileUpload(e, 'document2')} />
                        </Form.Group>

                        <Form.Group controlId="document3" className="p-2 d-flex align-items-center justify-content-between">
                          <Form.Label className="col-lg-3">Medical License</Form.Label>
                          <Form.Control type="file" onChange={(e) => handleFileUpload(e, 'document3')} />
                        </Form.Group>
                      </div>
                      <br />
                      <div className="text-center">
                        {isLoading ? (
                          <Button variant="primary" disabled>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Loading...
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            variant="primary"
                            disabled={!formValid}
                            // onClick={handleSignUp}
                          >
                            Sign Up
                          </Button>
                        )}
                      </div>
                    </Form>
                    <br />
                  </Col>
                </div>
              </Col>
            </Row>
          </Container>
          <Footer/>
        </>
      }

      {isAuthenticated &&
        <>
        <Navbar/>
          <div className="d-flex flex-grow-1 min-vh-100 w-100 flex-col align-items-center justify-content-center">
            <div className="card p-5 text-center">
              <Lottie animationData={TickAnimation} loop={false} className="w-50 mx-auto" />
              <h1>Application Successful!</h1>
              <h5>Thank you, we'll get back to you as soon as possible.</h5>
            </div>
            {setTimeout(() => {
            window.history.pushState({}, "", "/patients/medicines");
            window.location.reload();
          }, 7000)}
          </div>
        </>
      }
    </>

  );
};

export default SignUp;

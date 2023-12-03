import "./components.css";
import React, { useState, useEffect } from "react";
import { addFamilyMembers } from "@/app/redux/actions/FamilyMembersAction";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import Image from "next/image";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateDate,
} from "../src/app/assets/validators";

function AddFamily(props) {
  const { title, subheader, onHide, onSuccess, onError } = props;

  // State variables for form input values
  const [name, setName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [relationToPatient, setRelationToPatient] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { error, loading, familyMember } = useSelector(
    (state) => state.addFamilyMembersReducer
  );
  // Function to toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowPasswordConfirm(!showPasswordConfirm);
    }
  };

  // Function to handle changes in the confirm password input
  const handlePasswordConfirmChange = (e) => {
    const confirmPassword = e.target.value;
    setPasswordMatch(password === confirmPassword);
    setPasswordConfirm(confirmPassword);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(
      addFamilyMembers({
        name,
        nationalId,
        age,
        gender,
        relationToPatient,
        username,
        password,
        passwordConfirm,
        dateOfBirth,
        mobileNumber: phone,
        email,
        role: "patient",
        emergencyContact: {
          fullName: "hazem abdelghany",
          mobileNumber: "01000066624",
        },
      })
    );
    setSubmitted(true);
  };

  // Effect to handle post-submission logic
  useEffect(() => {
    if (submitted & !loading) {
      if (error && !familyMember) {
        onError(error);
      } else if (!error && familyMember) {
        onSuccess();
      }
      onHide();
    }
  }, [error, familyMember, loading, onError, onHide, onSuccess, submitted]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="bg-primary"></Modal.Header>
      <Modal.Body>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="px-2 text-global text-bold text-center"
        >
          Enter Family Member Details
        </Modal.Title>
        <div className="underline-Bold mx-auto mt-2 mb-5"></div>
        <h4>{subheader}</h4>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={email && !validateEmail(email)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label htmlFor="nationalId">National ID</Form.Label>
                <Form.Control
                  type="number"
                  id="nationalId"
                  placeholder="National ID"
                  value={nationalId}
                  required
                  onChange={(e) => setNationalId(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label htmlFor="phone">Phone Number</Form.Label>

                <Form.Control
                  type="number"
                  id="phone"
                  placeholder="01234567890"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  isInvalid={phone && !validatePhoneNumber(phone)}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginTop: "5px" }} // Adjust margin-top as needed
                >
                  Please enter a valid phone number (11 digits).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label htmlFor="age">Age</Form.Label>
                <Form.Control
                  type="number"
                  id="age"
                  placeholder="Enter Age"
                  value={age}
                  required
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label htmlFor="gender">Gender</Form.Label>
                <Form.Select
                  required
                  onChange={(e) => setGender(e.target.value)}
                  id="gender"
                  value={gender}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="my-3">
            <Form.Label htmlFor="relationToPatient">
              Relation to Patient
            </Form.Label>
            <Form.Select
              required
              onChange={(e) => setRelationToPatient(e.target.value)}
              id="relationToPatient"
              value={relationToPatient}
            >
              <option value="">Relation to Patient</option>
              <option value="wife">Wife</option>
              <option value="husband">Husband</option>
              <option value="child">Child</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Label htmlFor="dateOfBirth">Date of Birth</Form.Label>
            <Form.Control
              type="date"
              id="dateOfBirth"
              required
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              isInvalid={dateOfBirth && !validateDate(dateOfBirth)}
            />
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              id="username"
              placeholder="Enter Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                isInvalid={password && !validatePassword(password)}
              />

              <Button
                variant="outline-secondary"
                className="border-light"
                onClick={() => togglePasswordVisibility("password")}
              >
                <Image
                  src={showPassword ? "/hide.svg" : "/show.svg"}
                  width={25}
                  height={25}
                />
              </Button>
              <Form.Control.Feedback type="invalid">
                Password must be at least 8 characters, including 1 uppercase
                letter and 1 digit.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPasswordConfirm ? "text" : "password"}
                name="passwordConfirm"
                value={passwordConfirm}
                required
                isInvalid={!passwordMatch}
                onChange={handlePasswordConfirmChange}
              />

              <Button
                variant="outline-secondary"
                className="border-light"
                onClick={() => togglePasswordVisibility("passwordConfirm")}
              >
                <Image
                  src={showPasswordConfirm ? "/hide.svg" : "/show.svg"}
                  width={25}
                  height={25}
                />
              </Button>
              <Form.Control.Feedback type="invalid">
                Passwords do not match.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Submit Button */}
          <div className="text-center mt-5 mb-2">
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddFamily;

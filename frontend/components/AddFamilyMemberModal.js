import "./components.css";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addFamilyMembers } from "@/app/redux/actions/FamilyMembersAction";
import { useDispatch } from "react-redux";

function AddFamily(props) {
  const { title, subheader, onHide } = props;

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
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(
      addFamilyMembers({
        name: name,
        nationalId: nationalId,
        age: age,
        gender: gender,
        relationToPatient: relationToPatient,
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
          // relationToPatient: formData.erelationToPatient
        },
      })
    );
    console.log("added fam member");
    onHide();
  };

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
          {title}
        </Modal.Title>
        <div className="underline-Bold mx-auto mt-2 mb-5"></div>
        <h4>{subheader}</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control my-1"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="email">email</label>
            <input
              type="text"
              className="form-control my-1"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group my-1 col-md-6">
            <label htmlFor="nationalId">National ID</label>
            <input
              type="number"
              className="form-control my-1"
              id="nationalId"
              placeholder="National ID"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
            />
          </div>
          <div className="form-group my-1 col-md-6">
            <label htmlFor="phone">Phone number</label>
            <input
              type="number"
              className="form-control my-1"
              id="phone"
              placeholder="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="row mx-3">
            <div className="form-group my-1 col-md-6">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control my-1"
                id="age"
                placeholder="Enter Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="form-group my-1 col-md-6">
              <label htmlFor="gender">Gender</label>
              <select
                onChange={(e) => setGender(e.target.value)}
                className="my-1 w-100 form-control text-muted p-2"
              >
                <option value={null}>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="form-group my-3">
            <label htmlFor="relationToPatient">Relation to patient</label>
            <select
              onChange={(e) => setRelationToPatient(e.target.value)}
              className="my-1 w-100 form-control text-muted p-2"
            >
              <option value={null}>Relation to patient</option>
              <option value="wife">Wife</option>
              <option value="husband">Husband</option>
              <option value="child">Child</option>
            </select>
          </div>
          <label htmlFor="phone" className="text-semibold form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className="form-control py-2"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
          />

          <div className="form-group my-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control my-1"
              id="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password field */}
          <div className="form-group my-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control my-1"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password field */}
          <div className="form-group my-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control my-1"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <div className="row justify-content-end align-items-center mt-5 mb-2">
            <button type="submit" className="btn btn-primary mx-auto col-md-4">
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddFamily;

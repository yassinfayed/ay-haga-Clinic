import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFamilyMembers } from "@/app/redux/actions/FamilyMembersAction";
import {
  Button,
  TextInput,
  Grid,
  Col,
  Select,
  SelectItem,
} from "@tremor/react";
import { BottomCallout } from "@/components/BottomCallout";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateDate,
} from "../../redux/validators";
import { Modal } from "../../../components/Modal"; // Custom Modal component

function AddFamily({ show, onHide, onSuccess, onError, setVisible }) {
  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    age: "",
    gender: "",
    relationToPatient: "",
    username: "",
    email: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { error, loading } = useSelector(
    (state) => state.addFamilyMembersReducer
  );

  const handleInputChange = (e) => {
    let name, value;

    // Check if the event has a target property (for standard inputs)
    if (e.target) {
      name = e.target.name;
      value = e.target.value;
    } else {
      // For the Select component, the name has to be manually specified
      name = "gender";
      value = e;
    }

    setFormData({ ...formData, [name]: value });
  };
  // Function to toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowPasswordConfirm(!showPasswordConfirm);
    }
  };
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "passwordConfirm" || name === "password") {
      setPasswordMatch(formData.password === formData.passwordConfirm);
    }
  };

  // Function to handle changes in the confirm password input
  const handlePasswordConfirmChange = (e) => {
    const confirmPasswordCurr = e.target.value;
    setPasswordMatch(
      password === confirmPasswordCurr ||
        passwordConfirm === confirmPasswordCurr
    );
    e.target.name == "password"
      ? setPassword(confirmPasswordCurr)
      : setPasswordConfirm(confirmPasswordCurr);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    console.log("will dispatch");
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
  console.log(error, loading);
  useEffect(() => {
    console.log(error);
    if (submitted & !loading) {
      if (error && !familyMember) {
        setAlert(true);
      } else if (!error && familyMember) {
        onSuccess();
        onHide();
      }
    }
  }, [error, loading, onHide, onSuccess]);

  return (
    <Modal visible={show} setVisible={setVisible}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Add Family Member</h2>
        <form onSubmit={handleSubmit}>
          <Grid numItems={2} className="gap-x-3 gap-y-4">
            <Col>
              <TextInput
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col>
              <TextInput
                placeholder="National ID"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col>
              <TextInput
                placeholder="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <SelectItem value="">Select Gender</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </Select>
            </Col>
            <Col>
              <TextInput
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col>
              <TextInput
                placeholder="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                error={formData.email && !validateEmail(formData.email)}
              />
            </Col>
            <Col>
              <TextInput
                placeholder="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                error={formData.phone && !validatePhoneNumber(formData.phone)}
              />
            </Col>
            <Col numColSpan={2}>
              <TextInput
                placeholder="Relation to Patient"
                name="relationToPatient"
                value={formData.relationToPatient}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col>
              <TextInput
                type="date"
                placeholder="Date of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col>
              <TextInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handlePasswordChange}
                required
                error={
                  formData.password && !validatePassword(formData.password)
                }
              />
            </Col>
            <Col>
              <TextInput
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handlePasswordChange}
                required
                error={!passwordMatch}
              />
            </Col>
          </Grid>
          <Button type="submit" className="mt-4">
            Add Family Member
          </Button>
        </form>
      </div>
      {error && (
        <BottomCallout
          message="An error occurred"
          variant="error"
          visible={!!error}
        />
      )}
    </Modal>
  );
}

export default AddFamily;

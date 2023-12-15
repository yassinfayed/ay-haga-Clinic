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
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateDate,
} from "../../redux/validators";

function AddFamily({ setVisible, setSuccess, setError }) {
  const initialFormData = {
    name: "",
    nationalId: "",
    age: "",
    gender: "",
    relationToPatient: "",
    username: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    password: "",
    passwordConfirm: "",
    role: "patient",
    emergencyContact: {
      fullName: "hazem abdelghany",
      mobileNumber: "01000066624",
    },
  };
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [calloutVisible, setCalloutVisible] = useState(false);
  const [calloutMessage, setCalloutMessage] = useState("");

  const dispatch = useDispatch();
  const { error, loading, familyMember } = useSelector(
    (state) => state.addFamilyMembersReducer,
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
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Adjusting the logic to use a function for immediate state reflection
    if (name === "password" || name === "passwordConfirm") {
      setFormData((prevFormData) => {
        const updatedFormData = { ...prevFormData, [name]: value };
        setPasswordMatch(
          updatedFormData.password === updatedFormData.passwordConfirm,
        );
        return updatedFormData;
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    console.log(FormData);
    e.preventDefault();
    if (!passwordMatch) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(addFamilyMembers(formData));
    setSubmitted(true);
  };

  // Effect to handle post-submission logic

  useEffect(() => {
    if (submitted && !loading) {
      if (error) {
        setError("Error adding family member");
        setSubmitted(false);
      } else if (familyMember) {
        setSuccess("Family member added successfully");
        setVisible(false);
        setFormData(initialFormData);
        console.log(formData);
        setSubmitted(false);
      }
    }
  }, [submitted, loading, error, familyMember, setSuccess, setError]);

  return (
    <div className="p-4 mt-4">
      {/* <h2 className="text-2xl font-bold mb-4">Add Family Member</h2> */}
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
              placeholder="phone Number"
              name="mobileNumber"
              type="tel"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              error={
                formData.mobileNumber &&
                !validatePhoneNumber(formData.mobileNumber)
              }
            />
          </Col>

          <Select
            placeholder="Relation to patient"
            onChange={(e) => {
              console.log(e);
              setFormData({ ...formData, ["relationToPatient"]: e });
            }}
            required
            name=""
            value={formData.relationToPatient}
          >
            <SelectItem value="">Choose...</SelectItem>
            <SelectItem value="wife">Wife</SelectItem>
            <SelectItem value="husband">Husband</SelectItem>
            <SelectItem value="child">Child</SelectItem>
          </Select>
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
          <Col></Col>
          <Col>
            <TextInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
              required
              error={formData.password && !validatePassword(formData.password)}
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
        <Button type="submit" className="mt-4" loading={loading}>
          Add Family Member
        </Button>
      </form>
    </div>
  );
}

export default AddFamily;

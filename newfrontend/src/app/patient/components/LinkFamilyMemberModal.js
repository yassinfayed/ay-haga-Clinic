import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkFamilyMember } from "@/app/redux/actions/FamilyMembersAction";
import { Button, TextInput, Select, SelectItem } from "@tremor/react";

import { validateEmail, validatePhoneNumber } from "../../redux/validators";
import { Modal } from "../../../components/Modal"; // Your custom Modal component
import Lottie from "lottie-react";
import LoadingAnimation from "../../../../public/loading.json";

function LinkFamily({ show, setSuccess, setError, visible, setVisible }) {
  const [cred, setCred] = useState("");
  const [relationToPatient, setRelationToPatient] = useState("");
  const [calloutVisible, setCalloutVisible] = useState(false);
  const [calloutMessage, setCalloutMessage] = useState("");
  const { error, loading, familyMember } = useSelector(
    (state) => state.linkFamilyMemberReducer,
  );
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const isValidCred = (cred) => {
    return validateEmail(cred) || validatePhoneNumber(cred);
  };
  console.log(visible);
  const handleSubmit = (e) => {
    e.preventDefault();
    let phone, email;

    if (validateEmail(cred)) {
      email = cred;
    } else if (validatePhoneNumber(cred)) {
      phone = cred;
    } else {
      console.log("Invalid email or phone number");
      return;
    }
    console.log(email, phone, relationToPatient);

    dispatch(LinkFamilyMember({ email, phone, relationToPatient }));
    setSubmitted(true);
  };

  useEffect(() => {
    if (!loading && familyMember && submitted) {
      setSuccess("Family member added successfully");
      setVisible(false);
      setSubmitted(false);
      setRelationToPatient("");
      setCred("");
      // Trigger onSuccess if provided
    } else if (!loading && error & submitted) {
      setSubmitted(false);
      setError("Error adding family member");
    }
  }, [loading, familyMember, setSuccess, setError]);

  return (
    <div className="p-4 mt-4">
      {/* <h2 className="text-2xl font-bold mb-4">Link Family Member</h2> */}

      <form onSubmit={handleSubmit}>
        <TextInput
          className="mb-4"
          placeholder="Enter email or phone number"
          value={cred}
          onChange={(e) => setCred(e.target.value)}
          error={cred && !isValidCred(cred)}
          errorMessage="Please enter a valid email or phone number"
          required
        />

        <Select
          placeholder="Relation to patient"
          onChange={(e) => {
            console.log(e);
            setRelationToPatient(e);
          }}
          required
          name=""
          value={relationToPatient}
        >
          <SelectItem value="">Choose...</SelectItem>
          <SelectItem value="wife">Wife</SelectItem>
          <SelectItem value="husband">Husband</SelectItem>
          <SelectItem value="child">Child</SelectItem>
        </Select>

        <Button type="submit" className="mt-4" loading={loading}>
          Link Member
        </Button>
      </form>
    </div>
  );
}

export default LinkFamily;

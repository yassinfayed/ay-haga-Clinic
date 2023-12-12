import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkFamilyMember } from "@/app/redux/actions/FamilyMembersAction";
import { Button, TextInput, Select, SelectItem } from "@tremor/react";
import { BottomCallout } from "@/components/BottomCallout";
import { validateEmail, validatePhoneNumber } from "../../redux/validators";
import { Modal } from "../../../components/Modal"; // Your custom Modal component

function LinkFamily({ show, onHide, onSuccess, onError, setVisible }) {
  const [cred, setCred] = useState("");
  const [relationToPatient, setRelationToPatient] = useState("");
  const { error, loading, familyMember } = useSelector(
    (state) => state.linkFamilyMemberReducer
  );
  const dispatch = useDispatch();

  const isValidCred = (cred) => {
    return validateEmail(cred) || validatePhoneNumber(cred);
  };

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

    dispatch(LinkFamilyMember({ email, phone, relationToPatient }));
  };

  useEffect(() => {
    if (!loading && familyMember) {
      onSuccess();
    } else if (!loading && error) {
      console.log(error);
    }
  }, [loading, familyMember, error, onHide, onSuccess]);

  return (
    <Modal visible={show} setVisible={setVisible}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Link Family Member</h2>
        {error && (
          <BottomCallout
            message="Error linking family member"
            variant="error"
            visible={!!error}
          />
        )}
        <form onSubmit={handleSubmit}>
          <TextInput
            placeholder="Enter email or phone number"
            value={cred}
            onChange={(e) => setCred(e.target.value)}
            error={cred && !isValidCred(cred)}
            errorMessage="Please enter a valid email or phone number"
            required
          />

          <Select
            placeholder="Relation to patient"
            onChange={(e) => setRelationToPatient(e.target.value)}
            required
            value={relationToPatient}
          >
            <SelectItem value="">Choose...</SelectItem>
            <SelectItem value="wife">Wife</SelectItem>
            <SelectItem value="husband">Husband</SelectItem>
            <SelectItem value="child">Child</SelectItem>
          </Select>

          <Button type="submit" className="mt-4">
            Link Member
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default LinkFamily;

import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import {
  validateEmail,
  validatePhoneNumber,
} from "../src/app/assets/validators";
import { LinkFamilyMember } from "@/app/redux/actions/FamilyMembersAction";
import { useDispatch, useSelector } from "react-redux";

function AddFamily(props) {
  const { title, subheader, onHide, onSuccess, onError } = props;

  // State variables for form input values
  const [cred, setCred] = useState("");
  const [alert, setAlert] = useState(false);
  const [relationToPatient, setRelationToPatient] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { error, loading, familyMember } = useSelector(
    (state) => state.linkFamilyMemberReducer
  );
  const dispatch = useDispatch();
  const isValidCred = (cred) => {
    return validateEmail(cred) || validatePhoneNumber(cred);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let phone;
    let email;

    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
    const phoneRegex = /^.*$/;
    if (!relationToPatient || relationToPatient == 0) {
      alert("fill out the relation with patient");
      return;
    }
    if (emailRegex.test(cred)) {
      email = cred;
    } else if (phoneRegex.test(cred)) {
      phone = cred;
    } else {
      console.log("please enter a valid email or phone");
    }
    console.log(relationToPatient);
    dispatch(
      LinkFamilyMember({
        email,
        phone,
        relationToPatient: relationToPatient,
      })
    );
    setSubmitted(true); // Set submitted to true after dispatch
  };

  useEffect(() => {
    if (submitted & !loading) {
      console.log(error, loading, familyMember);
      if (error && !loading) {
        setAlert(true);
      } else {
        if (!error && familyMember && !loading) {
          onSuccess();
          onHide();
        }
      }
    }
  }, [error, submitted, loading, familyMember]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton className="bg-primary">
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert">
            error, family member was not linked
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessAlert(false)}></button>
          </div>
        )}
        <h4>{subheader}</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-3">
            <Form.Label htmlFor="emailOrPhone">
              Enter email or phone number
            </Form.Label>
            <Form.Control
              type="text"
              id="emailOrPhone"
              placeholder=""
              value={cred}
              onChange={(e) => setCred(e.target.value)}
              required
              isInvalid={cred && !isValidCred(cred)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email or phone number.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Label htmlFor="relationToPatient">
              Relation to patient
            </Form.Label>
            <Form.Select
              onChange={(e) => setRelationToPatient(e.target.value)}
              required
              id="relationToPatient"
              value={relationToPatient}>
              <option value="">Choose...</option>
              <option value="wife">Wife</option>
              <option value="husband">Husband</option>
              <option value="child">Child</option>
            </Form.Select>
          </Form.Group>

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

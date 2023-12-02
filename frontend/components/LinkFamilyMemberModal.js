import React, { useState, useEffect } from "react"; // Import useEffect
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { LinkFamilyMember } from "@/app/redux/actions/FamilyMembersAction";
import { useDispatch, useSelector } from "react-redux";

function AddFamily(props) {
  const { title, subheader, onHide, onSuccess, onError } = props;

  // State variables for form input values
  const [cred, setCred] = useState("");
  const [relationToPatient, setRelationToPatient] = useState("");
  const [submitted, setSubmitted] = useState(false); // Add submitted state
  const error = useSelector((state) => state.linkFamilyMemberReducer.error);
  const loading = useSelector((state) => state.linkFamilyMemberReducer.loading);
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let phone;
    let email;
    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
    const phoneRegex = /^.*$/;

    if (emailRegex.test(cred)) {
      email = cred;
    } else if (phoneRegex.test(cred)) {
      phone = cred;
    } else {
      console.log("please enter a valid email or phone");
    }
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
      console.log(error);
      if (error) {
        onError();
      } else {
        onSuccess();
      }
      onHide();
    }
  }, [error, submitted]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="bg-primary">
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{subheader}</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="emailOrPhone">Enter email or phone number</label>
            <input
              type="text"
              className="form-control my-1"
              id="emailOrPhone"
              placeholder=""
              value={cred}
              onChange={(e) => setCred(e.target.value)}
            />
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

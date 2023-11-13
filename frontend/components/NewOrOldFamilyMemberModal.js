import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddFamily from "./AddFamilyMemberModal";
import LinkFamily from "./LinkFamilyMemberModal";

function NewOrOldFamilyMember(props) {
  const { title, subheader, onHide } = props;
  const [NewShow, setNewShow] = useState(false);
  const [OldShow, setOldShow] = useState(false);
  const [mainShow, setMainShow] = useState(true);
  // State variables for form input values

  // Function to handle form submissio

  return (
    mainShow && (
      <Modal
        {...props}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{subheader}</h4>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary m-3"
              onClick={() => {
                setOldShow(true);
              }}
            >
              Existing Family Member
            </button>
            <button
              className="btn btn-primary m-3"
              onClick={() => {
                setNewShow(true);
              }}
            >
              New Family Member
            </button>
          </div>
          <AddFamily
            show={NewShow}
            onHide={() => {
              onHide();
              setNewShow(false);
            }}
          />
          <LinkFamily
            show={OldShow}
            onHide={() => {
              onHide();
              setOldShow(false);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  );
}

export default NewOrOldFamilyMember;

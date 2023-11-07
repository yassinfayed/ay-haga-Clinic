import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addFamilyMembers } from '@/app/redux/actions/FamilyMembersAction';
import { useDispatch } from 'react-redux';

function AddFamily(props) {
  const { title, subheader, onHide } = props;

  // State variables for form input values
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [relationToPatient, setRelationToPatient] = useState('');
  const dispatch = useDispatch();


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFamilyMembers({
      "name" : name,
      "nationalId" : nationalId,
      "age" : age ,
      "gender" : gender ,
      "relationToPatient" : relationToPatient
  }));
  onHide();

    
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <div className="form-group my-3">
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
          <div className="form-group my-3">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              className="form-control my-1"
              id="gender"
              placeholder="Enter Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="relationToPatient">Relation to patient</label>
            <input
              type="text"
              className="form-control my-1"
              id="relationToPatient"
              placeholder="Relation to patient"
              value={relationToPatient}
              onChange={(e) => setRelationToPatient(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddFamily;

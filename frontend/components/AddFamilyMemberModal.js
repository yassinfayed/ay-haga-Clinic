import './components.css';
import React, { useState } from 'react';
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
      "name": name,
      "nationalId": nationalId,
      "age": age,
      "gender": gender,
      "relationToPatient": relationToPatient
    }));
    console.log('added fam member')
    onHide();


  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className='bg-primary'>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title id="contained-modal-title-vcenter" className='px-2 text-global text-bold text-center'>
            {title}
        </Modal.Title>
        <div className='underline-Bold mx-auto mt-2 mb-5'></div>
        <h4>{subheader}</h4>
        <form onSubmit={handleSubmit} className='text-semibold'>
        <div className="row mx-3">
          <div className="form-group my-1 col-md-6">
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
            <select onChange={(e) => setGender(e.target.value)} className='my-1 w-100 form-control text-muted p-2'>
              <option value={null}>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          </div>
          <div className="row mx-3">
          <div className="form-group my-2 col-md-6">
            <label htmlFor="relationToPatient">Relation to patient</label>
            <select onChange={(e) => setRelationToPatient(e.target.value)} className='my-1 w-100 form-control text-muted p-2'>
              <option value={null}>Relation to patient</option>
              <option value="wife">Wife</option>
              <option value="husband">Husband</option>
              <option value="child">Child</option>
            </select>
          </div>
          </div>
          <div className="row justify-content-end align-items-center mt-5 mb-2">
                <button type="submit" className="btn btn-primary mx-auto col-md-4">Submit</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddFamily;

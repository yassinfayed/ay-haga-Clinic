'use client'
import React from 'react';
import {useState} from 'react' ;
import { Card} from '../../../../components/Card'; 
import { Button } from '../../../../components/Button';
import AddFamily from './AddFamilyMemberModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';



function Familymembers() {
    const [modalShow, setModalShow] = useState(false);
    const familymembers = [
        {
            _id:'qowicnq3ic',
            name: 'John Doe',
            nationalId: '1234567890',
            age: 30,
            gender: 'Male',
            relationToPatient: 'husband',
            patientId: 'yourPatientIdHere1', // Replace with the actual patient ID
          },
          {
            _id:'qowicnreq34vgq3ic',
            name: 'Jane Doe',
            nationalId: '9876543210',
            age: 28,
            gender: 'Female',
            relationToPatient: 'wife',
            patientId: 'yourPatientIdHere1', // Replace with the actual patient ID
          },
          {
            _id:'qowicnqwcqwvq3ic',
            name: 'Alice Smith',
            nationalId: '5555555555',
            age: 45,
            gender: 'Female',
            relationToPatient: 'mother',
            patientId: 'yourPatientIdHere2', // Replace with the actual patient ID
          },
          {
            _id:'wqwpcomqwcpq',
            name: 'Bob Johnson',
            nationalId: '7777777777',
            age: 50,
            gender: 'Male',
            relationToPatient: 'father',
            patientId: 'yourPatientIdHere2', // Replace with the actual patient ID
          },
     
    ];
      
      
      





  return (
    <div>


        <div className="container-fluid my-3">
            <Button text="Add New Family Member"  onClick={() => setModalShow(true)}/>
        </div>

        <AddFamily
        show={modalShow}
        onHide={() => setModalShow(false)} 
        />


    <div className="container-fluid my-3">

       
       
      {familymembers.map((familymember) => (
        <Card
          className="my-2"
          key={familymember._id}
          title={familymember.name}
          subtitle={`National ID: ${familymember.nationalId}`}
          text={<>
            Age: {familymember.age}
            <br />
            Gender: {familymember.gender}
            <br />
            Relation to Patient: {familymember.relationToPatient}
          </> }
        />
       
      ))}
      
    </div>
    </div>
  );
 
}

export default Familymembers;
"use client"
import React from 'react';

import { Button } from '../../../../components/Button';
import AdminNavbar from '../doctorapps/AdminNavbar';
import { Card } from '../../../../components/Card';


export default function Patients() {
    const button = <div style={{
        fontSize: '1px', 
      }}>
    <Button text='Approve' variant='xs' ></Button>
    <Button text='Reject' variant='xs'
  ></Button>
    </div>
    
  // const tableHeaders = ['Name','Username','Email','Date of Birth','Affiliation', 'Hourly Rate', 'Educational Background', 'Approval'];

  const initialValues = [
    {
      name: 'John Doe',
      username:'JohnDoe123',
      email: 'johndoe@hotmail.com',
      dob: "12/12/2023",
      affiliation: 'Ramses Hospital',
      hourlyRate: '12$',
      educationalBackground: 'Software Engineer',
      
    },
    {
      name: 'John Doe',
      username:'JohnDoe123',
      email: 'johndoe@hotmail.com',
      dob: "12/12/2023",
      affiliation: 'Ramses Hospital',
      hourlyRate: '12$',
      educationalBackground: 'Software Engineer',
      
    },
    {
      name: 'John Doe',
      username:'JohnDoe123',
      email: 'johndoe@hotmail.com',
      dob: "12/12/2023",
      affiliation: 'Ramses Hospital',
      hourlyRate: '12$',
      educationalBackground: 'Software Engineer',
      
    },
    {
      name: 'John Doe',
      username:'JohnDoe123',
      email: 'johndoe@hotmail.com',
      dob: "12/12/2023",
      affiliation: 'Ramses Hospital',
      hourlyRate: '12$',
      educationalBackground: 'Software Engineer',
      
    }
  ]


  return (
    <>
    <AdminNavbar/>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className='row'>
      {initialValues.map((person)=>{
        return <Card key={person.username} className="col-lg-4 offset-lg-1" title={person.name} subtitle="Doctor's Info"  text={
          <div className="">
          <h8 style={{ fontWeight: 'bold' }}> Username: </h8>{person.username}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>email: </h8>{person.email}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>dob: </h8>{person.dob}
          <br />
          <h8 style={{ fontWeight: 'bold' }}> affiliation: </h8>{person.affiliation}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>hourlyRate: </h8>{person.hourlyRate}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>educationalBackground: </h8>{person.educationalBackground}
          <br />
          </div>
        } buttonText='Remove'>
       
        </Card>
       
      })
       }
       </div>
    </div>
    </>
  );
}

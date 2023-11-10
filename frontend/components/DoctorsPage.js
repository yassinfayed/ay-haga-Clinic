"use client"
import React, { useEffect } from 'react';
import { Card } from './Card';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '@/app/redux/actions/userActions';


export default function DoctorsPage(doctors, admin) {
  
    const dispatch=useDispatch();

    const handleCardClick = (doctor) => {
      // window.history.pushState({},"",`/doctor/${doctor._id}`)
      // window.location.reload()
     };

    function formatDateToDDMMYYYY(isoDate) {
      const date = new Date(isoDate);      
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1.
      const year = date.getFullYear();
      
      return `${day}-${month}-${year}`;
  }

  const onRemoveHandler = (id)=>{
    dispatch(removeUser(id))
  }

  console.log(doctors.doctors)
  console.log(doctors.admin)

  return (
    <>
    <div className="justify-content-center align-items-center min-vh-100">
      <div className='row'>
      {doctors?.doctors?.data?.map((person)=>{
        if(!person.isApproved)
        return
        return <div className="mx-auto col-md-6">
          <Card key={person.user?._id} className="col-md-10 mx-auto offset-lg-1 my-3 bg-light my-4 " 
          title={<div className='text-capitalize '>{person.name}</div>} subtitle={<></>}  text={
          <div className="p-3 pe-0">
          <div className="row global-text">
            <div>
            <Image src='/mail-dark.svg' height={20} width={20} className="me-2"/> {person.email}
            </div>
          </div>
          <div className="row my-2">
          <div className='col-md-6'>
            <Image src='/username.svg' height={20} width={20} className="me-2"/> {person.user?.username}
          <br />
          </div>
          <div className='col-md-6'>
            <Image src='/birthday.svg' height={20} width={20} className="me-2"/>{formatDateToDDMMYYYY(person.DateOfbirth)}
          <br />
          </div>
          </div>
          <div className="row global-text mb-1">
          <div className="col-md-6">
            <h8 style={{ fontWeight: 'bold' }}>Affiliation: </h8>{person.affiliation}
            <br />
          </div>
          <div className="col-md-6">
            <h8 style={{ fontWeight: 'bold' }}>Hourly Rate: </h8>{person.HourlyRate}
            <br />
          </div>
          </div>
          <div className='global-text'>
            <h8 style={{ fontWeight: 'bold' }}>Educational Background: </h8>{person.educationalbackground}
          </div>
          <br />
          </div>
        } image={<Image src='/person.svg' height={30} width={30} className="m-3 mb-0 rounded-circle"/>} 
        buttonText={doctors.admin?'Remove':'view'} buttonTrue={true} buttonClass={"col-md-12 m-3 ms-auto"} 
        onClickButton={doctors.admin? ()=>onRemoveHandler(person.user._id):()=>handleCardClick(person)}>
        </Card>
        </div>
      })
       }
       </div>
    </div>
    </>
  );
}

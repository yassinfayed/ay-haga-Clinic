"use client"
import React, { useEffect } from 'react';

import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { viewPatients } from '@/app/redux/actions/patientsActions';
import { login } from '@/app/redux/actions/authActions';
import { removeUser } from '@/app/redux/actions/userActions';

export default function Patients() {
  const dispatch=useDispatch();
  const patients=useSelector(state=>state.patientsReducer.patients);
  const isLoading=useSelector(state=>state.removeUserReducer.loading);

  useEffect(()=>{
    dispatch(viewPatients());
  },[dispatch,isLoading])

  const onRemoveHandler = (id)=>{
    dispatch(removeUser(id))
  }
  
  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1.
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}

  return (
    <>
    <h3 className='my-1 mt-0 text-center text-title'>Patients</h3>
    <div className='underline-Bold mx-auto mb-5'></div>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className='row'>
      {patients?.data?.map((person)=>{
        return <Card  key={person.user?._id} className="col-lg-4 offset-lg-1 my-3" title={person.name} subtitle={person.email}  text={
          <div className="">
          <h8 style={{ fontWeight: 'bold' }}> Username: </h8>{person.user?.username}
          <br />       
          <h8 style={{ fontWeight: 'bold' }}>Birth Date: </h8>{formatDateToDDMMYYYY(person.dateOfBirth)}
          <br />'
          <h8 style={{ fontWeight: 'bold' }}>Mobile number: </h8>{person.mobileNumber}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>gender: </h8>{person.gender}
          <div className='underline-Bold mx-auto my-2'></div>
          <h5 style={{ fontWeight: 'bold' }} className=" py-2"> Emergency Contact </h5>
          <h8 style={{ fontWeight: 'bold' }}>Name: </h8>{person.emergencyContact.fullName}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>Number: </h8>{person.emergencyContact.mobileNumber}
          <br />
          </div>
        } buttonText='Remove' buttonTrue={true} onClickButton={()=>{onRemoveHandler(person.user._id)}}>
       
        </Card>
       
      })
       }
       </div>
    </div>
    </>
  );
}

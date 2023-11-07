"use client"
import React, { useEffect } from 'react';

import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import {getDoctorsForPatientAction} from '../../redux/actions/doctorActions'
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '@/app/redux/actions/userActions';
import Image from 'next/image';

export default function Doctors() {
  
    const dispatch=useDispatch();
    const doctors=useSelector(state=>state.getDrsForPatientsReducer.doctors);
    const isLoading=useSelector(state=>state.removeUserReducer.loading)
    useEffect(()=>{
      dispatch(getDoctorsForPatientAction());
    },[isLoading])

    const button = <div style={{
        fontSize: '1px', 
      }}>
    <Button text='Approve' variant='xs'></Button>
    <Button text='Reject' variant='xs'></Button>
    </div>

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
    <h3 className='my-1 mt-0 text-center text-title'>Doctors</h3>
    <div className='underline-Bold mx-auto mb-5'></div>
    <div className="d-flex justify-content-center align-items-center min-vh-100 w-100 mx-0 ">
      <div className='d-flex row justify-content-center mx-auto'>
      {doctors?.data?.map((person)=>{
        if(!person.isApproved)
        return
        return <div className="mx-auto col-md-6">
          <Card key={person.user?._id} className="col-lg-9 mx-auto offset-lg-1 my-3 bg-light my-4 " title={<div className='text-capitalize '>{person.name}</div>} subtitle={<></>}  text={
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
        } image={<Image src='/person.svg' height={30} width={30} className="m-3 mb-0 rounded-circle"/>} buttonText='Remove' buttonClass={"col-md-12 m-3 ms-auto"} onClickButton={()=>{onRemoveHandler(person.user._id)}}>
        </Card>
        </div>
      })
       }
       </div>
    </div>
    </>
  );
}

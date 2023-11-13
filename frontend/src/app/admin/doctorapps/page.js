"use client"
import React, { useEffect } from 'react';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '@/app/redux/actions/authActions'
import { getDoctorsForPatientAction,adminAcceptDoctor, rejectDoctor} from '@/app/redux/actions/doctorActions';
import { downloadDoctorDocs } from '@/app/redux/actions/doctorActions';
import Image from 'next/image';

export default function DoctorApps() {
  const dispatch=useDispatch();
  const doctors=useSelector(state=>state.getDrsForPatientsReducer.doctors);
  
  const isLoading=useSelector(state=>state.removeUserReducer.loading);
  const approvalIsLoading=useSelector(state=>state.adminAcceptDoctorReducer.loading);
  const rejectionisLoading=useSelector(state=>state.rejectDoctorReducer.loading);

  useEffect(()=>{
    dispatch(getDoctorsForPatientAction());
  },[isLoading,approvalIsLoading,rejectionisLoading])

  const handleDownload = (id) => {
    dispatch(downloadDoctorDocs(id));
  }

 

  const onRemoveHandler = (id)=>{
    dispatch(rejectDoctor(id))
  }
  const onApproveHandler =(id)=>{
     dispatch(adminAcceptDoctor(id))
   }
  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1.
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }

  return (
    < div className="">
    <h3 className='my-1 mt-0 text-center text-title'>Applications</h3>
    <div className='underline-Bold mx-auto mb-5'></div>
    <div className="justify-content-center align-items-center min-vh-100">
      <div className='row'>
      {doctors?.data?.map((person)=>{
        if(person.employmentContract.status==='accepted')
        return
        return <div className="mx-auto col-md-6"> 
        <Card key={person.username} className="col-lg-9 mx-auto offset-lg-1 my-3 bg-light my-4 " title={<div className='text-capitalize '>{person.name}</div>} image={<Image src='/person.svg' height={30} width={30} 
        className="m-3 mb-0 rounded-circle"/>} subtitle={<div className='mt-2 ms-3 text-semibold text-capitalize'>Status: {person.employmentContract.status}</div>}>
       <hr />
       <div className="p-3 pe-0">
       {person.employmentContract.status==='waitingadmin' &&
        <div className="row mb-3">
          <div className="col-lg-6">
              <Button variant="xs" text="View Documents" onClick={()=>handleDownload(person._id)}></Button>
          </div>
        </div>
      }
          <div className="row">
            <div>
            <Image src='/mail-dark.svg' height={20} width={20} className="me-2"/>{person.email}
            <br />
            </div>
          </div>
          <div className="row my-2">
            <div className="col-md-6">
              <Image src='/username.svg' height={20} width={20} className="me-2"/>{person.user?.username}
              <br />
            </div>
            <div className="col-md-6">
              <Image src='/birthday.svg' height={20} width={20} className="me-2"/>{formatDateToDDMMYYYY(person.DateOfbirth)}
              <br />
            </div>
          </div>
          <div className="row global-text">
          <div className="col-md-6">
            <h8 style={{ fontWeight: 'bold' }}>Affiliation: </h8>{person.affiliation}
            <br />
          </div>
          <div className="col-md-6">
            <h8 style={{ fontWeight: 'bold' }}>Hourly Rate: </h8>{person.HourlyRate}
            <br />
          </div>
          </div>
          <h8 className="global-text" style={{ fontWeight: 'bold' }}>educationalBackground: </h8>{person.educationalbackground}
          <br />
          </div>
          <div className='row'>
          {person.employmentContract.status==='waitingadmin' && <Button text='Reject' color='dark' variant='xs' onClick={()=>onRemoveHandler(person._id)} className='col-md-4 mx-auto'></Button>}
          {person.employmentContract.status==='waitingadmin' && <Button text='Approve' variant='xs' onClick={()=>onApproveHandler(person._id)} className='col-md-4 mx-auto'></Button>}
          </div>
        </Card></div>
      })
       }
       </div>
    </div>
    </div>
  );
}

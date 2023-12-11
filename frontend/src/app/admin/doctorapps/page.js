"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '@/app/redux/actions/authActions'
import { getDoctorsForPatientAction,adminAcceptDoctor, rejectDoctor} from '@/app/redux/actions/doctorActions';
import { downloadDoctorDocs } from '@/app/redux/actions/doctorActions';
import Image from 'next/image';
import { Alert } from 'react-bootstrap';
import Spinner from "../../../../components/Spinner";
export default function DoctorApps() {
  const dispatch=useDispatch();
  const doctors=useSelector(state=>state.getDrsForPatientsReducer.doctors);
  const doctorsisLoading=useSelector(state=>state.getDrsForPatientsReducer.loading);
  const isLoading=useSelector(state=>state.removeUserReducer.loading);
  const approvalIsLoading=useSelector(state=>state.adminAcceptDoctorReducer.loading);
  const approvalisFail=useSelector(state=>state.adminAcceptDoctorReducer.error);
  const rejectionisLoading=useSelector(state=>state.rejectDoctorReducer.loading);
  const rejerctionisFail=useSelector(state=>state.rejectDoctorReducer.error);
  const [showAlertApprovalSuccess, setShowAlertApprovalSuccess] = useState(false);
  const [showAlertApprovalFail, setShowAlertApprovalFail] = useState(false);
  const [showAlertApprovalLoading, setShowAlertApprovalLoading] = useState(false);
  const [showAlertRejectionSuccess, setShowAlertRejectionSuccess] = useState(false);
  const [showAlertRejectionFail, setShowAlertRejectionFail] = useState(false);
  const [showAlertRejectionLoading, setShowAlertRejectionLoading] = useState(false);


  useEffect(()=>{
    dispatch(getDoctorsForPatientAction());
  },[isLoading,approvalIsLoading,rejectionisLoading])

  const handleDownload = (id) => {
    dispatch(downloadDoctorDocs(id));
  }

  const onRemoveHandler = async (id) => {
    setShowAlertRejectionLoading({ ...showAlertRejectionLoading, [id]: true });
    
    setShowAlertRejectionLoading(true);
    setShowAlertRejectionFail(false);
    setShowAlertRejectionSuccess(false);
    dispatch(rejectDoctor(id)).then(()=>{
      setShowAlertRejectionLoading({ ...showAlertRejectionLoading, [id]: false });
    
       if (rejerctionisFail){
        setShowAlertRejectionFail(true);
        const timer = setTimeout(() => {
          setShowAlertRejectionFail(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    else{
        setShowAlertRejectionSuccess(true);
        const timer = setTimeout(() => {
          setShowAlertRejectionSuccess(false);
        }
        , 3000);
        return () => clearTimeout(timer);
      }
     
    }
    );
  };

    const onApproveHandler = async (id) => {
      setShowAlertApprovalLoading({ ...showAlertApprovalLoading, [id]: true });
   
    setShowAlertApprovalFail(false);
    setShowAlertApprovalSuccess(false);
    dispatch(adminAcceptDoctor(id)).then(()=>{
      setShowAlertApprovalLoading({ ...showAlertApprovalLoading, [id]: false });

       if (approvalisFail) {
        setShowAlertApprovalFail(true);
        const timer = setTimeout(() => {
          setShowAlertApprovalFail(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    else{
        setShowAlertApprovalSuccess(true);
        const timer = setTimeout(() => {
          setShowAlertApprovalSuccess(false);
        }
        , 3000);
        return () => clearTimeout(timer);
      }
     
    }
    );    
  };

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }

  return (
    < div className="">
    <h3 className='my-1 mt-0 text-center text-title'>Applications</h3>
    <div className='underline-Bold mx-auto mb-5'></div>
    <div className="justify-content-center align-items-center min-vh-100">
      <div className='row'>
      { showAlertApprovalSuccess && <Alert variant='success' className='text-center'>Doctor approved successfully</Alert>}
      { showAlertApprovalFail && <Alert variant='danger' className='text-center'>{approvalisFail}</Alert>}
      { showAlertRejectionSuccess && <Alert variant='success' className='text-center'>Doctor rejected successfully</Alert>}
      { showAlertRejectionFail && <Alert variant='danger' className='text-center'>{rejerctionisFail}</Alert>}


      
    {doctorsisLoading&&<Spinner/>}
    {!doctorsisLoading&&   doctors?.data?.map((person)=>{
        if(person.employmentContract.status==='accepted')
        return

        const isApproving = showAlertApprovalLoading[person._id];
        const isRejecting = showAlertApprovalLoading[person._id];

        return <div className="mx-auto col-md-6"> 
        <Card key={person.username} className="col-lg-9 mx-auto offset-lg-1 my-3 bg-light my-4 " title={<div className='text-capitalize '>{person.name}</div>} image={<Image src='/person.svg' height={30} width={30} 
        className="m-3 mb-0 rounded-circle"/>} subtitle={<div className='mt-2 ms-3 text-semibold text-capitalize'>Status: {person.employmentContract.status}</div>}>
       <hr />
       <div className="p-3 pe-0">
       {person.employmentContract.status==='Waiting Admin' &&
        <div className="row mb-3">
          <div className="col-lg-6">
              <Button variant="xs" text="View Documents" onClick={()=>handleDownload(person._id)}></Button>
          </div>
        </div> }
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
              {person.employmentContract.status === 'Waiting Admin' && (
                isRejecting ? (
                  <Button variant="dark" disabled className='col-md-4 mx-auto'>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Rejecting...
                  </Button>
                ) : (
                  <Button text='Reject' color='dark' variant='xs' onClick={() => onRemoveHandler(person._id)} className='col-md-4 mx-auto'></Button>
                )
              )}
              {person.employmentContract.status === 'Waiting Admin' && (
                isApproving ? (
                  <Button variant="primary" disabled className='col-md-4 mx-auto'>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Approving...
                  </Button>
                ) : (
                  <Button text='Approve' variant='xs' onClick={() => onApproveHandler(person._id)} className='col-md-4 mx-auto'></Button>
                )
              )}
            </div>
        </Card></div>
      })
       }

       </div>
    </div>
    </div>
  );
}

"use client"
import React, { useState, useEffect } from 'react';
import { Table} from '../../../../components/Table'; 

import { Button } from '../../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { viewPatients } from '@/app/redux/actions/patientsActions';
import { removeUser } from '@/app/redux/actions/userActions';
import Image from 'next/image';
import { Alert } from 'react-bootstrap';

import Spinner from '../../../../components/Spinner';

export default function Patients() {

  const tableHeaders = ['name','email','birth date','gender', 'phone', 'emergency contact','emergency number','actions']; // Add a new column header

  const dispatch=useDispatch();
  const patients=useSelector(state=>state.patientsReducer.patients);
  const patientLoading=useSelector(state=>state.patientsReducer.loading);
  const isLoading=useSelector(state=>state.removeUserReducer.loading);
  const removeIsFail=useSelector(state=>state.removeUserReducer.error);
  const [showremoveAlertSuccess, setRemoveAlertSuccess] = useState(false);
  const [showremoveAlertFail, setRemoveAlertFail] = useState(false);
  const [showremoveAlertLoading, setRemoveAlertLoading] = useState(false);
  
  useEffect(()=>{
    dispatch(viewPatients());
  },[dispatch,isLoading])

  const onRemoveHandler = async (id) => {
    setRemoveAlertLoading({ ...showremoveAlertLoading, [id]: true });
    setRemoveAlertFail(false);
    setRemoveAlertSuccess(false);
    dispatch(removeUser(id)).then(()=>{
      setRemoveAlertLoading({ ...showremoveAlertLoading, [id]: false });
      
       if (removeIsFail) {
        setRemoveAlertFail(true);
        const timer = setTimeout(() => {
          setRemoveAlertFail(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    else{
        setRemoveAlertSuccess(true);
        const timer = setTimeout(() => {
          setRemoveAlertSuccess(false);
        }
        , 2000);
        return () => clearTimeout(timer);
      }
     
    }
    );
  };
  

  const generateButton = (id) => {
    const isDeleting = showremoveAlertLoading[id];
    return (
      <div style={{ fontSize: '1px' }}>
        {isDeleting ?  (
          <Button variant="primary" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </Button>
          ) : (
          <Button text={<Image src='/delete.svg' height={20} width={20} className="rounded-circle"/>} variant='xs' color='light' className="rounded-circle" onClick={() => onRemoveHandler(id)}>
          </Button>
        )}
      </div>
    );
  };  

  let tabledata = patients?.data?.map(item => {
    const { appointmentDate, emergencyContact, id ,_id ,user ,__v , renewalDate, cancellationDate, package: packageInfo, cancellationEndDate ,healthRecords, medicalRecords, subscriptionStatus ,...rest } = item;
    rest.dateOfBirth = formatDateToDDMMYYYY(rest.dateOfBirth)
    rest.emergencyContactName = item.emergencyContact.fullName
    rest.emergencyContactNumber = item.emergencyContact.mobileNumber
    rest.button = generateButton(user?._id)
    const final = {
    name: rest.name,
    email: rest.email,
    dateOfBirth: rest.dateOfBirth,
    gender: rest.gender,
    phone: rest.mobileNumber,
    emergencyContactName: rest.emergencyContactName,
    emergencyContactNumber: rest.emergencyContactNumber,
    button: rest.button}
    //['name','email','birth date','gender', 'phone', 'emergency contact','emergency number','actions']; 
    return final;
  })

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="mx-3">
    {
      showremoveAlertSuccess &&(
        <Alert variant='success' className='text-center'>
          Patient removed successfully
        </Alert>
      )
    }
    {
      showremoveAlertFail && (
        <Alert variant='danger' className='text-center'>
          {removeIsFail}
        </Alert>
      )
    }
    <h3 className='my-1 mt-0 text-center text-title'>Patients</h3>
    <div className='underline-Bold mx-auto mb-5'></div>
    {patientLoading && <Spinner />}
    {!patientLoading && patients && patients.data && patients.data.length > 0 && (
      <div className="container-fluid my-3">
        <Table headers={tableHeaders} data={tabledata}  itemsPerPageOptions={[5, 10, 15]} className="" />
      </div>
    )}
    {!patientLoading && (!patients || (patients && patients.data && patients.data.length === 0)) && (
      <div className="text-center">No Patients</div>
    )}
    </div>
  );
}

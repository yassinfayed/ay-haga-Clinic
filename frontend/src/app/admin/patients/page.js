"use client"
import React, { useEffect } from 'react';
import { Table} from '../../../../components/Table'; 

import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { viewPatients } from '@/app/redux/actions/patientsActions';
import { login } from '@/app/redux/actions/authActions';
import { removeUser } from '@/app/redux/actions/userActions';
import Image from 'next/image';

export default function Patients() {

  const tableHeaders = ['name','email','birth date','gender', 'phone', 'emergency contact','emergency number','actions']; // Add a new column header

  const dispatch=useDispatch();
  const patients=useSelector(state=>state.patientsReducer.patients);
  const isLoading=useSelector(state=>state.removeUserReducer.loading);

  
  useEffect(()=>{
    dispatch(viewPatients());
  },[dispatch,isLoading])

  const onRemoveHandler = (id)=>{
    dispatch(removeUser(id))
  }

  const generateButton = (id) => {
    return (
      <div style={{ fontSize: '1px' }}>
        <Button text={<Image src='/delete.svg' height={20} width={20} className="rounded-circle"/>} variant='xs' color='light' className="rounded-circle" onClick={()=>onRemoveHandler(id)}>
        </Button>
      </div>
    );
  };

  let tabledata = patients?.data?.map(item => {
    console.log(item)
    const { emergencyContact, id ,_id ,user ,__v , renewalDate, cancellationDate, package: packageInfo, cancellationEndDate ,healthRecords, medicalRecords, subscriptionStatus ,...rest } = item;
    rest.dateOfBirth = formatDateToDDMMYYYY(rest.dateOfBirth)
    rest.emergencyContactName = item.emergencyContact.fullName
    rest.emergencyContactNumber = item.emergencyContact.mobileNumber
    rest.button = generateButton(user?._id)
    return rest;
  })

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1.
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="mx-3">
    <h3 className='my-1 mt-0 text-center text-title'>Patients</h3>
    <div className='underline-Bold mx-auto mb-5'></div>
    <Table headers={tableHeaders} data={tabledata}  itemsPerPageOptions={[5, 10, 15]} className="" />
    </div>
  );
}

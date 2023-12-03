"use client"
import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '@/app/redux/actions/userActions';
import { Alert } from 'react-bootstrap';

export default function DoctorsPage(doctors, admin) {
    const dispatch=useDispatch();
    const removeIsFail=useSelector(state=>state.removeUserReducer.error);
    const [removeDoctorAlertSuccess, setRemoveDoctorAlertSuccess] = useState(false);
    const [removeDoctorAlertFail, setRemoveDoctorAlertFail] = useState(false);
    const [removeDoctortAlertLoading, setRemoveDoctorAlertLoading] = useState(false);
    

    const handleCardClick = (doctor) => {
      window.history.pushState({},"",`/patient/Appointments/${doctor._id}`)
      window.location.reload()
     };

    function formatDateToDDMMYYYY(isoDate) {
      const date = new Date(isoDate);      
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}-${month}-${year}`;
  }

  const onRemoveHandler = async (id) => {
 
    setRemoveDoctorAlertLoading({ ...removeDoctortAlertLoading, [id]: true });
    setRemoveDoctorAlertFail(false);
    setRemoveDoctorAlertSuccess(false);
    dispatch(removeUser(id)).then(()=>{
    setRemoveDoctorAlertLoading(false);
    setRemoveDoctorAlertLoading({ ...removeDoctortAlertLoading, [id]: false });
      
       if (removeIsFail) {
        setRemoveDoctorAlertFail(true);
        const timer = setTimeout(() => {
          setRemoveDoctorAlertFail(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    else{
        setRemoveDoctorAlertSuccess(true);
        const timer = setTimeout(() => {
          setRemoveDoctorAlertSuccess(false);
        }
        , 3000);
        return () => clearTimeout(timer);
      }
     
    }
    );
  };

  return (
    <>
      <div className="justify-content-center align-items-center min-vh-100">
        {
          removeDoctorAlertSuccess && (
            <Alert variant='success' className='text-center'>
              Doctor removed successfully
            </Alert>
          )
        }
        {
          removeDoctorAlertFail && (
            <Alert variant='danger' className='text-center'>
              {removeIsFail}
            </Alert>
          )
        }
        <div className='row'>
          {doctors?.doctors?.data?.map((person) => {
            if (person.employmentContract.status !== 'accepted') return null;
  
            const isRemoving = removeDoctortAlertLoading[person.user?._id];
            return (
              <div className="mx-auto col-md-6">
                <Card key={person.user?._id} className="col-md-10 mx-auto offset-lg-1 my-3 bg-light my-4" 
                  title={<div className='text-capitalize '>{person.name}</div>} 
                  subtitle={<></>}  
                  text={
                    <div className="p-3 pe-0">
                      <div className="row global-text">
                        <div><Image src='/mail-dark.svg' height={20} width={20} className="me-2"/> {person.email}</div>
                      </div>
                      <div className="row my-2">
                        <div className='col-md-6'><Image src='/username.svg' height={20} width={20} className="me-2"/> {person.user?.username}<br /></div>
                        <div className='col-md-6'><Image src='/birthday.svg' height={20} width={20} className="me-2"/>{formatDateToDDMMYYYY(person.DateOfbirth)}<br /></div>
                      </div>
                      <div className="row global-text mb-1">
                        <div className="col-md-6"><h8 style={{ fontWeight: 'bold' }}>Affiliation: </h8>{person.affiliation}<br /></div>
                        <div className="col-md-6"><h8 style={{ fontWeight: 'bold' }}>Hourly Rate: </h8>{person.HourlyRate}<br /></div>
                      </div>
                      <div className='global-text'>
                        <h8 style={{ fontWeight: 'bold' }}>Educational Background: </h8>{person.educationalbackground}
                      </div>
                      <br />
                    </div>
                  } 
                  image={<Image src='/person.svg' height={30} width={30} className="m-3 mb-0 rounded-circle"/>}
                  buttonText={isRemoving ? "Removing..." : (doctors.admin ? "Remove" : "View")}
                  buttonTrue={true}
                  buttonClass={"col-md-12 m-3 ms-auto"}
                  onClickButton={() => onRemoveHandler(person.user?._id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
  
}

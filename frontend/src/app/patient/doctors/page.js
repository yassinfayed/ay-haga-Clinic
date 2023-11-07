'use client'
import React, { useEffect } from 'react';
import {useState} from 'react' ;
import { Card} from '../../../../components/Card'; 
import Image from 'next/image';
import { Button } from '../../../../components/Button';

import './page.css' ;
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsForPatientAction } from '@/app/redux/actions/doctorActions';

function DoctorList() {
  const dispatch=useDispatch();
  
  const [speciality, setSpeciality] = useState({});
  const [date,setDate]=useState("");
  const [name,setName] =useState({});
  const [value, onChange] = useState(new Date());

  const handleClearFilters = () => {
    setDate(null);
    setName(null);
    setSpeciality(null);
  }


  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value); 
  };

  const handleCardClick = (doctor) => {
   window.history.pushState({},"",`/doctor/${doctor._id}`)
   window.location.reload()
  };

  const handleFilter = (e) =>{
      const selectedDate = e.target.value;
      if (!selectedDate) {
        console.log("No date selected");
        setDate({});
        return;
      }

      const dateObj = new Date(selectedDate);

      dateObj.setUTCHours(dateObj.getUTCHours() + 3);

      const formattedDate = dateObj.toISOString();

      console.log(formattedDate);

      setDate({
        availableDates: { in: formattedDate },
      });
    }

  const {doctors,specialities} = useSelector(state => state.getDrsForPatientsReducer)

    
useEffect(()=>{
  dispatch(getDoctorsForPatientAction({...name,...speciality,...date}))
 
  },[dispatch,name,speciality,date])

const handleDateClick= () => {
  dispatch(getDoctorsForPatientAction({...name,...speciality,...date}))
}

function formatDateToDDMMYYYY(isoDate) {
  const date = new Date(isoDate);      
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1.
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
}

  return (
    
    <div className='m-2'>
      <h3 className='my-1 mt-0 text-center text-title'>Doctors</h3>
    <div className='underline-Bold mx-auto mb-5'></div>
      <div className='row flex align-items-center justify-content-start bg-light p-3 pe-0 m-3 rounded border'>
        <div className="col-md-1">
          <Image src='/filter.svg' height={30} width={30} className=""/>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Doctor Name"
            className="search-input"
            onChange={ (e)=> setName( {"name": {"regex": e.target.value }} )}
          />
        </div>
        <div className=" col-md-3">
          <select
            onChange={(e) => setSpeciality( e.target.value ===""?{}: {"speciality": {"in": e.target.value}})}
            className="search-input text-muted pe-2">
              <option value="" disabled={true}>Select Speciality</option>
                {specialities?.map((speciality, index) => (
                  <option key={index} value={speciality}>
                    {speciality}
                  </option>
                ))}
          </select>
        </div>
        <div className='col-md-3'>
          <input type="datetime-local" id="appointmentdate" name="appointmentdate" 
            onChange={(e) => {handleFilter(e)}} className='search-input'/>
        </div>
        <div className="col-md-2 ms-auto">
          <Button text="Clear Filters" className="w-60 ms-5" onClick={handleClearFilters} variant={'md'}></Button>       
        </div>
      </div>
      <br />
    <div className="justify-content-center align-items-center min-vh-100">
    <div className='row '>
      {doctors?.data?.map((person) => (
        <div className="mx-auto col-md-6 "> 
        <Card key={person.user?._id} className="col-md-9 mx-auto offset-lg-1 my-3 bg-light my-4 " title={<div className='text-capitalize'>{person.name}</div>} subtitle={<></>}  text={
            <div className="">
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
          } image={<Image src='/person.svg' height={30} width={30} className="m-3 mb-0"/>} >
        </Card>
        </div>
      ))}
    </div>
    </div>    
    </div>
  );
 
}

export default DoctorList;

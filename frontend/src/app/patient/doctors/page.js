'use client'
import React, { useEffect } from 'react';
import {useState} from 'react' ;
import Image from 'next/image';
import { Button } from '../../../../components/Button';
import './page.css' ;
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsForPatientAction } from '@/app/redux/actions/doctorActions';
import DoctorsPage from '../../../../components/DoctorsPage';


function DoctorList() {
  const dispatch=useDispatch();
  
  const [speciality, setSpeciality] = useState({});
  const [date,setDate]=useState("");
  const [name,setName] =useState({});

  const handleClearFilters = () => {
    setDate(null);
    setName(null);
    setSpeciality(null);
  }

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
    <DoctorsPage doctors={doctors} admin={false} cardOnClick={()=>handleCardClick}/>
    </div>

  );
 
}

export default DoctorList;

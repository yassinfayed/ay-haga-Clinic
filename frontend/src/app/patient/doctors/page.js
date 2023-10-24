'use client'
import React, { useEffect } from 'react';
import {useState} from 'react' ;
import { Card} from '../../../../components/Card'; 

import './page.css' ;
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsForPatientAction } from '@/app/redux/actions/doctorActions';

function DoctorList() {
  const dispatch=useDispatch();
  
  const [speciality, setSpeciality] = useState({});
  const [date,setDate]=useState("");
  const[name,setName] =useState({});
  const [value, onChange] = useState(new Date());
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

  return (
    
    <div className='m-2'>
      <h3 className='my-1 mt-0 text-center text-title'>Doctors</h3>
      <div className='underline-Bold mx-auto mb-5'></div>
      <div className="search-container">
      <input
        type="text"
        placeholder="Search For Doctor"
        className="search-input"
        onChange={ (e)=> setName( {"name": {"regex": e.target.value }} )}
      />
      </div>
      <div className='container-fluid'>
    <span className="mr-2">Filter by appointment date and time : </span>
     <input type="datetime-local" id="appointmentdate" name="birthday" 
      onChange={(e) => {handleFilter(e)}}/>
    </div>
        <div className="search-container">
          <select
            onChange={(e) => setSpeciality( e.target.value ===""?{}: {"speciality": {"in": e.target.value}})}
            className="search-input"
          >
            <option value="">Select Speciality</option>
            {specialities?.map((speciality, index) => (
              <option key={index} value={speciality}>
                {speciality}
              </option>
            ))}
          </select>
        </div>
    <div className="container-fluid ">
           <div className="row">
    
      {doctors?.data?.map((doctor) => (
        <Card
        className="col-lg-4"
          key={doctor.id}
          title={doctor.name}
          subtitle={doctor.specialty}
          text={`Session Price: ${doctor.sessionPrice} - \n speciality: ${doctor.speciality}`}
          onClickButton={() => handleCardClick(doctor)}
          buttonText={'Details'}
          image={<img src={doctor.image}  alt="DoctorImage"  style={{ maxHeight: '150px' , maxWidth: '100px'}} />}
        />
      ))}
    </div>
    </div>    
    </div>
  );
 
}

export default DoctorList;

'use client'
import React, { useEffect } from 'react';
import {useState} from 'react' ;
import { Card} from '../../../../components/Card'; 
import { Button} from '../../../../components/Button'; 



import './page.css' ;
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsForPatientAction } from '@/app/redux/actions/doctorActions';
import { login } from '@/app/redux/actions/authActions';



function DoctorList() {
  const dispatch=useDispatch();
  
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const[name,setName] =useState({});
  const [value, onChange] = useState(new Date());
  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value); 
  };

  const handleCardClick = (medicine) => {
   //go to hazem 
  };

  const doctors = useSelector(state => state.getDrsForPatientsReducer.doctors)

  // const allSpecialties = Array.from(
  //   new Set(doctors.flatMap((doctor) => doctor.specialty))
  // );
    
useEffect(()=>{
  //dispatch(login("faridashetta","password123"))
  dispatch(getDoctorsForPatientAction({...name}))
 
  },[dispatch,name])





  return (
    <div>
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
     <input type="date" id="appointmentdate" name="birthday"/>
     <input type="time" id="appointmenttime" name="birthday"/>
     <Button text="Filter"  className="Date-filter-button" onClick={() => console.log('Button clicked')} />
    </div>

    {/* <div className="rows"> */}
            {/* <div className="row my-3"> */}
            <div className="container-fluid">
            <span className="mr-2">Filter by specialty use:</span>
          <select onChange={handleSpecialtyChange} className='col-lg-2 mx-lg-1' value={selectedSpecialty || ''}>
            <option value="">All</option>
            {/* {allSpecialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))} */}
          </select>
        </div>
        
        
     
      
    


    {/* <div className=".doctor-list-container"> */}
    <div className="container-fluid ">
           <div className="row">
    
      {doctors?.data?.map((doctor) => (
        <Card
        className="col-lg-4"
          key={doctor.id}
          title={doctor.name}
          subtitle={doctor.specialty}
          text={`Session Price: ${doctor.sessionPrice}`}
          onClickButton={() => handleCardClick(doctor)}
          buttonText={'Details'}
          image={<img src={doctor.image}  alt="DoctorImage"  style={{ maxHeight: '150px' , maxWidth: '100px'}} />}
        />
      ))}
    </div>
    </div>
    {/* </div> */}
    
    </div>
  );
 
}

export default DoctorList;

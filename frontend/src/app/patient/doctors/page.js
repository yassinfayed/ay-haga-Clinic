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
  
  const [speciality, setSpeciality] = useState({});
  const [date,setDate]=useState("");
  const[name,setName] =useState({});
  const [value, onChange] = useState(new Date());
  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value); 
  };

  const handleCardClick = (doctor) => {
   //go to hazem 
   window.history.pushState({},"",`/doctor/${doctor._id}`)
   window.location.reload()
  };

  const {doctors,specialities} = useSelector(state => state.getDrsForPatientsReducer)

  // const allSpecialties = Array.from(
  //   new Set(doctors.flatMap((doctor) => doctor.specialty))
  // );
    
useEffect(()=>{
  //dispatch(login("faridashetta","password123"))
  dispatch(getDoctorsForPatientAction({...name,...speciality,...date}))
 
  },[dispatch,name,speciality,date])

const handleDateClick= () => {
  // console.log(date)
  // date.availableDates.in=formatDateToISOString(new Date(date.availableDates.in))
  dispatch(getDoctorsForPatientAction({...name,...speciality,...date}))
}
// const formatDateToISOString = (date) => {
  
//   const year = date.getUTCFullYear();
//   const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//   const day = String(date.getUTCDate()).padStart(2, '0');
//   const hours = String(date.getUTCHours()).padStart(2, '0');
//   const minutes = String(date.getUTCMinutes()).padStart(2, '0');
//   const seconds = String(date.getUTCSeconds()).padStart(2, '0');
//   const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
//   const offset = date.getTimezoneOffset();
//   const offsetSign = offset > 0 ? '-' : '+';
//   const offsetHours = String(Math.abs(offset / 60)).padStart(2, '0');
//   const offsetMinutes = String(Math.abs(offset % 60)).padStart(2, '0');


//   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
// };



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
     <input type="datetime-local" id="appointmentdate" name="birthday" 
onChange={(e) => {
  const selectedDate = e.target.value;
  if (!selectedDate) {
    // Handle empty input
    console.log("No date selected");
    setDate({});
    return;
  }

  // Convert the input value to a Date object
  const dateObj = new Date(selectedDate);

  // Add 6 hours to the selected date
  dateObj.setUTCHours(dateObj.getUTCHours() + 3);

  // Format the adjusted date in ISO 8601 format with an offset of 0
  const formattedDate = dateObj.toISOString();

  console.log(formattedDate);

  setDate({
    availableDates: { in: formattedDate },
  });
}}/>
  
     
    </div>

    {/* <div className="rows"> */}
            {/* <div className="row my-3"> */}
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
            {/* {allSpecialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))} */}
          
        
        
     
      
    


    {/* <div className=".doctor-list-container"> */}
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
    {/* </div> */}
    
    </div>
  );
 
}

export default DoctorList;

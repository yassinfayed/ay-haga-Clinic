'use client'
import React from 'react';
import {useState} from 'react' ;
import { Card} from '../../../../components/Card'; 
import { Button} from '../../../../components/Button'; 



import './page.css' ;



function DoctorList() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null); 
  const [value, onChange] = useState(new Date());
  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value); 
  };

  const doctors = [
    {
      id: 1,
      name: 'Dr. John Smith',
      specialty: 'Cardiologist',
      sessionPrice: '$150',
      image: 'https://mehtahospital.com/wp-content/uploads/2023/03/doctor.jpg',
    },
    {
      id: 2,
      name: 'Dr. Jane Doe',
      specialty: 'Pediatrician',
      sessionPrice: '$120',
      image: 'https://mehtahospital.com/wp-content/uploads/2023/03/doctor.jpg',
    },
    {
      id: 3,
      name: 'Dr. Sarah Johnson',
      specialty: 'Dermatologist',
      sessionPrice: '$180',
      image: 'https://mehtahospital.com/wp-content/uploads/2023/03/doctor.jpg',
    },
    {
      id: 4,
      name: 'Dr. Michael Brown',
      specialty: 'Orthopedic Surgeon',
      sessionPrice: '$200',
      image: 'https://mehtahospital.com/wp-content/uploads/2023/03/doctor.jpg',
    },
    {
      id: 5,
      name: 'Dr. Emily Wilson',
      specialty: 'Psychiatrist',
      sessionPrice: '$160',
      // image: 'doctor5.jpg',
    },
    {
      id: 6,
      name: 'Dr. David Lee',
      specialty: 'Ophthalmologist',
      sessionPrice: '$175',
      // image: 'doctor6.jpg',
    },
    // Add more doctor objects as needed
  ];

  const allSpecialties = Array.from(
    new Set(doctors.flatMap((doctor) => doctor.specialty))
  );
    





  return (
    <div>
      <div className="search-container">
      <input
        type="text"
        placeholder="Search For Doctor"
        className="search-input"
      />
      <Button text="Search"  className="search-button" onClick={() => console.log('Button clicked')} />
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
            {allSpecialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
          </select>
        </div>
        
        
     
      
    


    {/* <div className=".doctor-list-container"> */}
    <div className="container-fluid ">
           <div className="row">
    
      {doctors.map((doctor) => (
        <Card
        className="col-lg-4"
          key={doctor.id}
          title={doctor.name}
          subtitle={doctor.specialty}
          text={`Session Price: ${doctor.sessionPrice}`}
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

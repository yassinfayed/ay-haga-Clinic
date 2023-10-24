'use client'
import React, { useEffect, useState } from 'react';
import { Table} from '../../../../components/Table'; 
import { Button} from '../../../../components/Button'; 
import './page.css' ;
import { useDispatch, useSelector } from 'react-redux';
import { filterPatientsBasedOnUpcomingAppointments, viewPatients } from '@/app/redux/actions/patientsActions';
import { login } from '@/app/redux/actions/authActions';
import { Navbar } from 'react-bootstrap';
import NavbarDoc from '../../../../components/NavbarDoc';




function PatientsList() {
  const tableHeaders = ['name','email','date of birth','gender', 'phone number','Appointment date','']; // Add a new column header

  const tabledata2 = useSelector(state => state.patientsReducer?.patients?.data)
  const tabledataU1 = useSelector(state => state.filterPatientsBasedOnUpcomingAppointmentsReducer?.patients?.data)
  const [name,setName] = useState({});
  const [upcoming,setUpcoming] = useState({});

  const generateButton = (id) => {
    return (
      <div style={{ fontSize: '1px' }}>
        <Button text='view' variant='xs' onClick={() => window.location.replace(`/patient/${id}`)}></Button>
      </div>
    );
  };

  let tabledata = tabledata2?.map(item => {
    console.log(item)
    const { emergencyContact,id,_id,user,__v,healthRecords ,...rest } = item;
    rest.button = generateButton(_id)
    return rest;
  })

 
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(viewPatients({...name,...upcoming}))
  },[name,upcoming])

 
  return (
    <div className='m-2'>
      <h3 className='my-1 mt-0 text-center text-title'>Patients</h3>
      <div className='underline-Bold mx-auto mb-5'></div>
      <div className="div container-fluid d-flex ">
      <div className="search-container">
      <input
        type="text"
        placeholder="Search For Patient"
        className="search-input"
        onChange={(e) =>{ 
          setName( {"name": e.target.value } ); 
      }
      } 
      />
      </div>
      <div className="div container-fluid" style={{ display: 'flex', alignItems: 'center' }}>
  <label htmlFor="upcomingAppointments">Upcoming Appointments</label>
  <input
   onChange={(e) => {
    setUpcoming(e.target.checked ? {status:'Upcoming'}: {})  
   }
   }
   type="checkbox" id="upcomingAppointments" name="upAp" value="upAp" style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
</div>
</div>
    <div className=".patient-table-container">
    <Table headers={tableHeaders} data={tabledata}  itemsPerPageOptions={[5, 10, 15]} />
    </div>
    </div>
  );
 
}

export default PatientsList;

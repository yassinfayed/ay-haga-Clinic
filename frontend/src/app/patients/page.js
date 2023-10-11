'use client'
import React from 'react';
import {useState} from 'react' ;
import { Card} from '../../../components/Card'; 
import { Table} from '../../../components/Table'; 
import { Button} from '../../../components/Button'; 
import Navbar  from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import useFilter from '../../../hooks/useFilter';
import './page.css' ;




function PatientsList() {
  const tableHeaders = ['Name', 'Phone Number', 'View Details']; // Add a new column header

  const initialValues = [
    ['John Doe', '0123456789', <Button text="View Details" onClick={() => console.log('Button clicked')} />],
    ['Jane Smith','0123456789', <Button text="View Details" onClick={() => console.log('Button clicked')} />],
    ['Alice Johnson', '0123456789', <Button text="View Details" onClick={() => console.log('Button clicked')} />],
    ['Bob Brown', '0123456789', <Button text="View Details" onClick={() => console.log('Button clicked')} />],
    ['Ella Wilson', '0123456789', <Button text="View Details" onClick={() => console.log('Button clicked')} />],
    ['David Lee', '0123456789', <Button text="View Details" onClick={() => console.log('Button clicked')} />],
  ];

  const[tableData, setTableData , filterTableData , sortTableData] = useFilter(tableHeaders, initialValues) ;






  return (
    <div >
      {/* <div className="div container-fluid" style={{ display: 'flex', alignItems: 'center' }}> */}
      


      <div className="div container-fluid d-flex ">
      <div className="search-container">
      <input
        type="text"
        placeholder="Search For Patient"
        className="search-input"
      />
      <Button text="Search"  className="search-button" onClick={() => console.log('Button clicked')} />
      </div>

      <div className="div container-fluid" style={{ display: 'flex', alignItems: 'center' }}>
  <label htmlFor="upcomingAppointments">Upcoming Appointments</label>
  <input type="checkbox" id="upcomingAppointments" name="upAp" value="upAp" style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
</div>
</div>
      {/* </div> */}


    <div className=".patient-table-container">
    <Table headers={tableHeaders} data={tableData}  itemsPerPageOptions={[5, 10, 15]} />
     
    </div>
   
    </div>
  );
 
}

export default PatientsList;
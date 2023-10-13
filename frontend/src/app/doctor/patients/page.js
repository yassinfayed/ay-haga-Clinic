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
  const tableHeaders = ['id','name','email','date of birth','gender', 'phone number','go to patient']; // Add a new column header

  // const initialValues = [
  //   ['John Doe', '0123456789', <Button text="View Details" onClick={() => console.log('Button clicked')} />],
  //   ['Jane Smith','0123456789', <Button text="View Details" onClick={() => console.log('Button clicked')} />],
  //   ['Alice Johnson', '0123456789', <Button text="View Details" onClick={() => console.log('Button clicked')} />],
  //   ['Bob Brown', '0123456789', <Button text="View Details" onClick={() => console.log('Button clicked')} />],
  //   ['Ella Wilson', '0123456789', <Button text="View Details" onClick={() => console.log('Button clicked')} />],
  //   ['David Lee', '0123456789', <Button text="View Details" onClick={() => console.log('Button clicked')} />],
  // ];

  // const[tableData, setTableData , filterTableData , sortTableData] = useFilter(tableHeaders, initialValues) ;
  const tabledata2 = useSelector(state => state.patientsReducer?.patients?.data)
  const tabledataU1 = useSelector(state => state.filterPatientsBasedOnUpcomingAppointmentsReducer?.patients?.data)
  const [name,setName] = useState({});
  const [upcoming,setUpcoming] = useState(false);

  const generateButton = (id) => {
    return (
      <div style={{ fontSize: '1px' }}>
        <Button text='view' variant='xs' onClick={() => window.location.replace(`/patient/${id}`)}></Button>
      </div>
    );
  };


  
  let tabledata = tabledata2?.map(item => {
    const { emergencyContact,id,_id,user,__v, ...rest } = item;
    rest.button = generateButton(_id)
    return rest;
  })

 
  const dispatch = useDispatch();
  useEffect(()=> {
    // dispatch(login("faridaAhmed","password123"))
    dispatch(viewPatients({...name}))
    

    // if()
  },[name])

  const handleClick = (e) => {
    console.log(e.target)
    if(e.target.checked=== true) {
      dispatch(filterPatientsBasedOnUpcomingAppointments())
      tabledata = tabledataU1?.map(item => {
        const { emergencyContact,id,healthRecords,_id,user,__v, ...rest } = item;
        rest.button = generateButton(_id)
        return rest;
      })

    }
    else{
      dispatch(viewPatients())
      tabledata = tabledata2?.map(item => {
        const { emergencyContact,id,healthRecords,_id,user,__v, ...rest } = item;
         rest.button = generateButton(_id)
        return rest;
      })
    }

  }

 
  return (
    <div >
      {/* <div className="div container-fluid" style={{ display: 'flex', alignItems: 'center' }}> */}
      <NavbarDoc />
      <div className="div container-fluid d-flex ">
      <div className="search-container">
      <input
        type="text"
        placeholder="Search For Patient"
        className="search-input"
        onChange={(e) =>{ 
          setName( {"name": e.target.value } ); 
        // handleClick(e)
      }
      } 
      />
      {/* <Button text="Search"  className="search-button"/> */}
      </div>

      <div className="div container-fluid" style={{ display: 'flex', alignItems: 'center' }}>
  <label htmlFor="upcomingAppointments">Upcoming Appointments</label>
  <input
   onClick={(e) => {
    setUpcoming(e.target.checked)
    handleClick(e)
    
   }
   }
   type="checkbox" id="upcomingAppointments" name="upAp" value="upAp" style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
</div>
</div>
      {/* </div> */}


    <div className=".patient-table-container">
    <Table headers={tableHeaders} data={tabledata}  itemsPerPageOptions={[5, 10, 15]} />
     
    </div>
   
    </div>
  );
 
}

export default PatientsList;
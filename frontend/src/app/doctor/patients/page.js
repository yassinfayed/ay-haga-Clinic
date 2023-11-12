'use client'
import './page.css' ;
import React, { useEffect, useState } from 'react';
import { Table} from '../../../../components/Table'; 
import { Button} from '../../../../components/Button'; 
import { useDispatch, useSelector } from 'react-redux';
import { viewPatients } from '@/app/redux/actions/patientsActions';
import { uploadHealthRecords } from '@/app/redux/actions/patientActions';
import Image from 'next/image';
import NavbarDoc from "../../../../components/NavbarDoc";
import FooterDoc from "../../../../components/FooterDoc";



function PatientsList() {
  const tableHeaders = ['name','email','birth date','gender', 'phone number','appointment date', 'view', 'upload health records']; 

  const tabledata2 = useSelector(state => state.patientsReducer?.patients?.data)
  const tabledataU1 = useSelector(state => state.filterPatientsBasedOnUpcomingAppointmentsReducer?.patients?.data)
  const [name,setName] = useState({});
  const [upcoming,setUpcoming] = useState({});



  

  const generateButton = (id) => {
    return (
      <div style={{ fontSize: '1px' }}>
        <Button text={<Image src='/show.svg' height={35} width={35} className="rounded-circle"/>} variant='xs' color='light' className="rounded-circle" onClick={() => window.location.replace(`/patient/${id}`)}></Button>
      </div>
    );
  };

  let tabledata = tabledata2?.map(item => {
    return {
      name: item.name,
      email: item.email,
      birthDate: item.dateOfBirth, // Adjust the dateOfBirth key
      gender: item.gender,
      phoneNumber: item.mobileNumber,
      appointmentDate: item.appointmentDate,
      view: generateButton(item._id), // Adjust the ID key
      upload : <>
      <div className="d-flex">
      <input className="form-control" type="file" onChange={(e) => handleFileChange(e, item._id)} id="formFile"/>
      <Button text="Submit" className="w-60 ms-5" variant={'sm'} onClick={() => handleFileUpload(item._id)}></Button>   
      </div>
    </>
    };
  });

 
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(viewPatients({...name,...upcoming}))
  },[name,upcoming])

  const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (e, patientId) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setSelectedFile({ patientId, file });
  }
};

const handleFileUpload = (patientId) => {
  if (selectedFile) {
    const { file } = selectedFile;
    const formData = new FormData();
    formData.append('image', file);

    dispatch(uploadHealthRecords(formData, patientId));
  }
};

  const handleClearFilters = () => {
    setName(null);
    setUpcoming(null);
  }
 
  return (
    <>
    <NavbarDoc/>
    <div className='m-5 global-text'>
      <h3 className='my-1 mt-0 text-center text-title'>Patients</h3>
      <div className='underline-Bold mx-auto mb-5'></div>
      <div className='row flex align-items-center justify-content-start bg-light p-2 pe-0 m-3 rounded border'>
        <div className="col-md-1">
          <Image src='/filter.svg' height={30} width={30} className=""/>
        </div>  
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Patient Name"
            className="form-control my-auto"
            onChange={(e) =>{setName( {"name": e.target.value } );}} />
        </div>
        <div className="col-md-3 container-fluid" style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="upcomingAppointments">Upcoming Appointments</label>
          <input
            onChange={(e) => {setUpcoming(e.target.checked ? {status:'Upcoming'}:{})}}
            type="checkbox" id="upcomingAppointments" name="upAp" value="upAp" 
            style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
        </div>
        <div className="col-md-3 ms-auto">
          <Button text="Clear Filters" className="w-60 ms-5" onClick={handleClearFilters} variant={'md'}></Button>       
        </div>
      </div>
    <div className=".patient-table-container me-3">
      <Table headers={tableHeaders} data={tabledata}  itemsPerPageOptions={[5, 10, 15]} />
    </div>
    </div>
    <FooterDoc/>
    </>
  );
 
}

export default PatientsList;

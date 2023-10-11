"use client"
import React from 'react'
import {Table} from '../../../../components/Table';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatientAppointments } from '@/app/redux/actions/patientActions';
import { login } from '@/app/redux/actions/authActions';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { Button } from '../../../../components/Button';

function appointments() {


  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const appointmentsData = useSelector((state) => state.viewPatientsAppointmentsReducer.appointments);

  const formatDateToISOString = (date) => {
    if (!date) return ''; // Return an empty string if date is falsy
    const utcDate = new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ));
    const selected =  utcDate.toUTCString();
    return selected;
  };

  useEffect(() => {

    

    const queryObj = {
      date: formatDateToISOString(selectedDate),
      status: selectedStatus,
    };

    const filteredQueryObj = Object.keys(queryObj).reduce((acc, key) => {
      if (queryObj[key] !== '') {
        acc[key] = queryObj[key];
      }
      return acc;
    }, {});

    dispatch(login('omarDoe','password123'));

    dispatch(getPatientAppointments(filteredQueryObj));
  }, [dispatch,selectedDate, selectedStatus]);


  const apps = useMemo(() => {
    if (appointmentsData && appointmentsData.data) {
      console.log(appointmentsData)
      console.log(appointmentsData.data);
      return appointmentsData.data.map((value) => ({
        date: new Date(value.date).toLocaleDateString(), 
        doctorname: value.doctorId.name,
        status: value.status,
      }));
    }
    return [];
  }, [appointmentsData]);


  console.log(apps);


  const handleClearFilters = () => {
    setSelectedDate(null);
    setSelectedStatus(null);
  }

  


      const headers = ['Date', 'Doctor Name', 'Status'];


      return(
        <div className="container-fluid">
          <Navbar></Navbar>
        <div className="rows">
            <h3 className='my-4'>My Appointments</h3>
            <div className="row my-3">
            <div className="status-filter">
          <select onChange={handleStatusChange} className='col-lg-2 mx-lg-1'>
            <option value="">Filter by status</option>
            <option value="Finished">Finished</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Missed">Missed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
            <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Filter by date"
          className='col-lg-2 mx-lg-3 my-3'
        />
        <Button text="Clear Filters" className="col-lg-2 col-md-3" onClick={handleClearFilters}></Button>
          </div>
        </div>
        <Table headers={headers} data={apps ? apps : []}/>
        <Footer></Footer>
        </div>
      )
      
      
}

export default appointments;
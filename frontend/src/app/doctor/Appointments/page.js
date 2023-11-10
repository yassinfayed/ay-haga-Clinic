"use client"
import React from 'react'
import {Table} from '../../../../components/Table';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '@/app/redux/actions/authActions';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { Button } from '../../../../components/Button';
import { getDoctorAppointments } from '@/app/redux/actions/doctorActions';
import NavbarDoc from "../../../../components/NavbarDoc";
import FooterDoc from "../../../../components/FooterDoc";
import Image from 'next/image';

function docappointments() {


  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const appointmentsData = useSelector((state) => state.viewDoctorsAppointmentsReducer.appointments);
  const isLoading = useSelector((state) => state.viewDoctorsAppointmentsReducer.loading);

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

  async function fetchData() {
  
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
  
    dispatch(getDoctorAppointments(filteredQueryObj));
  }
  
  useEffect(() => {
    fetchData();
  }, [dispatch, selectedDate, selectedStatus]);
  


  const apps = useMemo(() => {
    if (appointmentsData && appointmentsData.data) {
      return appointmentsData.data.map((value) => ({
        date: new Date(value.date).toLocaleDateString(), 
        patientname: value.patientId?.name,
        status: value.status,
      }));
    }
    return [];
  }, [appointmentsData]);

  const handleClearFilters = () => {
    setSelectedDate(null);
    setSelectedStatus(null);
  }

      const headers = ['Date', 'Patient Name', 'Status'];
return(
    <div className='global-text'>
      <NavbarDoc/>
        <div className="container-fluid m-5">
        <div className="rows">
            <h3 className='my-1 mt-0 text-center text-title'>My Appointments</h3>
            <div className='underline-Bold mx-auto mb-5'></div>
            <div className='row flex align-items-center justify-content-start bg-light p-2 pe-0 m-3 rounded border'>
                  <div className="col-md-1">
                  <Image src='/filter.svg' height={30} width={30} className=""/>
                  </div>   
                  <div className="status-filter col-md-3">
                    <select onChange={handleStatusChange} className='w-100 form-control text-muted p-2'>
                      <option value="">Filter by status</option>
                      <option value="Finished">Finished</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Missed">Missed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="col-md-4 text-muted p-2">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Filter by date"
                      className='form-control'
                    />
                  </div>
                  <div className="col-md-3 ms-auto">
                    <Button text="Clear Filters" className="w-60 ms-5" onClick={handleClearFilters} variant={'md'}></Button>       
                  </div>
              </div>
        </div>
        <Table headers={headers} data={apps ? apps : []}/>
      </div>
      <FooterDoc/>
    </div>
      )
      
}

export default docappointments;

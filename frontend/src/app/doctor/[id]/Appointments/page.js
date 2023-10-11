"use client"
import React from 'react'
import {Table} from '../../../../../components/Table';
import Navbar from '../../../../../components/Navbar';
import Footer from '../../../../../components/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

function appointments() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  

    const dummyAppointments = [
        {
          date: '2023-10-01',
          patientId: 'Patient1',
          doctorId: 'Doctor1',
          status: 'Finished',
        },
        {
          date: '2023-10-02',
          patientId: 'Patient2',
          doctorId: 'Doctor2',
          status: 'Upcoming',
        },
        {
          date: '2023-10-03',
          patientId: 'Patient3',
          doctorId: 'Doctor3',
          status: 'Finished',
        },
        {
          date: '2023-10-04',
          patientId: 'Patient4',
          doctorId: 'Doctor4',
          status: 'Upcoming',
        },
        {
          date: '2023-10-05',
          patientId: 'Patient5',
          doctorId: 'Doctor5',
          status: 'Finished',
        },
        {
          date: '2023-10-06',
          patientId: 'Patient6',
          doctorId: 'Doctor6',
          status: 'Upcoming',
        },
        {
          date: '2023-10-07',
          patientId: 'Patient7',
          doctorId: 'Doctor7',
          status: 'Finished',
        },
        {
          date: '2023-10-08',
          patientId: 'Patient8',
          doctorId: 'Doctor8',
          status: 'Upcoming',
        },
        {
          date: '2023-10-09',
          patientId: 'Patient9',
          doctorId: 'Doctor9',
          status: 'Finished',
        },
        {
          date: '2023-10-10',
          patientId: 'Patient11',
          doctorId: 'Doctor11',
          status: 'Upcoming',
        },
        {
            date: '2023-10-10',
            patientId: 'Patient12',
            doctorId: 'Doctor12',
            status: 'Upcoming',
          },
          {
            date: '2023-10-10',
            patientId: 'Patient13',
            doctorId: 'Doctor13',
            status: 'Upcoming',
          },
          {
            date: '2023-10-10',
            patientId: 'Patient14',
            doctorId: 'Doctor14',
            status: 'Upcoming',
          },
          {
            date: '2023-10-10',
            patientId: 'Patient15',
            doctorId: 'Doctor15',
            status: 'Upcoming',
          },
          {
            date: '2023-10-10',
            patientId: 'Patient16',
            doctorId: 'Doctor10463',
            status: 'Upcoming',
          },
          {
            date: '2023-10-10',
            patientId: 'Patient1134',
            doctorId: 'Doctor1567650',
            status: 'Upcoming',
          },
          {
            date: '2023-10-10',
            patientId: 'Patient13450',
            doctorId: 'Doctor156570',
            status: 'Upcoming',
          },
          {
            date: '2023-10-10',
            patientId: 'Patient134630',
            doctorId: 'Doctor124620',
            status: 'Upcoming',
          },
      ];

      const headers = ['Date', 'Patient ID', 'Doctor ID', 'Status'];


      return(
        <div className="container-fluid">
        <Navbar></Navbar>
        <div className="rows">
            <h3 className='my-4'>My Appointments</h3>
            <div className="row my-3">
            <div className="status-filter">
          <select onChange={handleStatusChange} className='col-lg-1 mx-lg-1'>
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
          className='col-lg-1 mx-lg-3 my-3'
        />
          </div>
        </div>
        <Table headers={headers} data={dummyAppointments}/>
        <Footer></Footer>
        </div>
      )
      
      
}

export default appointments;
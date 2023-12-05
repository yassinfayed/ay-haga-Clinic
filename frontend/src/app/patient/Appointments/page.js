"use client"
import React from 'react'
import { Table } from '../../../../components/Table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatientAppointments } from '@/app/redux/actions/patientActions';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { Button } from '../../../../components/Button';
import Image from 'next/image';
import Spinner from '../../../../components/Spinner';

function appointments() {

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const headers = ['Date', 'Doctor Name', 'Status'];

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    setSelectedDate(e.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const appointmentsData = useSelector((state) => state.viewPatientsAppointmentsReducer.appointments);
  const isLoading = useSelector((state) => state.viewPatientsAppointmentsReducer.loading);

  async function fetchData() {

    const queryObj = {
      date: selectedDate,
      status: selectedStatus,
    };

    const filteredQueryObj = Object.keys(queryObj).reduce((acc, key) => {
      if (queryObj[key] !== '') {
        acc[key] = queryObj[key];
      }
      return acc;
    }, {});

    dispatch(getPatientAppointments(filteredQueryObj));
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, selectedDate, selectedStatus]);


  const apps = useMemo(() => {
    if (appointmentsData && appointmentsData.data) {
      return appointmentsData.data.map((value) => ({
        date: new Date(value.date).toLocaleString(),
        doctorname: value.doctorId.name,
        status: value.status,
      }));
    }
    return [];
  }, [appointmentsData]);

  const handleClearFilters = () => {
    setSelectedDate(null);
    setSelectedStatus(null);
  }

  return (
    <div className='m-2'>
      <div className="container my-3">
        <h3 className='my-1 mt-0 text-center text-title'>My Appointments</h3>
        <div className='underline-Bold mx-auto mb-5'></div>

        {!isLoading && apps && apps.length > 0 &&
          <>
            <div className="row my-3">
              <div className='row flex align-items-center justify-content-start bg-light p-2 pe-0 m-3 rounded border'>
                <div className="col-md-1">
                  <Image src='/filter.svg' height={30} width={30} className="" />
                </div>
                <div className="status-filter col-md-3">
                  <select onChange={handleStatusChange} className='w-100 form-control text-muted p-2'>
                    <option value="">Filter by status</option>
                    <option value="Completed">Completed</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Missed">Missed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Rescheduled">Rescheduled</option>
                  </select>
                </div>
                <div className="col-md-4 text-muted p-2">
                  <input type="datetime-local" value={selectedDate} onChange={handleDateChange} placeholder="Filter by date/time" />
                </div>
                <div className="col-md-3 ms-auto">
                  <Button text="Clear Filters" className="w-60 ms-5" onClick={handleClearFilters} variant={'md'}></Button>
                </div>
              </div>
            </div>

            <Table headers={headers} data={apps ? apps : []} />
          </>
        }
        {!isLoading && apps && apps.length === 0 &&
          <div className="w-100 text-center"> 
            <h1>No appointments available at this time!</h1>
          </div>
        }

        {isLoading &&
          <Spinner />
        }
      </div>
    </div>
  )


}

export default appointments;

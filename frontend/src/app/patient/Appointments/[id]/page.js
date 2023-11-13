"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewDoctorDetails } from '../../../redux/actions/doctorActions';
import ReserveModal from '../../../../../components/ReserveModal';
import { Card } from "../../../../../components/Card";
import { makeOrder } from "@/app/redux/actions/paymentActions";
import { Button } from "react-bootstrap";

export default function AvailableDates({ params }) {
    const dispatch = useDispatch();
    const doctor = useSelector(state => state.doctorReducer.doctor);
    const [modalShow, setModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        dispatch(viewDoctorDetails(params.id));
    }, [dispatch, params.id]);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
        });
    };
    const handleReserve = (date) => {
        setSelectedDate(date);
        setModalShow(true);
    };

  const reservePaymentHandler = (price,paymentMethod,fm) => {
    dispatch(makeOrder({
      date: selectedDate,
      doctor: params.id,
      price,
      paymentMethod,
      reserve: true
    },fm))
  };


    return (
        <div className="m-5 p-5 bg-white shadow-md rounded-lg">
            <div className="text-lg font-semibold mb-4">Available Dates and Times</div>
            <div className="flex flex-col items-center gap-4">
                {doctor && doctor.availableDates.map((date, index) => (
                    <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                        <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-300 rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                            <div className="text-2xl font-semibold text-blue-500">{formatDate(date)}</div>
                            <button 
                                className="btn btn-primary hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 transition duration-150"
                                onClick={() => handleReserve(date)}
                            >
                                Reserve
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {modalShow && (
                <ReserveModal
                    title={`Reserve an appointment with Dr. ${doctor.name}`}
                    subheader={`Date: ${formatDate(selectedDate)}`}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    id={doctor._id}
                    hourlyRate={doctor.HourlyRate}
                    handler={reservePaymentHandler}
                />
            )}
        </div>
    );
}

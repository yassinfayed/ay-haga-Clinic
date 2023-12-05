"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewDoctorDetails } from '../../../redux/actions/doctorActions';
import ReserveModal from '../../../../../components/ReserveModal';
import { Card } from "../../../../../components/Card";
import { makeOrder } from "@/app/redux/actions/paymentActions";
import { Button, Image } from "react-bootstrap";
import Spinner from '../../../../../components/Spinner';

export default function AvailableDates({ params }) {
    const dispatch = useDispatch();
    const doctor = useSelector(state => state.doctorReducer.doctor);
    const isLoading = useSelector(state => state.doctorReducer.loading);
    const [modalShow, setModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [resSuccess, setResSuccess] = useState(false);

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

    const reservePaymentHandler = (price, paymentMethod, fm) => {
        dispatch(makeOrder({
            date: selectedDate,
            doctor: params.id,
            price,
            paymentMethod,
            reserve: true
        }, fm));

        setResSuccess(true);
    };


    return (
        <div className="m-5 p-5 bg-white shadow-md rounded-lg">

            {!isLoading && doctor && doctor.availableDates.length > 0 &&
                <>
                    <h1 className='my-3'>Available Dates and Times</h1>
                    <div className='container-fluid'>
                        <div className="row g-2">
                            {doctor && doctor.availableDates.map((date, index) => (
                                <div key={index} className="col-12 col-md-6 col-lg-4">
                                    <div className='card'>
                                        <div className="card-body">
                                            <div className="d-flex flex-row">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='me-1' style={{ width: 22, height: 22 }}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                                </svg>

                                                {formatDate(date)}
                                            </div>
                                            <div className='w-100 text-end mt-3'>
                                                <button
                                                    className="btn btn-primary hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 transition duration-150"
                                                    onClick={() => handleReserve(date)}
                                                >
                                                    Reserve
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </>

            }

            {
                !isLoading && doctor && doctor.availableDates.length === 0 &&
                <div className='w-100 text-center'>
                    <h1>No appointments available at this time!</h1>
                </div>
            }

            {
                isLoading &&
                <Spinner />
            }

            {modalShow && (
                <ReserveModal
                    title={`Reserve an appointment with Dr. ${doctor.name}`}
                    subheader={`Date: ${formatDate(selectedDate)}`}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    id={doctor._id}
                    hourlyRate={doctor.HourlyRate}
                    handler={reservePaymentHandler}
                    success={resSuccess}
                />
            )}
        </div>
    );
}

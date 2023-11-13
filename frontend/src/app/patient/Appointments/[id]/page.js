"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewDoctorDetails } from '../../../redux/actions/doctorActions';
import ReserveModal from '../../../../../components/ReserveModal';

export default function AvailableDates({ params }) {
    const dispatch = useDispatch();
    const doctor = useSelector(state => state.doctorReducer.doctor);
    const [modalShow, setModalShow] = useState(false); // State to control modal visibility
    const [selectedDate, setSelectedDate] = useState(null); // State to store selected date

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
        setSelectedDate(date); // Set the selected date
        setModalShow(true); // Show the modal
    };

    function DateCardList() {
        return (
            <div className="flex flex-col items-center gap-4">
                {doctor && doctor.availableDates.map((date, index) => (
                    <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                        <div className="flex flex-col items-center gap-2 bg-white shadow-md rounded-lg p-4">
                            <div className="text-lg font-semibold">{formatDate(date)}</div>
                            <button className="btn btn-primary" onClick={() => handleReserve(date)}>Reserve</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="m-5 p-5 bg-white shadow-md rounded-lg">
            <div className="text-lg font-semibold mb-4">Available Dates and Times</div>
            <DateCardList />
            {modalShow && (
                <ReserveModal
                    title={`Reserve an appointment with Dr. ${doctor.name}`}
                    subheader={`Date: ${formatDate(selectedDate)}`}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    id={doctor._id}
                />
            )}
        </div>
    );
}

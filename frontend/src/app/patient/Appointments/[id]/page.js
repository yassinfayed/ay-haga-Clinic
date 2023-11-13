"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewDoctorDetails } from "../../../redux/actions/doctorActions";
import { Card } from "../../../../../components/Card";
import { Button } from "../../../../../components/Button";

export default function AvailableDates({ params }) {
  const dispatch = useDispatch();
  const doctor = useSelector((state) => state.doctorReducer.doctor);

  useEffect(() => {
    dispatch(viewDoctorDetails(params.id));
  }, [dispatch, params.id]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
    })} at ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleReserve = (date) => {
    console.log(`Reserving for: ${date}`);
  };

  function DateCardList() {
    return (
      <div className="flex flex-col items-center gap-4">
        {doctor && doctor.availableDates.map((date, index) => (
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2" key={index}>
            <Card 
              title={formatDate(date)}
              className="shadow-lg rounded-lg"
              buttonTrue
              buttonText="Reserve"
              onClickButton={() => handleReserve(date)}
              buttonClass="mt-2 self-end"
            >
              {}
            </Card>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="m-5 p-5 bg-white shadow-md rounded-lg">
        <div className="text-lg font-semibold mb-4">
          Available Dates and Times
        </div>
        <DateCardList />
      </div>
    </>
  );
}

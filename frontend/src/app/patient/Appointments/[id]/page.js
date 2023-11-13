"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewDoctorDetails } from "../../../redux/actions/doctorActions";
import { Card } from "../../../../../components/Card";
import { makeOrder } from "@/app/redux/actions/paymentActions";
import { Button } from "react-bootstrap";

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
    dispatch(makeOrder({
      date,
      doctor: params.id,
      price :150,
      paymentMethod: "wallet",
      reserve: true
    }))
  };

  console.log(doctor?.availableDates)

  function DateCardList() {
    return (
      <div className="flex flex-col items-center gap-4">
        {doctor && doctor.availableDates.map((date, index) => (
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2" key={index}>
           <label>{date}</label>

           <Button onClick={()=> {
            handleReserve(date)
           }} >   Reserve</Button>
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

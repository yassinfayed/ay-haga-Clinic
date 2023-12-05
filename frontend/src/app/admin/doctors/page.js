"use client"
import React, { useEffect } from 'react';
import {getDoctorsForPatientAction} from '../../redux/actions/doctorActions'
import { useDispatch, useSelector } from 'react-redux';
import DoctorsPage from '../../../../components/DoctorsPage';
import Spinner from "../../../../components/Spinner";

export default function Doctors() {
  
    const dispatch=useDispatch();
    const doctors=useSelector(state=>state.getDrsForPatientsReducer.doctors);
    const doctorsisLoading=useSelector(state=>state.getDrsForPatientsReducer.loading);
    const isLoading=useSelector(state=>state.removeUserReducer.loading);

    useEffect(()=>{
      dispatch(getDoctorsForPatientAction());
    },[isLoading])

  return (
    <>
      <h3 className='my-1 mt-0 text-center text-title'>Doctors</h3>
      <div className='underline-Bold mx-auto mb-5'></div>
   
  {doctorsisLoading ? <Spinner/> : <DoctorsPage doctors={doctors} admin={true} />}
    </>
  );
}

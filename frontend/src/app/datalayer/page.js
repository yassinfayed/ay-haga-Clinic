"use client"
import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { getDoctorsForPatientAction } from '../redux/actions/doctorActions';

const Home = () => {
   const dispatch = useDispatch();
  //  dispatch(login("omarDoe","password123"))
  // dispatch(getDoctorsForPatientAction({}))
  const selector = useSelector(state => state.getDrsForPatientsReducer.doctors)
  
   
   useEffect(()=> {
    dispatch(getDoctorsForPatientAction({}))
    

   }

   ,[dispatch])

  return (
  
      <div>
        <h1>Dr List</h1>
        <ul>
          {selector?.data?.map((medicine, index) => (
            <li key={index}>{medicine.name}</li>
          ))}
        </ul>
      </div>
  )
}

export default Home
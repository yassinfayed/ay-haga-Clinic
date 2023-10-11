"use client";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { addFamilyMembers } from "../redux/actions/FamilyMembersAction";
import { viewFamilyMembers } from "../redux/actions/FamilyMembersAction";
import { viewPatients } from "../redux/actions/patientsActions";
import { viewDoctorDetails } from "../redux/actions/doctorActions";
import { viewPrescriptionsDetails } from "../redux/actions/prescriptionsActions";
import { viewALLPrescriptions } from "../redux/actions/prescriptionsActions";
import { getAllUsers } from "../redux/actions/userActions";
// import {filterPatientsBasedOnUpcomingAppointments} from '../redux/actions/patientsActions';

const Home = () => {
  const dispatch = useDispatch();
  dispatch(login("omarDoe", "password123")); //admin :sysadmin pass:pass1234/ patient : omarDoe pass:password123
  // dispatch(login("sysadmin", "pass1234")); //admin :sysadmin pass:pass1234/ patient : omarDoe pass:password123
  //  const selector = useSelector(state => state.loginReducer.user)
  //  console.log(selector)
  //  console.log(selector)
  // dispatch(addFamilyMembers({
  //   name: "Farida",
  //   nationalId: "3021026010fr0377",
  //   age: 21,
  //   gender: "female",
  //   relationToPatient: "child"
  // }))

  // dispatch(viewFamilyMembers({
  // }))

  // dispatch(filterPatientsBasedOnUpcomingAppointments({}));
  // const consoleSelector =useSelector(state=>state.addFamilyMembersReducer)
  // console.log(consoleSelector);
  /*useEffect(() => {
    // Define your queryObj for searching by name, e.g., { name: "John" }
    const queryObj = { name: {"eq":"John Doe"}};
    dispatch(viewPatients(queryObj));
  }, [dispatch]);*/

  // useEffect(() => {
  //   const queryObj = {doctorId:"60f3451f4c54a60dabc23f08",
  //   filled_unfilled:
  //   true,
  //   prescriptionDate: "2023-10-02T10:15:00.000Z"};
  //   dispatch(viewALLPrescriptions(queryObj));
  // }, [dispatch]);

  return (
    <div>
      {/* <h1 dr={selector}>Testing</h1> */}

      <h1></h1>
    </div>
  );
};
const DoctorDetails = () => {
  const dispatch = useDispatch();

  // Login user (if not already logged in)
  useEffect(() => {
    dispatch(login("sysadmin", "pass1234"));
    dispatch(getAllUsers());
    // dispatch(login("farida", "password1234"));
    // dispatch(viewPatients({}));
  }, [dispatch]);

  // View doctor details
  // useEffect(() => {
  //   // Replace '123' with the actual doctor ID you want to view
  //   dispatch(viewDoctorDetails("652009c012ae3a1d40695bfd"));
  // }, [dispatch]);

  //viewPrescrDeatils
  /*useEffect(() => {
    // Replace '123' with the actual doctor ID you want to view
   // dispatch(viewPrescriptionsDetails("651ebd0096b878c7981c2a84"));
  }, [dispatch]);*/

  // Selector example to access state
  const doctor = useSelector((state) => state.doctorReducer.doctor);
  const prescription = useSelector(
    (state) => state.prescriptionReducer.prescription
  );

  return (
    <div>
      <h1>Doctor Details</h1>
      {doctor ? (
        <div>
          <p>Name: {doctor.name}</p>
          <p>email: {doctor.email}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading doctor details...</p>
      )}
      <h1>Prescription Deatils</h1>
      {prescription ? (
        <p>instructions:{prescription.instructions}</p>
      ) : (
        <h1>Loading presc details</h1>
      )}
      ;
    </div>
  );
};

export default DoctorDetails;

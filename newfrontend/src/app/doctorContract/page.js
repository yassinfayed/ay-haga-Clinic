'use client'

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { doctorViewContract, doctorAcceptContract, rejectDoctor } from "../redux/actions/doctorActions";
import { logout } from '@/app/redux/actions/authActions';
import { Button } from '@tremor/react';

const ContractPage = () => {
  const dispatch = useDispatch();
  let doctor;
    if (localStorage) {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        doctor = userInfo?.data.user.doctor;
    }
 
  let userId;
  let doctorId;
  let userInfo;

  const doctorContract = useSelector((state) => state.doctorViewContractReducer.contract);
  const docStatus = doctor?.employmentContract?.status;

  console.log(doctor)

  if (localStorage) {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
    userId = userInfo?.data.user._id;
    doctorId = userInfo?.data.user.doctor?._id;
  }

  const handleAccept = (e) => {
    e.preventDefault();
    dispatch(doctorAcceptContract(userId));
    setTimeout(() => {
        window.history.pushState({},"",'doctor/profile')
        window.location.reload()
      }, 1000);
  };

  const handleReject = (e) => {
    e.preventDefault();
    dispatch(rejectDoctor(doctorId));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

    useEffect(() => {
    dispatch(doctorViewContract(userId));
  }, [dispatch, doctorContract]);

  return (
    <div>
        {/* add header here  with logo & logout*/}
    {docStatus === 'Pending' ? (
        <div className="container mx-auto my-5 p-16">
        <h1 style={{
                textAlign: "center",
                fontSize: "2rem",
                marginBottom: "2px",
                fontWeight: "bold",
            }} className="text-blue-500 text-center font-bold">Employment Contract</h1>
        <h1 style={{
            textAlign: "center",
            fontSize: "1.5rem",
            marginBottom: "16px",
            fontWeight: "500",}} > Harmony Clinic</h1>
        <div className='flex justify-center items-center my-4'><hr className='w-1/2'/></div>
        <div className="prof h-400 overflow-hidden  rounded-xl p-10">
        <h4 className='text-blue-500 font-semibold'>Contract Overview</h4>
            <p>
                <strong>This employment contract outlines the terms and conditions</strong> of employment for doctors at XClinics. It includes details on job responsibilities, work hours, compensation, and the terms of employment termination.
            </p>
            <br />
            
            <h4 className='text-blue-500 font-semibold'>Responsibilities</h4>
            <p>
                Doctors are expected to provide the <strong>highest standard</strong> of medical care to our patients and adhere to the medical and <strong>ethical guidelines</strong> set forth by the clinic which include:
                <br />
                <strong>Providing </strong>direct patient care & administering medications and treatments, <strong>Maintaining</strong> accurate patient records, <strong>Assisting</strong> with patient education and support,
                and <strong>Collaborating</strong> with other healthcare professionals.
            </p>
            <br />

            <h4 className='text-blue-500 font-semibold'>Compensation and Benefits</h4>
            <p>
                Employee will be compensated an <strong>hourly rate of {doctorContract?.hourlyRate}</strong> which will be subject to a <strong>{doctorContract?.clinicMarkUp * 100}% clinic markup</strong>.
                <br />
                Our employees will have access to <strong>healthcare benefits</strong>, including medical, dental, and vision insurance, as per the Employee Benefits Package provided.
            </p>
            <br />

            <h4 className='text-blue-500 font-semibold'>Work Hours and Vacation</h4>
            <p>
                Regular work hours will be <strong>Sunday through Thursday, 10:00 AM to 7:00 PM.</strong>
                <br />
                Employees are entitled to <strong>15 paid vacation days per year</strong>, subject to the clinic's vacation policy.
            </p>
            <br />

            <h4 className='text-blue-500 font-semibold'>Confidentiality and Non-Compete</h4>
            <p>
                Employee agrees to maintain the <strong>confidentiality</strong> of all patient records and clinic-related information <strong>during and after employment</strong>.
                <br />
                Employee <strong>shall not engage in any activities</strong> that directly compete with the services offered by any other Medical Clinic <strong>during the term of employment and for 12 months after termination</strong>.
            </p>
            <br />

            <h4 className='text-blue-500 font-semibold'>Termination</h4>
            <p>
                Either party may terminate this Contract with written <strong>notice of 30 days</strong>.
                <br />
                <strong>Grounds for termination</strong> may include but are not limited to violation of clinic policies, unsatisfactory performance, or any breach of this Contract.
            </p>
            <br />

            <h4 className='text-blue-500 font-semibold'>Acceptance</h4>
            <p>
                By accepting this contract, both parties <strong>acknowledge and agree to the terms and conditions</strong> outlined above.
            </p>
            <br />

            <p className='text-center mt-5 text-blue-500 py-5'>
                <strong>
                This contract is valid as of December 2023.
                </strong>
            </p>
            <hr />

            <div className='flex mt-5 justify-center'>
                <Button variant='secondary' size='md' onClick={(e) => handleReject(e)} className='px-3 py-2 bg-gray-800 text-white rounded mx-2 w-25'>Reject</Button>
                <Button variant='primary' size='md' onClick={(e) => handleAccept(e)} className='px-3 py-2 text-white rounded mx-2 w-25'>Accept</Button>
            </div>
        </div>
        </div>
    ) : docStatus === 'Waiting Admin' ? (
        <div className="text-center my-10">
        <h1 style={{
                textAlign: "center",
                fontSize: "2rem",
                marginBottom: "2px",
                fontWeight: "bold",
            }} className="text-blue-500 text-center font-bold mt-5">Awaiting Review</h1>
        <h1>Your application is currently under review</h1>
        <div className='flex justify-center items-center my-4'><hr className='w-1/2'/></div>
        <h5 className='font-semibold my-3'>Thank you for your patience, we will get back to you soon.</h5>
        </div>
    ) : docStatus === 'Admin rejected' ? (
        <div className="text-center my-10">
        <h1 style={{
                textAlign: "center",
                fontSize: "2rem",
                marginBottom: "2px",
                fontWeight: "bold",
            }} className="text-blue-500 text-center font-bold mt-5">Application Terminated</h1>
        <h1>We have terminated your application process.</h1>
        <div className='flex justify-center items-center my-4'><hr className='w-1/2'/></div>
        <h5 className='font-semibold my-3'>We regret to inform you that you have not passed our application screening phase. <br /> We wish you the best of luck in your future endeavors.</h5>
        </div>
    ) : docStatus === 'Doctor rejected' ? (
        <div className="text-center my-10">
        <h1 style={{
                textAlign: "center",
                fontSize: "2rem",
                marginBottom: "2px",
                fontWeight: "bold",
            }} className="text-blue-500 text-center font-bold mt-5">Application Terminated</h1>
        <h1>You have terminated your application process.</h1>
        <div className='flex justify-center items-center my-4'><hr className='w-1/2'/></div>
        <h5 className='font-semibold my-3'>Your application has been terminated as you have rejected our employment contract. <br /> We wish you the best of luck in your future endeavors.</h5>
        </div>
    ) : (null)}
    </div>

  );
};

export default ContractPage;

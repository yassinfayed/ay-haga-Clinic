'use client'
import React from 'react';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doctorViewContract, doctorAcceptContract, rejectDoctor } from "../../redux/actions/doctorActions";
import { removeUser } from "../../redux/actions/userActions";
import Image from 'react-bootstrap/Image';
import { logout } from '@/app/redux/actions/authActions';

const ContractPage = (props) => {
  const dispatch = useDispatch();
const {doctor}=props;

  let userId;
  let doctorId;
  let userInfo;

  const doctorContract = useSelector((state) => state.doctorViewContractReducer.contract);
  const rejectionisLoading=useSelector(state=>state.rejectDoctorReducer.loading);
  const docStatus = doctor?.employmentContract?.status;
  if (localStorage) {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
    userId = userInfo?.data.user._id;
    doctorId = userInfo?.data.user.doctor._id;
  }
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goBack = () => {
    history.back()
  }

  // useEffect(() => {
  //   //dispatch(doctorViewContract(userId));
  // }, [dispatch, doctorContract, rejectionisLoading]);
  

  const handleAccept = (e) =>{
    e.preventDefault();
   // console.log('accepted')
    dispatch(doctorAcceptContract(userId))
    window.history.pushState({},"",`/doctor/${doctorId}`)
	  window.location.reload()
  }

  const handleReject = (e) =>{
    e.preventDefault();
   //s console.log('rejected')
    dispatch(rejectDoctor(doctorId));
    // handleLogout()
  }

  const handleLogout= ()=>{
    dispatch(logout())
  }

  return (
      <div className='w-100'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light col-md-12">
          <div className="container d-flex flex-row justify-content-between align-items-center w-100">
          <Image src="/chevron.svg" width={20} height={20} className='mx-3 rotate-90 pt-2 pointer-cursor' onClick={goBack} ></Image>
            <div className="title col-md-6">
              <div className="logo"></div>
              <h1>
                <label className="navbar-brand">
                  XClinics
                </label>
              </h1>
            </div>
            <div className={`links&buttons collapse navbar-collapse col-md-6 show`}>
              <ul className=" navbar-nav container d-flex justify-content-end ms-auto">
                <li className="nav-item rounded ms-2">
                  <a className="btn btn-primary text-light mx-1" href="/guest/Login" onClick={()=> handleLogout()}>
                  Log Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div>
        {docStatus === 'pending' ? (
              <div className="page-div container justify-content-center align-items-center m-5 mx-auto">
              <h1 className="text-primary text-center"><strong>Employment Contract</strong></h1>
              <h3 className='text-center'>XClinics Clinic</h3>
              <div className='d-flex justify-content-center align-items-center'><hr className='w-50'/></div>
              <div className="card bg-light rounded shadow p-5 m-5 border-0 align-self-center mx-auto">
                <h4 className='text-primary text-semibold'>Contract Overview</h4>
                <p>
                  <strong>This employment contract outlines the terms and conditions</strong> of employment for doctors at XClinics. It includes details on job responsibilities, work hours, compensation, and the terms of employment termination.
                </p>
                <br />
      
                <h4 className='text-primary text-semibold'>Responsibilities</h4>
                <p>
                  Doctors are expected to provide the <strong>highest standard</strong> of medical care to our patients and adhere to the medical and <strong>ethical guidelines</strong> set forth by the clinic which include:
                  <br />
                  <strong>Providing </strong>direct patient care & administering medications and treatments, <strong>Maintaining</strong> accurate patient records, <strong>Assisting</strong> with patient education and support,
                  and <strong>Collaborating</strong> with other healthcare professionals.
                </p>
                <br />
      
                <h4 className='text-primary text-semibold'>Compensation and Benefits</h4>
                <p>
                  Employee will be compensated an <strong>hourly rate of {doctor?.data?.employmentContract?.hourlyRate}</strong> which will be subject to a <strong>{doctor?.data?.employmentContract?.clinicMarkUp * 100}% clinic markup</strong>.
                  <br />
                  Our employees will have access to <strong>healthcare benefits</strong>, including medical, dental, and vision insurance, as per the Employee Benefits Package provided.
                </p>
                <br />
      
                <h4 className='text-primary text-semibold'>Work Hours and Vacation</h4>
                <p>
                Regular work hours will be <strong>Sunday through Thursday, 10:00 AM to 7:00 PM.</strong>
                <br />
                Employees are entitled to <strong>15 paid vacation days per year</strong>, subject to the clinic's vacation policy.
                </p>
                <br />
      
                <h4 className='text-primary text-semibold'>Confidentiality and Non-Compete</h4>
                <p>
                Employee agrees to maintain the <strong>confidentiality</strong> of all patient records and clinic-related information <strong>during and after employment</strong>.
                <br />
                Employee <strong>shall not engage in any activities</strong> that directly compete with the services offered by any other Medical Clinic <strong>during the term of employment and for 12 months after termination</strong>.
                </p>
                <br />
      
                <h4 className='text-primary text-semibold'>Termination</h4>
                <p>
                Either party may terminate this Contract with written <strong>notice of 30 days</strong>.
                <br />
                <strong>Grounds for termination</strong> may include but are not limited to violation of clinic policies, unsatisfactory performance, or any breach of this Contract.
                </p>
                <br />
      
                <h4 className='text-primary text-semibold'>Acceptance</h4>
                <p>
                  By accepting this contract, both parties <strong>acknowledge and agree to the terms and conditions</strong> outlined above.
                </p>
                <br />
      
                <p className='text-center mt-5 text-primary'>
                  <strong>
                  This contract is valid as of November 2023.
                  </strong>
                </p>
              <hr />
              <div className='row mt-5'>
                <Button onClick={(e)=>handleReject(e)} variant='md' className='col-md-3 px-3 btn btn-dark mx-auto' color='dark'>Reject</Button>
                <Button onClick={(e)=>handleAccept(e)} variant='md' className='col-md-3 px-3 btn btn-primary mx-auto' color='primary'>Accept</Button>
              </div>
              </div>
            </div>) : (docStatus === 'waitingadmin' ? (
            <div>
              <br />
              <br />
              <h1 className="text-primary text-center mt-5"><strong>Awaiting Review</strong></h1>
              <h3 className='text-center'>Your application is currently under review</h3>
              <div className='d-flex justify-content-center align-items-center'><hr className='w-50'/></div>
              <h5 className='text-semi-bold text-center my-3'> Thank you for your patience, we will get back to you soon.</h5>
            </div>) : (docStatus==='Admin rejected' ? (
            <div>
              <br />
              <br />
              <h1 className="text-primary text-center mt-5"><strong>Application Terminated</strong></h1>
              <h3 className='text-center'>We have terminated your application process.</h3>
              <div className='d-flex justify-content-center align-items-center'><hr className='w-50'/></div>
              <h5 className='text-semi-bold text-center my-3'> We regret to inform you that you have not passed our application screening phase.
              <br /> We wish you the best of luck in your future endevours.</h5>
            </div>): (docStatus === 'Doctor rejected' && ( 
            <div>
              <br />
              <br />
              <h1 className="text-primary text-center mt-5"><strong>Application Terminated</strong></h1>
              <h3 className='text-center'>You have terminated your application process.</h3>
              <div className='d-flex justify-content-center align-items-center'><hr className='w-50'/></div>
              <h5 className='text-semi-bold text-center my-3'> Your application has been terminated as you have rejected our employment contract,
              <br /> We wish you the best of luck in your future endevours.</h5>
            </div>))
            ))}
      </div>
    </div>
  );
};

export default ContractPage;
"use client";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { viewDoctorDetails,doctorAddAvailableDate } from "../../redux/actions/doctorActions";
import { viewDoctorDetails } from "../../redux/actions/doctorActions";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../../components/Card";
import { Button } from "../../../../components/Button";
import { updateDoctor } from "../../redux/actions/doctorActions";
import NavbarDoc from "../../../../components/NavbarDoc";
import FooterDoc from "../../../../components/FooterDoc";
import ChangePassword from '../../../../components/ChangePassword';


export default function DoctorProfile({ params }) {
  const dispatch = useDispatch();

  const [edit, setedit] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newHourlyRate, setNewHourlyRate] = useState("");
  const [newAffiliation, setNewAffiliation] = useState("");
  const [newdoctor, setNewDoctor] = useState({});
  const [newDate, setNewDate] = useState("");
  const isLoading = useSelector((state) => state.doctorAddAvailableDateReducer.loading);
  useEffect(() => {
    dispatch(viewDoctorDetails(params.id));
  }, [dispatch, doctor, newEmail, newdoctor,isLoading]);

  const doctor = useSelector((state) => state.doctorReducer.doctor);

  let permission;
  let userInfo;

  if (localStorage) {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
  }
  if (userInfo) {
    permission = userInfo.data.user.role;
  }
  const id = params.id;
  const handleDateChange= (e) =>{
    console.log(e.target.value)
    setNewDate(e.target.value);
  }
  
  const handleAddDate = () => {
  console.log(newDate)
  dispatch(doctorAddAvailableDate({availableDate:newDate}));
  
  }

  function DateCardList() {
    return (
      <div className="card-list d-flex">
        {doctor.availableDates.map((date, index) => (
          <div className="w-25 p-2" key={index}>
            <Card
              title={date}
              subtitle=""
              text=""
              onClick={() => alert("Card Clicked")}
              onClickButton={() => alert("Button Clicked")}
              headerText={index + 1}
            />
          </div>
        ))}
      </div>
    );
  }
  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1.
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleHourlyRateChange = (e) => {
    setNewHourlyRate(e.target.value);
  };

  const handleAffiliationChange = (e) => {
    setNewAffiliation(e.target.value);
  };

  const handleSubmit = () => {
    let updatedDoctor = { ...newdoctor };
    if (newEmail) {
      updatedDoctor.email = newEmail;
    }

    if (newHourlyRate) {
      updatedDoctor.HourlyRate = newHourlyRate;
    }

    if (newAffiliation) {
      updatedDoctor.affiliation = newAffiliation;
    }
    setNewDoctor(updatedDoctor);
    dispatch(updateDoctor(updatedDoctor));
    dispatch(viewDoctorDetails(params.id));
    setNewEmail("");
    setNewHourlyRate("");
    setNewAffiliation("");
  };
  let date;
  if (doctor) {
    date = formatDateToDDMMYYYY(doctor.DateOfbirth);
  }

  return (
    <>
    <NavbarDoc/>
      {doctor ? (
        <div className="m-5">
          <div className=" d-flex mx-auto rounded shadow col-md-9 my-5">
          <div className=" w-25 border-end ">
            <div className="p-3 border-bottom mx-auto">
              <div>
                <Image src="/profile.svg" height={200} width={200} />
              </div>
            </div>
            <div className="mx-auto">
              <ChangePassword className='h-100 '/>
            </div>
          </div>
          <div className="p-5 w-75">
            <div className="border-bottom d-flex">
              <div className="w-75">
                <h1>{doctor.name}</h1>
                <p className="px-3 text-secondary">{doctor.speciality}</p>
              </div>
              <div className="w-25">
                {permission == "doctor" && (
                  <Button
                    text="Edit Information"
                    variant="small"
                    onClick={() => {
                      setedit(true);
                      console.log("new doctor", newdoctor);
                    }}
                  ></Button>
                )}
              </div>
            </div>
            <div className="p-2 border-bottom row">
              <div className="p-3 col-md-6">
              <div className="text-body-secondary fw-bold small p-3 ">
                Doctor Information
              </div>
                <div className="py-3 d-flex">
                  <span className="fw-bold w-25">
                    <Image src="/mail-dark.svg" height={25} width={25} />
                  </span>
                  {edit || <span className="w-50">{doctor.email}</span>}
                  <span className="w-50">
                    {!edit || (
                      <input
                        type="email"
                        className="form-control"
                        placeholder={doctor.email}
                        value={newEmail}
                        onChange={handleEmailChange}
                      />
                    )}
                  </span>
                </div>
                <div className="py-2 d-flex ">
                  <span className="fw-bold w-25 ">
                    <Image src="/birthday.svg" height={25} width={25} />
                  </span>
                  <span className="w-50">{date}</span>
                  <span className="w-50"></span>
                </div>
                <div className="py-2 d-flex ">
                  <span className="fw-bold w-25 ">
                    <Image src="/cart.svg" height={25} width={25} />
                  </span>
                  {edit || <span className="w-50">{doctor.HourlyRate}</span>}
                  <span className="w-50">
                    {!edit || (
                      <input
                        type="email"
                        className="form-control"
                        placeholder={doctor.HourlyRate}
                        value={newHourlyRate}
                        onChange={handleHourlyRateChange}
                      />
                    )}
                  </span>
                </div>
                <div className="py-2 d-flex ">
                  <span className="fw-bold w-25 ">
                    <Image src="/affiliation.svg" height={25} width={25} />
                  </span>
                  {edit || <span className="w-50">{doctor.affiliation}</span>}
                  <span className="w-50">
                    {!edit || (
                      <input
                        type="email"
                        className="form-control"
                        placeholder={doctor.affiliation}
                        value={newAffiliation}
                        onChange={handleAffiliationChange}
                      />
                    )}
                  </span>
                </div>
                <div className="py-2 d-flex">
                  <span className="fw-bold w-25">
                    <Image src="/education.svg" height={25} width={25} />
                  </span>
                  <span className="w-50">{doctor.educationalbackground}</span>
                  <span className="w-50"></span>
                </div>
              </div>

              <div>
                <div className="text-body-secondary fw-bold small p-3 ">
                  Available Dates
                </div>
                <div className='col-md-3'>
          <input type="datetime-local" id="appointmentdate" name="appointmentdate" 
             className='search-input'onChange={(e) => {handleDateChange(e)}}/>
        </div>
        <br></br>
        <Button text="Add Available Date" variant="xs" onClick={()=>handleAddDate()}></Button>
                <DateCardList />
              </div>
            </div>
            {!edit || (
              <div className="col-md-4 mx-auto">
                <Button
                  text="Cancel"
                  variant="small"
                  color="danger"
                  onClick={() => {
                    setedit(false);
                  }}
                  className='mx-1 my-2'
                ></Button>
                <Button
                  text="Submit"
                  variant="small"
                  onClick={() => {
                    handleSubmit();
                    setedit(false);
                  }}
                  className='mx-1 my-2'
                ></Button>
              </div>
            )}
              <div>
                <div className="text-body-secondary fw-bold small p-3 ">
                  Available Dates
                </div>
                <DateCardList />
              </div>
            
          </div>
        </div>
        </div>
      ) : (
        <div>hello</div>
      )}
      <FooterDoc/>
    </>
  );
}

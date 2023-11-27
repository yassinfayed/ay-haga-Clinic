"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../../components/Card";
import { Button } from "../../../../components/Button";
import NavbarDoc from "../../../../components/NavbarDoc";
import FooterDoc from "../../../../components/FooterDoc";
import ChangePassword from "../../../../components/ChangePassword";
import ContractPage from "../Contract/page";
import {
  viewDoctorDetails,
  doctorAddAvailableDate,
  updateDoctor,
  doctorViewContract,
} from "../../redux/actions/doctorActions";


export default function DoctorProfile({ params }) {
  
  const dispatch = useDispatch();

  let date;
  let permission;
  let userInfo;
  const id = params.id;

  const [edit, setEdit] = useState(false); // Updated variable name
  const [newEmail, setNewEmail] = useState("");
  const [newHourlyRate, setNewHourlyRate] = useState("");
  const [newAffiliation, setNewAffiliation] = useState("");
  const [newdoctor, setNewDoctor] = useState({});
  const [newDate, setNewDate] = useState("");
  const isLoading = useSelector(
    (state) => state.doctorAddAvailableDateReducer.loading
  );
  const doctor = useSelector((state) => state.doctorReducer.doctor);
  const doctorContract = useSelector(
    (state) => state.doctorViewContractReducer.contract
  );

  useEffect(() => {
    dispatch(viewDoctorDetails(params.id));
  }, [dispatch, id, newEmail, newdoctor, isLoading]);

  
  const docStatus = doctor?.employmentContract?.status;

  if (localStorage) {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
  }
  if (userInfo) {
    permission = userInfo.data.user.role;
  }
  if (doctor) {
    date = formatDateToDDMMYYYY(doctor.DateOfbirth);
  }

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year} `;
  }

  function formatDateToDDMMYYYYHHMM(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  const handleDateChange = (e) => {
    setNewDate(e.target.value);
  };

  const handleAddDate = () => {
    dispatch(doctorAddAvailableDate({ availableDate: newDate }));
  };

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


  function DateCardList() {
    return (
      <div className="card-list d-flex">
        {doctor.availableDates.map((date, index) => (
          <div className="w-25 p-2" key={index}>
            <Card
              subtitle=""
              text={<div className="text-semibold text-center text-primary">{formatDateToDDMMYYYYHHMM(date)}</div>}
              onClick={() => alert("Card Clicked")}
              onClickButton={() => alert("Button Clicked")}
              className='bg-white'
              headerText='Available'
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


  return (
    <div>
      {docStatus==="accepted" && (<div>
      <NavbarDoc />
      {doctor ? (
        <div className="m-5">
          <div className=" d-flex mx-auto rounded shadow col-md-9 my-5">
            <div className=" w-25 border-end ">
              <div className="image-container">
                <Image 
                  src="/profile.svg" 
                  alt="Profile"
                  layout="intrinsic"
                  width={200}
                  height={200}
                />
              </div>
              <div className="ps-4 py-2 d-flex  text-center border-bottom mx-auto">
                    <span className="fw-bold w-25 ">
                      <Image src="/dollar.svg" height={30} width={30} />
                    </span>
                    <span className="w-50 fs-4">{doctor?.user?.wallet}</span>
                   
                  </div>
              <div className="mx-auto">
                <ChangePassword className="h-100 " />
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
                        setEdit(true);
                        //console.log("new doctor", newdoctor);
                      }}
                    ></Button>
                  )}
                </div>
                
              </div>
              <div className="p-2 border-bottom row">
                <div className="p-3 col-md-6">
                  <div className="text-body-secondary fw-bold small">
                    Doctor Information
                  </div>
                  <hr className="w-50" />
                  <div className="py-2 d-flex">
                    <span className="fw-bold w-25">
                      <Image src="/mail-dark.svg" height={25} width={25} />
                    </span>
                    {edit || <span className="w-70">{doctor.email}</span>}
                    <span className="w-70">
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
                    <span className="w-70">{date}</span>
                  </div>
                  <div className="py-2 d-flex ">
                    <span className="fw-bold w-25 ">
                      <Image src="/cart.svg" height={25} width={25} />
                    </span>
                    {edit || <span className="w-70">{doctor.HourlyRate}</span>}
                    <span className="w-70">
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
                    {edit || <span className="w-70">{doctor.affiliation}</span>}
                    <span className="w-70">
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
                    <span className="w-70">{doctor.educationalbackground}</span>
                  </div>
                </div>
                <hr />
                {!edit || (
                <div className="col-md-8 row mx-auto">
                  <Button
                    text="Cancel"
                    variant="md"
                    color="dark"
                    onClick={() => {
                      setEdit(false);
                    }}
                    className="mx-1 my-2 col"
                  ></Button>
                  <Button
                    text="Submit"
                    variant="md"
                    onClick={() => {
                      handleSubmit();
                      setEdit(false);
                    }}
                    className="mx-1 my-2 col"
                  ></Button>
                </div>
              )}
                <div className="mt-3">
                  <div className="text-body-secondary fw-bold small">
                    Available Dates
                  </div>
                  <div className="w-50 mb-4">
                    <hr className="w-50" />
                  </div>
                  <div className=" row mx-auto">
                    <div className="col-md-6">
                    <input
                      type="datetime-local"
                      id="appointmentdate"
                      name="appointmentdate"
                      className="form-control"
                      onChange={(e) => {
                        handleDateChange(e);
                      }}
                    />
                    </div>
                    <Button
                      text="Add Available Date"
                      variant="xs"
                      onClick={() => handleAddDate()}
                      className='col-md-4'
                    ></Button>
                  </div>
                  <br></br>
                  <DateCardList />
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <FooterDoc />
      </div>)}
      {(docStatus!=='accepted') && <ContractPage doctor={doctor}/>}
    </div>
  );
}

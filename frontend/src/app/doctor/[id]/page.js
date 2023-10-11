"use client";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { login } from "../../redux/actions/authActions";
import { viewDoctorDetails } from "../../redux/actions/doctorActions";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../../components/Card";
import { Button } from "../../../../components/Button";
import { updateDoctor } from "../../redux/actions/doctorActions"; // Import your update action

export default function DoctorProfile({ params }) {
  // redux
  const dispatch = useDispatch();
  dispatch(login("faridaAhmed", "password123"));

  //states
  const [edit, setedit] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [newHourlyRate, setNewHourlyRate] = useState("");
  const [newAffiliation, setNewAffiliation] = useState("");
  const [newdoctor, setNewDoctor] = useState({});

  useEffect(() => {
    dispatch(viewDoctorDetails(params.id));
  }, [dispatch]);

  const doctor = useSelector((state) => state.doctorReducer.doctor);
  //CONTINUE PERMISSIONS
  let permission;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo) {
    permission = userInfo.data.user.role;
  }
  const id = params.id;

  function DateCardList() {
    return (
      <div className="card-list d-flex">
        {doctor.availableDates.map((date, index) => (
          <div className="w-25 p-2" key={index}>
            <Card
              title={date}
              subtitle=""
              text=""
              //   buttonText="reserve" // reserve if on the client side
              onClick={() => alert("Card Clicked")} // onClick handler for the card
              onClickButton={() => alert("Button Clicked")} // onClick handler for the button
              headerText={index + 1} // Card header text
            />
          </div>
        ))}
      </div>
    );
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
    // Create a copy of the current doctor object
    let updatedDoctor = { ...newdoctor };

    // Check each condition and update the copy if necessary
    if (newEmail) {
      updatedDoctor.email = newEmail;
    }

    if (newHourlyRate) {
      updatedDoctor.HourlyRate = newHourlyRate;
    }

    if (newAffiliation) {
      updatedDoctor.affiliation = newAffiliation;
    }

    // CONTINUE DOCTOR POST
    setNewDoctor(updatedDoctor);
    console.log(updatedDoctor);
    dispatch(updateDoctor(updatedDoctor));
    // Clear input fields
    setNewEmail("");
    setNewHourlyRate("");
    setNewAffiliation("");
  };

  return (
    <>
      {doctor ? (
        <div className=" p-5 d-flex">
          <div className=" w-25 border-end">
            <div className="p-3 border-bottom">
              <div>
                <Image src="/profile.svg" height={200} width={200} />
              </div>
            </div>
            <div className="py-2 d-flex">
              <span className="fw-bold w-25">Date Of Birth: </span>

              <span>{doctor.DateOfbirth}</span>
            </div>
          </div>
          <div className="p-3 w-75">
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
            <div className="p-2 border-bottom">
              <div className="text-body-secondary fw-bold small p-3 ">
                Doctor Information
              </div>
              <div className="p-3">
                <div className="py-3 d-flex">
                  <span className="fw-bold w-25">Email: </span>
                  <span className="w-50">{doctor.email}</span>
                  <span className="w-25">
                    {!edit || (
                      <input
                        type="email"
                        className="form-control"
                        placeholder="New Email"
                        value={newEmail}
                        onChange={handleEmailChange}
                      />
                    )}
                  </span>
                </div>
                <div className="py-3 d-flex">
                  <span className="fw-bold w-25">Hourly Rate: </span>
                  <span className="w-50">{doctor.HourlyRate}</span>
                  <span className="w-25">
                    {!edit || (
                      <input
                        type="email"
                        className="form-control"
                        placeholder="New Hourly Rate"
                        value={newHourlyRate}
                        onChange={handleHourlyRateChange}
                      />
                    )}
                  </span>
                </div>
                <div className="py-3 d-flex">
                  <span className="fw-bold w-25">Affiliation: </span>
                  <span className="w-50">{doctor.affiliation}</span>
                  <span className="w-25">
                    {!edit || (
                      <input
                        type="email"
                        className="form-control"
                        placeholder="New Affiliation"
                        value={newAffiliation}
                        onChange={handleAffiliationChange}
                      />
                    )}
                  </span>
                </div>
                <div className="py-2 d-flex">
                  <span className="fw-bold w-25">Eduactional Background: </span>
                  <span>{doctor.educationalbackground}</span>
                </div>
              </div>
              <div>
                <div className="text-body-secondary fw-bold small p-3 ">
                  Available Dates
                </div>
                <DateCardList />
              </div>
            </div>
            {!edit || (
              <Button
                text="Submit"
                variant="small"
                onClick={() => {
                  handleSubmit();
                  setedit(false);
                }}
              ></Button>
            )}
          </div>
        </div>
      ) : (
        <div>hello</div>
      )}
    </>
  );
}

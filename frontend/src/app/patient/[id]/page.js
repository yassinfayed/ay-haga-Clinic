"use client";
import Image from "next/image";
import { useState } from "react";
import { Card } from "../../../../components/Card";
import React from "react";
import { useEffect } from "react";
import { login } from "../../redux/actions/authActions";
import { viewPatients } from "../../redux/actions/patientsActions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components/Button";
import NavbarDoc from "../../../../components/NavbarDoc";
import NavbarPatient from "../../../../components/NavbarPatient";

export default function patientProfile({ params }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewPatients({ _id: params.id }));
  }, [dispatch]);

  const patients = useSelector((state) => state.patientsReducer.patients.data);
  console.log(patients);
  let patient;
  if (patients) {
    patient = patients[0];
  }

  function HealthRecords() {
    return (
      <div className="d-flex">
        {patient.healthRecords?.map((value, index) => (
          <div className="w-50 p-3" key={index}>
            <Card title={index + 1} text={value}></Card>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
    
    {JSON.parse(localStorage.getItem('userInfo')).data.user.role === 'doctor' ? <NavbarDoc />: <NavbarPatient></NavbarPatient>}
      {patient ? (
       
        <div className=" p-5 d-flex">
            
          <div className=" w-25 border-end">
            <div className="p-3 border-bottom m-3">
              <div className="d-flex justify-content-center ">
                <Image src="/profile.svg" height={200} width={200} />
              </div>
            </div>

            <div className="py-2 d-flex ">
              <span className="fw-bold w-25 ms-4">Date Of Birth: </span>
              <span>{patient.dateOfBirth}</span>
            </div>
            <div className="py-2 d-flex ms-4">
              <span className="fw-bold w-25">Gender: </span>
              <span className="w-50">{patient.gender}</span>
            </div>
          </div>
          <div className="p-3 w-75">
            <div className="border-bottom d-flex ">
              <div className="w-75">
                <h1>{patient.name}</h1>
                {/* <p className="px-3 text-secondary">{patient.user}</p> */}
              </div>
            </div>

            <div className="p-2 ">
              <div className="d-flex">
                <div className="w-50">
                  <div className="text-body-secondary fw-bold small p-3 ">
                    patient Information
                  </div>
                  <div className="p-3">
                    <div className="py-3 d-flex">
                      <span className="fw-bold w-25">Email: </span>
                      <span className="w-50">{patient.email}</span>
                    </div>

            {JSON.parse(localStorage.getItem('userInfo')).data.user.role === 'patient' &&
                    <div className="py-3 d-flex">
                      <span className="fw-bold w-25">package: </span>
                      <span className="w-50">{patient.package?.name}</span>
                    </div>
                    }
                    <div className="py-2 d-flex">
                      <span className="fw-bold w-25">mobile number: </span>
                      <span>{patient.mobileNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="w-50">
                  <div>
                    <div className="text-body-secondary fw-bold small p-3 border-bottom">
                      Extra Information
                    </div>
                    <p className="p-3 ">bla bla bla bla bla</p>
                  </div>
                  <div>
                    <div className="text-body-secondary fw-bold small p-3 border-bottom">
                      Emergency Contact
                    </div>
                    <div className="w-50 p-3">
                      <Card
                        title={patient.emergencyContact?.fullName}
                        subtitle={patient.emergencyContact?.mobileNumber}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-body-secondary fw-bold small p-3 border-bottom">
                  Health Records
                </div>
                <HealthRecords />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>Loading...</div>
        </>
      )}
    </>
  );
}

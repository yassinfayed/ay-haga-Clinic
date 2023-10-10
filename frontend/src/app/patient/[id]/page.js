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

export default function patientProfile({ params }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewPatients({ _id: params.id }));
  }, [dispatch]);

  const patients = useSelector((state) => state.patientsReducer.patients.data);
  let patient;
  if (patients) {
    patient = patients[0];
  }
  const [patientd, setPatient] = useState({
    user: "user_id_here", // Replace with a valid user ID
    name: "John Doe",
    email: "johndoe@example.com",
    dateOfbirth: new Date("1990-01-01"),
    gender: "male",
    package: "health_package_id_here", // Replace with a valid health package ID
    mobileNumber: "1234567890",
    emergencyContact: {
      fullName: "Emergency Contact Name",
      mobileNumber: "9876543210",
    },
    healthRecords: ["Record 1", "Record 2"],
  });
  const id = params.id;

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
      {patient ? (
        <div className=" p-5 d-flex">
          <div className=" w-25 border-end">
            <div className="p-3 border-bottom m-3">
              <div className="d-flex justify-content-center ">
                <Image src="/profile.svg" height={200} width={200} />
                {/* <Button
                  text="click me "
                  onClick={() => {
                    console.log("patient", patient);
                  }}
                ></Button> */}
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
                <p className="px-3 text-secondary">{patient.user}</p>
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

                    <div className="py-3 d-flex">
                      <span className="fw-bold w-25">package: </span>
                      <span className="w-50">{patient.package}</span>
                    </div>
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

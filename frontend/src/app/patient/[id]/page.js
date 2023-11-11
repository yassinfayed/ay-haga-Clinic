"use client";
import Image from "next/image";
import { Card } from "../../../../components/Card";
import React from "react";
import { useEffect } from "react";
import { viewPatients } from "../../redux/actions/patientsActions";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from '../../../../components/ChangePassword';


export default function patientProfile({ params }) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(params.id);
    dispatch(viewPatients({ _id: params.id }));
  }, [dispatch]);
  let date;

  const patients = useSelector((state) => state.patientsReducer.patients.data);
  console.log(patients);
  let patient;
  if (patients) {
    patient = patients[0];
    date = formatDateToDDMMYYYY(patient.dateOfBirth);
  }

  function HealthRecords() {
    return (
      <div className="d-flex">
        {patient.healthRecords?.map((value, index) => (
          <div className="w-50 p-3" key={index}>
            <Card
              children={<img src={value} alt="value" />}
              title={index + 1}
            ></Card>
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
    <>
      {patient ? (
        <div className=" d-flex mx-auto rounded shadow col-md-9 my-3 ">
          <div className=" w-25 border-end">
            <div className="border-bottom m-3">
              <div className="d-flex justify-content-center ">
                <Image src="/profile.svg" height={200} width={200} />
              </div>
            </div>
            <div className="mx-auto">
              <ChangePassword/>
            </div>
          </div>
          <div className="p-5 w-75">
            <div className="border-bottom d-flex ">
              <div className="w-75">
                <h1 className=" ms-2 text-primary fw-bold text-capitalize">
                  {patient.name}
                </h1>
              </div>
            </div>

            <div className="p-2 ">
              <div className="d-flex">
                <div className="w-50">
                  <h2 className="text-global fw-bold small pt-3 p-1 me-3">
                    Patient Information
                  </h2>
                  <hr className="w-50" />

                  <div className="p-2 pt-0 mx-3">
                    <div className="py-2 d-flex ">
                      <span className="fw-bold w-25">
                        <Image src="/person.svg" height={25} width={25} />
                      </span>
                      <span className="w-50">{patient.gender}</span>
                    </div>
                    <div className="py-2 d-flex ">
                      <span className="fw-bold w-25 ">
                        <Image src="/birthday.svg" height={25} width={25} />
                      </span>
                      <span>{date}</span>
                    </div>
                    <div className="py-2 d-flex">
                      <span className="fw-bold w-25">
                        <Image src="/phone-dark.svg" height={25} width={25} />{" "}
                      </span>
                      <span>{patient.mobileNumber}</span>
                    </div>
                    <div className="py-3 d-flex">
                      <span className="fw-bold w-25">
                        <Image src="/mail-dark.svg" height={25} width={25} />
                      </span>
                      <span className="w-50">{patient.email}</span>
                    </div>
                  </div>
                </div>
                <div className="ms-5 w-50">
                  <div>
                    <h2 className="text-global fw-bold small p-1 pt-3">
                      Health Package
                    </h2>
                    <hr className="w-50" />
                    {JSON.parse(localStorage.getItem("userInfo")).data.user
                      .role === "patient" && (
                      <div className="pb-2 d-flex">
                        <span className="px-3">{patient.package? patient.package.name : 'none'}</span>
                      </div>
                    )}
                  </div>
                  <div className="w-100">
                    <h2 className="text-global fw-bold small pt-3 p-1">
                      Emergency Contact
                    </h2>
                    <hr className="w-50" />
                    <div className="w-100 p-3">
                      <div className="card global-text shadow border-0">
                        <div className="card-body">
                          <h5
                            className="text-primary"
                            style={{ fontWeight: "bold", fontSize: "20px" }}
                          >
                            {patient.emergencyContact?.fullName}
                          </h5>

                          <h6 className="card-subtitle mb-2 text-muted">
                            {patient.emergencyContact?.mobileNumber}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-global fw-bold small pt-3 p-1">
                  Health Records
                </div>
                <hr className="w-50" />
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

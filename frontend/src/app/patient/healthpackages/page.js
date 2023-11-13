"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useState } from "react";
import { Button } from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { listHealthPackages } from "@/app/redux/actions/healthPackagesActions";
import { useEffect } from "react";
import { useMemo } from "react";
import {
  viewFamilyMembers,
  viewAllFamilyMembersAndPatients,
} from "@/app/redux/actions/FamilyMembersAction";
import { cancelSubscription } from "@/app/redux/actions/patientActions";
import { viewPatients } from "@/app/redux/actions/patientsActions";
import SubscribeModal from "../../../../components/SubscribeModal";
import { Card } from "../../../../components/Card";
import Image from "next/image";

function HealthPackages() {
  const [modalShow, setModalShow] = useState(false);
  const [healthPackage, setHealthPackage] = useState(null);
  const [CancelModalShow, setCancelModalShow] = useState(false);
  const [patient, setPatient] = useState({});
  const [subscribed, setSubscribed] = useState("");
  const [familyMemberPatients, setFamilyMemberPatients] = useState([]);
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem("userInfo")).data.user.patient._id;

  useEffect(() => {
    dispatch(viewFamilyMembers());
    dispatch(listHealthPackages());
    dispatch(viewPatients({ _id: id }));
    if (patients) {
      dispatch(viewAllFamilyMembersAndPatients(patient._id));
    }
  }, [dispatch, isLoading, modalShow, familyMembers, patient]);

  const familyMembers = useSelector(
    (state) => state.viewFamilyMembersReducer.familyMember
  );
  const familyMembers2 = useSelector(
    (state) =>
      state.viewAllFamilyMembersAndPatientsReducer.familyMembersWithPatients
  );
  const isLoading = useSelector(
    (state) => state.addFamilyMembersReducer.loading
  );
  const healthPackages = useSelector(
    (state) => state.getHealthPackagesReducer.healthPackages
  );
  console.log(
    "state.viewAllFamilyMembersAndPatientsReducer.loading",
    familyMembers2
  );
  const patients = useSelector((state) => state.patientsReducer.patients.data);
  if (patients) {
    if (!patient.name) {
      setPatient(patients[0]);

      dispatch(viewAllFamilyMembersAndPatients());
    }
    // console.log(patient);
  }
  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1.
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const fam2 = useMemo(() => {
    if (familyMembers2 && familyMembers2.data) {
      return familyMembers2.data.map((item) => {
        console.log("itemmmmmmms", item);
        const familyMember2 = item.familyMember;
        const patientDetails2 = item.patientDetails;
        return {
          name: familyMember2.name,
          relationToPatient: familyMember2.relationToPatient,
          id: familyMember2.patientId,
          // Add any additional properties you need from familyMember or patientDetails
        };
      });
    }
    return [];
  }, [familyMembers2, modalShow, isLoading]);

  const packages = useMemo(() => {
    if (healthPackages && healthPackages.data) {
      return healthPackages.data.map((value) => ({
        _id: value._id,
        name: value.name,
        price: value.price,
        doctorDiscount: value.doctorDiscount,
        medicineDiscount: value.medicineDiscount,
        familyDiscount: value.familyMemberSubDiscount,
      }));
    }
    return [];
  }, [healthPackages, modalShow]);
  function idToPackageName(id) {
    for (const pack of packages) {
      if (id == pack._id) {
        return pack.name;
      }
    }
  }

  function handleCancellation(PatientId) {
    console.log(PatientId);
    dispatch(cancelSubscription(PatientId));
    //6549f806f3ee984c4052aa62
  }
  console.log(patient);
  return (
    <div className="m-2">
      <h3 className="my-1 mt-0 text-center text-title">Health Packages</h3>

      <div className="underline-Bold mx-auto mb-5"></div>
      {/* <h5 className='my-1 mt-0 text-center text-primary mb-3 text-semibold'>Current active health package subscription:</h5> */}
      <div className="w-100 row m-3 justify-content-center ">
        <SubscribeModal
          title={`Subscribe to our ${healthPackage?.name} Health Package`}
          subheader={``}
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={healthPackage?._id}
          healthPackage={healthPackage}
        />
        {packages.map((pack) => (
          <div className={`col-lg-3 m-2 p-4 `}>
            <div
              className={`card shadow p-4  border border-5 ${
                patient?.package == pack._id &&
                patient.subscriptionStatus == "subscribed"
                  ? "border-primary"
                  : ""
              } ${
                patient?.package == pack._id &&
                patient.subscriptionStatus == "cancelled"
                  ? "border-danger"
                  : ""
              }`}
            >
              <div className="card-body">
                <h3 className="card-title text-center">{pack.name} Package</h3>
                <p className="card-subtitle text-primary pb-2 text-center">
                  Subscribe for {pack.price}EGP/year
                </p>
                <ul>
                  <li>
                    <strong className="text-primary">
                      {pack.doctorDiscount}%
                    </strong>{" "}
                    off any doctor's appointment.
                  </li>
                  <li>
                    <strong className="text-primary">
                      {pack.medicineDiscount}%
                    </strong>{" "}
                    off any medicine ordered from our pharmacy platform.
                  </li>
                  <li>
                    <strong className="text-primary">
                      {pack.familyDiscount}%
                    </strong>{" "}
                    discount on subscriptions of family members in any package.
                  </li>
                </ul>
              </div>

              <div className="col-md-10 my-3 mb-4 mx-auto">
                {(patient?.package == pack._id &&
                  patient?.subscriptionStatus == "unsubscribed") || (
                  <Button
                    text="Subscribe"
                    variant="md"
                    className="col-md-12"
                    onClick={() => {
                      setHealthPackage(pack);
                      setModalShow(true);
                    }}
                  />
                )}
                {patient?.package == pack._id &&
                  patient?.subscriptionStatus == "subscribed" && (
                    <>
                      <Button
                        text="Subscribed"
                        variant="md"
                        color="secondary"
                        disabled="true"
                        className="col-xl-7 me-3 my-3"
                        onClick={() => {
                          setHealthPackage(pack);
                          setModalShow(true);
                        }}
                      />
                      <Button
                        text="cancel"
                        variant="md"
                        color="danger"
                        className="col-xl-4"
                        onClick={() => {
                          cancelSubscription(patient._id);
                        }}
                      />
                    </>
                  )}
              </div>
              {patient?.package == pack._id &&
                patient?.subscriptionStatus == "subscribed" && (
                  <>
                    <div className="text-muted text-center ">
                      <small>
                        to be renewed on{" "}
                        {formatDateToDDMMYYYY(patient.renewalDate)}
                      </small>
                    </div>
                  </>
                )}
              {patient?.package == pack._id && patient?.cancellationEndDate && (
                <>
                  <div className="text-muted text-center ">
                    <small>
                      Subscription ended on{" "}
                      {formatDateToDDMMYYYY(patient.cancellationEndDate)}
                    </small>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <hr />

      <div>
        <h2 className="text-center text-primary fw-bold">Family Members</h2>
        <div className="d-flex row">
          {familyMembers2?.map((familymember) => {
            console.log("fammmm22");
            const familyMember2 = familymember.familyMember;
            const patientDetails2 = familymember.patientDetails;

            return (
              <div className=" col-lg-4" key={familyMember2._id}>
                <Card
                  className="col-md-10 my-3 bg-light my-4"
                  title={
                    <div className="text-capitalize ">{familyMember2.name}</div>
                  }
                  text={
                    <div className="p-3">
                      <div>Relation: {familyMember2.relationToPatient}</div>

                      <div>
                        Subscription: {patientDetails2.subscriptionStatus}
                      </div>
                      {patientDetails2.subscriptionStatus !==
                        "unsubscribed" && (
                        <div>
                          package: {idToPackageName(patientDetails2.package)}
                        </div>
                      )}
                      {patientDetails2.cancellationEndDate && (
                        <div>
                          subscription ended on{" "}
                          {formatDateToDDMMYYYY(
                            patientDetails2.cancellationEndDate
                          )}
                        </div>
                      )}
                      {patientDetails2.subscriptionStatus == "subscribed" && (
                        <div>
                          renewal date:{" "}
                          {formatDateToDDMMYYYY(patientDetails2.renewalDate)}
                        </div>
                      )}
                      {/* Add any additional information from patientDetails if needed */}
                    </div>
                  }
                  image={
                    <Image
                      src="/person.svg"
                      height={30}
                      width={30}
                      className="m-3 mb-0 rounded-circle"
                    />
                  }
                  buttonText={"remove subscription"}
                  buttonTrue={
                    patientDetails2.subscriptionStatus == "subscribed" && true
                  }
                  buttonClass="col-md-12 m-3 ms-auto btn btn-danger"
                  onClickButton={() => handleCancellation(patientDetails2._id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HealthPackages;

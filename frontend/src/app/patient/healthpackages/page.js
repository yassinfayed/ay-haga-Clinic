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
import { Alert } from "react-bootstrap";
import { cancelSubscription } from "@/app/redux/actions/patientActions";
import { viewPatients } from "@/app/redux/actions/patientsActions";
import SubscribeModal from "../../../../components/SubscribeModal";
import { Card } from "../../../../components/Card";
import Image from "next/image";
import { Dna } from "react-loader-spinner";

function HealthPackages() {
  const [modalShow, setModalShow] = useState(false);
  const [healthPackage, setHealthPackage] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState("");
  //const [patient, setPatient] = useState({});
  const [subscribeAlert, setSubscribeAlert] = useState(0);
  const [SubscriptionSuccess, setSubscriptionSuccess] = useState(false);

  const [CancelSubscriptionSuccess, setCancelSubscriptionSuccess] =
    useState(false);
  const [cancelConfirm, setCancelConfirm] = useState("");
  const [cancelId, setCancelId] = useState("");
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem("userInfo")).data.user.patient._id;

  const familyMembers2 = useSelector(
    (state) =>
      state.viewAllFamilyMembersAndPatientsReducer.familyMembersWithPatients
  );
  const isLoading2 = useSelector(
    (state) => state.viewAllFamilyMembersAndPatientsReducer.loading
  );
  const isLoading = useSelector(
    (state) => state.addFamilyMembersReducer.loading
  );
  const patientLoading = useSelector(
    (state) => state.patientsReducer.patients.data
  );
  const cancel_subscription_load = useSelector(
    (state) => state.cancelSubscriptionReducer.loading
  );
  const cancel_subscription_success = useSelector(
    (state) => state.cancelSubscriptionReducer.success
  );
  const patients = useSelector((state) => state.patientsReducer.patients.data);
  useEffect(() => {
    dispatch(listHealthPackages());
    dispatch(viewPatients({ _id: id }));
  }, [
    dispatch,
    isLoading,
    modalShow,
    CancelSubscriptionSuccess,
    subscribeAlert,
  ]);
  useEffect(() => {
    if (patients) dispatch(viewAllFamilyMembersAndPatients(patients[0]._id));
  }, [patientLoading, CancelSubscriptionSuccess, subscribeAlert]);
  let patient;
  if (patients) {
    patient = patients[0];
  }
  useEffect(() => {
    if (cancel_subscription_success) {
      setCancelSubscriptionSuccess(true);
    }
  }, [cancel_subscription_success]);

  const healthPackages = useSelector(
    (state) => state.getHealthPackagesReducer.healthPackages
  );

  console.log(patients);
  console.log(patient);
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

  function handleCancellation() {
    dispatch(cancelSubscription(cancelId));
    setCancelConfirm(false);
    //6549f806f3ee984c4052aa62
  }
  return (
    <>
      {patient ? (
        <>
          {
            <div className="m-3 mb-5">
              <h3 className="my-1 mt-0 text-center text-title">
                Health Packages
              </h3>
              {CancelSubscriptionSuccess && (
                <div
                  className="alert alert-primary alert-dismissible fade show"
                  role="alert"
                >
                  Success! Subscription Cancelled Successfully
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setCancelSubscriptionSuccess(false)}
                  ></button>
                </div>
              )}
              {subscribeAlert == 1 && (
                <div
                  className="alert alert-primary alert-dismissible fade show"
                  role="alert"
                >
                  Success! You have subscribed to the health package package
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSubscribeAlert(0)}
                  ></button>
                </div>
              )}
              {subscribeAlert == 2 && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {subscriptionData}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSubscribeAlert(0)}
                  ></button>
                </div>
              )}
              {cancelConfirm && (
                <Alert variant="danger" className="row align-items-center">
                  <div className="col-md-8">
                    <strong>Warning!</strong> Are you sure you want to cancel
                    your Subscription?
                  </div>
                  <div className="d-flex justify-content-end col-md-4">
                    <Button
                      className="mx-2 bg-danger"
                      onClick={() => handleCancellation()}
                      text="confirm"
                    >
                      Confirm
                    </Button>
                    <Button
                      className="mx-2 bg-dark"
                      onClick={() => setCancelConfirm(false)}
                      text="cancel"
                    >
                      Cancel
                    </Button>
                  </div>
                </Alert>
              )}

              <div className="underline-Bold mx-auto mb-5"></div>
              {/* <h5 className='my-1 mt-0 text-center text-primary mb-3 text-semibold'>Current active health package subscription:</h5> */}
              <div className="w-100 row m-3 justify-content-center ">
                <SubscribeModal
                  title={`Subscribe to our ${healthPackage?.name} Health Package`}
                  subheader={``}
                  show={modalShow}
                  onHide={() => {
                    setModalShow(false);
                  }}
                  onSuccess={() => {
                    setSubscribeAlert(1);
                  }}
                  onError={(data) => {
                    setSubscribeAlert(2);
                    setSubscriptionData(data);
                  }}
                  id={healthPackage?._id}
                  healthPackage={healthPackage}
                />
                {packages.map((pack) => (
                  <div className={`col-lg-3 m-2 p-4 `} key={pack._id}>
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
                        <h3 className="card-title text-center">
                          {pack.name} Package
                        </h3>
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
                            discount on subscriptions of family members in any
                            package.
                          </li>
                        </ul>
                      </div>

                      <div className="col-md-10 my-3 mb-4 mx-auto">
                        {(patient?.package == pack._id &&
                          patient?.subscriptionStatus == "subscribed") || (
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
                                  setCancelConfirm(true);
                                  setCancelId(patient._id);
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
                                to be renewed on <br />
                                {formatDateToDDMMYYYY(patient.renewalDate)}
                              </small>
                            </div>
                          </>
                        )}
                      {patient?.package == pack._id &&
                        patient?.subscriptionStatus == "cancelled" && (
                          <>
                            <div className="text-muted text-center ">
                              <small>
                                Subscription will end on <br />
                                {formatDateToDDMMYYYY(
                                  patient.cancellationEndDate
                                )}
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
                <h2 className="text-center text-primary fw-bold">
                  Family Members
                </h2>

                {familyMembers2?.length != 0 ? (
                  <div className="d-flex row">
                    {familyMembers2?.map((familymember) => {
                      const familyMember2 = familymember.familyMember;
                      const patientDetails2 = familymember.patientDetails;

                      return (
                        <div className=" col-lg-4" key={familyMember2._id}>
                          <Card
                            className="col-md-10 my-3 bg-light my-4"
                            title={
                              <div className="text-capitalize ">
                                {familyMember2.name}
                              </div>
                            }
                            text={
                              <div className="p-3">
                                <div>
                                  Relation: {familyMember2.relationToPatient}
                                </div>

                                <div>
                                  Subscription:{" "}
                                  {patientDetails2.subscriptionStatus}
                                </div>
                                {patientDetails2.subscriptionStatus !==
                                  "unsubscribed" && (
                                  <div>
                                    package:{" "}
                                    {idToPackageName(patientDetails2.package)}
                                  </div>
                                )}
                                {patientDetails2.cancellationEndDate &&
                                  patientDetails2.subscriptionStatus ==
                                    "cancelled" && (
                                    <div>
                                      subscription will end on{" "}
                                      {formatDateToDDMMYYYY(
                                        patientDetails2.cancellationEndDate
                                      )}
                                    </div>
                                  )}
                                {patientDetails2.subscriptionStatus ==
                                  "subscribed" && (
                                  <div>
                                    renewal date:{" "}
                                    {formatDateToDDMMYYYY(
                                      patientDetails2.renewalDate
                                    )}
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
                              patientDetails2.subscriptionStatus ==
                                "subscribed" && true
                            }
                            buttonClass="col-md-12 m-3 ms-auto btn btn-danger"
                            onClickButton={() => {
                              setCancelId(patientDetails2._id);
                              setCancelConfirm(true);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center p-4">No family Members found</div>
                )}
              </div>
            </div>
          }
        </>
      ) : (
        <Dna
          visible={true}
          height="120"
          width="120"
          ariaLabel="dna-loading"
          wrapperStyle={{
            margin: "auto",
            position: "absolute",
            bottom: "55vh",
            left: "100vh",
          }}
          wrapperClass="dna-wrapper primary"
        />
      )}
    </>
  );
}

export default HealthPackages;

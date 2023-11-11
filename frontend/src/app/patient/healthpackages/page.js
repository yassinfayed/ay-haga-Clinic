"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useState } from "react";
import { Button } from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { listHealthPackages } from "@/app/redux/actions/healthPackagesActions";
import { useEffect } from "react";
import { useMemo } from "react";
import { viewFamilyMembers } from "@/app/redux/actions/FamilyMembersAction";
import { cancelSubscription } from "@/app/redux/actions/patientActions";
import { viewPatients } from "@/app/redux/actions/patientsActions";
import SubscribeModal from "../../../../components/SubscribeModal";
import { Card } from "../../../../components/Card";
import Image from "next/image";

function HealthPackages() {
  const [modalShow, setModalShow] = useState(false);
  const [healthPackage, setHealthPackage] = useState(null);
  const [CancelModalShow, setCancelModalShow] = useState(false);
  const [subscribed, setSubscribed] = useState("");
  const [familyMemberPatients, setFamilyMemberPatients] = useState([]);
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem("userInfo")).data.user.patient._id;

  useEffect(() => {
    fetchData();
    fetchFamily();
    dispatch(viewPatients({ _id: id }));
    // if (familyMembers && familyMembers.data) {
    //   // Loop through family members and dispatch viewPatients for each
    //   console.log("helloooo");
    //   familyMembers.data.forEach((familyMember) => {
    //     console.log("familyMember.patientId");
    //     dispatch(viewPatients({ _id: familyMember.patientId }));
    //   });
    // }
    // console.log(familyMemberPatients);
  }, [dispatch, isLoading, modalShow, familyMembers]);

  const familyMembers = useSelector(
    (state) => state.viewFamilyMembersReducer.familyMember
  );
  const isLoading = useSelector(
    (state) => state.addFamilyMembersReducer.loading
  );
  const healthPackages = useSelector(
    (state) => state.getHealthPackagesReducer.healthPackages
  );

  async function fetchFamily() {
    dispatch(viewFamilyMembers());
  }
  async function fetchData() {
    dispatch(listHealthPackages());
  }
  const patients = useSelector((state) => state.patientsReducer.patients.data);

  let patient;
  if (patients) {
    patient = patients[0];
    console.log(patient);
  }
  // let familyMemberPatients = [];
  // let i;
  // for (i = 0; i < familyMembers?.data.length; i++) {
  //   dispatch(cancelSubscription(familyMembers.data[i].patientId));
  //   familyMemberPatients.push(
  //     useSelector((state) => state.patientsReducer.patients.data)
  //   );
  // }
  const fam = useMemo(() => {
    if (familyMembers && familyMembers.data) {
      return familyMembers.data.map((value) => ({
        name: value.name,
        nationalId: value.nationalId,
        age: value.age,
        gender: value.gender,
        relationToPatient: value.relationToPatient,
        id: value.patientId,
      }));
    }
    return [];
  }, [familyMembers, modalShow, isLoading]);

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

  function handleCancellation(PatientId) {
    console.log(PatientId);
    dispatch(cancelSubscription(PatientId));
    //6549f806f3ee984c4052aa62
  }

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
          id={healthPackage?.id}
        />
        {packages.map((pack) => (
          <div className={`col-lg-3 m-2 p-4 `}>
            <div
              className={`card shadow p-4  border border-5 ${
                patient?.package == pack._id ? "border-primary" : ""
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
                {subscribed == pack._id || (
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
                {subscribed == pack._id && (
                  <>
                    <Button
                      text="Subscribed"
                      variant="md"
                      color="secondary"
                      disabled="true"
                      className="col-md-8 me-3"
                      onClick={() => {
                        setHealthPackage(pack);
                        setModalShow(true);
                      }}
                    />
                    ////////////////////////////////////////////////
                    ///////////////////////////////////////////////
                    //////////////////////////////////////////////
                    /////////////////////////////////////////////
                    ////////////////////////////// add user.id
                    <Button
                      text="cancel"
                      variant="md"
                      color="danger"
                      className="col-md-3"
                      onClick={() => {
                        cancelSubscription(patient._id);
                      }}
                    />
                  </>
                )}
              </div>
              {subscribed == pack._id && (
                <>
                  <div className="text-muted text-center ">
                    <small>subscribed with renewal date</small>
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
        <div className="d-flex">
          {fam.map((familymember) => {
            return (
              <div className="mx-auto col-lg-3" key={familymember?.patientId}>
                <Card
                  className="col-md-10 mx-auto offset-lg-1 my-3 bg-light my-4"
                  title={
                    <div className="text-capitalize ">{familymember.name}</div>
                  }
                  text={
                    <div className="p-3">
                      <div>Relation: {familymember.relationToPatient}</div>
                      <div>Package: {familymember._id}</div>
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
                  buttonText={"remove"}
                  buttonTrue={true}
                  buttonClass="col-md-12 m-3 ms-auto btn btn-danger"
                  onClickButton={() => handleCancellation(familymember.id)}
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

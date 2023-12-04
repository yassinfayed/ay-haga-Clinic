"use client";
import React from "react";
import { useState } from "react";
import { Card } from "../../../../components/Card";
import { Button } from "../../../../components/Button";
import NewOrOldFamily from "../../../../components/NewOrOldFamilyMemberModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { viewFamilyMembers } from "@/app/redux/actions/FamilyMembersAction";
import { useEffect } from "react";
import { useMemo } from "react";
import Spinner from "../../../../components/Spinner";

function Familymembers() {
  const [modalShow, setModalShow] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const dispatch = useDispatch();

  const familyMembers = useSelector(
    (state) => state.viewFamilyMembersReducer.familyMember
  );
  const isLoading = useSelector(
    (state) => state.addFamilyMembersReducer.loading
  );
  const linkisLoading = useSelector(
    (state) => state.linkFamilyMemberReducer.loading
  );
  async function fetchData() {
    dispatch(viewFamilyMembers());
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, isLoading, modalShow, linkisLoading]);

  const fam = useMemo(() => {
    if (familyMembers && familyMembers.data) {
      return familyMembers.data.map((value) => ({
        name: value?.linkedPatientId?.name,
        nationalId: value?.nationalId,
        age: value?.age,
        gender: value?.linkedPatientId?.gender,
        relationToPatient: value?.relationToPatient,
      }));
    }
    return [];
  }, [familyMembers, modalShow, isLoading]);

  return (
    <>
      {successAlert && (
        <div
          className="alert alert-primary alert-dismissible fade show"
          role="alert"
        >
          Family member added successfuly
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessAlert(false)}
          ></button>
        </div>
      )}
      {errorAlert && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Family member was not added
          <button
            type="button"
            className="btn-close"
            onClick={() => setErrorAlert(false)}
          ></button>
        </div>
      )}
      {familyMembers ? (
        <div className="m-2">
          <h3 className="my-1 mt-0 text-center text-title">Family Members</h3>
          <div className="underline-Bold mx-auto mb-5"></div>
          <div className="container-fluid my-3">
            <Button
              text="Add New Family Member"
              onClick={() => setModalShow(true)}
            />
          </div>
          <NewOrOldFamily
            show={modalShow}
            onHide={() => setModalShow(false)}
            onSuccess={() => {
              setSuccessAlert(true);
            }}
            onError={() => {
              setErrorAlert(true);
            }}
          />
          <div className="container-fluid my-5 mx-2 d-flex justify-content-center col-12 flex-wrap">
            {fam.map((familymember) => (
              <Card
                className="my-2 mx-2 col-md-3  p-2 "
                key={familymember._id}
                title={familymember.name}
                subtitle={`National ID: ${familymember.nationalId}`}
                text={
                  <>
                    Age: {familymember.age}
                    <br />
                    Gender: {familymember.gender}
                    <br />
                    Relation to Patient: {familymember.relationToPatient}
                  </>
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Familymembers;

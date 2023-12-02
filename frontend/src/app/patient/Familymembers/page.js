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
import { Dna } from "react-loader-spinner";

function Familymembers() {
  const [modalShow, setModalShow] = useState(false);
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

  console.log(fam);

  return (
    <>
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
          <NewOrOldFamily show={modalShow} onHide={() => setModalShow(false)} />
          <div className="container-fluid my-5">
            {fam.map((familymember) => (
              <Card
                className="my-2 col-md-3 m-2"
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

export default Familymembers;

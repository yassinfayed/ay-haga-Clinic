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

function Familymembers() {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const familyMembers = useSelector(
    (state) => state.viewFamilyMembersReducer.familyMember
  );
  const isLoading = useSelector(
    (state) => state.addFamilyMembersReducer.loading
  );

  async function fetchData() {
    dispatch(viewFamilyMembers());
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, isLoading, modalShow]);

  const fam = useMemo(() => {
    if (familyMembers && familyMembers.data) {
      return familyMembers.data.map((value) => ({
        name: value.name,
        nationalId: value.nationalId,
        age: value.age,
        gender: value.gender,
        relationToPatient: value.relationToPatient,
      }));
    }
    return [];
  }, [familyMembers, modalShow, isLoading]);

  console.log(fam);

  return (
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
      <div className="container-fluid my-3">
        {fam.map((familymember) => (
          <Card
            className="my-2"
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
  );
}

export default Familymembers;

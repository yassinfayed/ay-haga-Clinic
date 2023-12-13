"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewFamilyMembers } from "@/app/redux/actions/FamilyMembersAction";
import { BottomCallout } from "@/components/BottomCallout";
import { Modal } from "@/components/Modal";
import { Button, Badge } from "@tremor/react";
import NewOrOldFamily from "@/app/patient/components/NewOrOldFamilyMemberModal";
import Lottie from "lottie-react";
import LoadingAnimation from "../../../../public/loading.json";
import FamilyMemberCard from "../components/familyMemberCard";
import FamilyAppointments from "../components/FamilyAppointments";

function Familymembers() {
  const [modalShow, setModalShow] = useState(false);
  const [selectedTab, setSelectedTab] = useState("members");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedMemberName, setSelectedMemberName] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const familyMembers = useSelector(
    (state) => state.viewFamilyMembersReducer.familyMember
  );
  const isLoading = useSelector(
    (state) => state.addFamilyMembersReducer.loading
  );

  const handleCardClick = (member) => {
    setSelectedMemberName(member.name);
    setSelectedMemberId(member.id);
    console.log(selectedMemberId, member.name);
    // dispatch(fetchAppointmentsForFamilyMember(id));
  };
  useEffect(() => {
    dispatch(viewFamilyMembers());
  }, [dispatch, isLoading, modalShow]);

  const fam = useMemo(() => {
    return (
      familyMembers?.data?.map((value) => ({
        name: value?.linkedPatientId?.name,
        nationalId: value?.nationalId,
        age: value?.age,
        gender: value?.linkedPatientId?.gender,
        relationToPatient: value?.relationToPatient,
        id: value?._id,
      })) || []
    );
  }, [familyMembers, modalShow, isLoading]);
  console.log(fam);

  return (
    <div className="m-4 flex">
      {/* Family Members Section */}
      <div className="prof h-400 overflow-hidden rounded-xl p-10  flex-1 w-2/5">
        <h1 className="font-bold text-2xl mb-4">
          Family Members <Badge>{fam?.length}</Badge>
        </h1>

        <Button
          variant="secondary"
          className="px-4 py-2 my-2 rounded"
          onClick={() => setModalShow(true)}
        >
          Add New Family Member
        </Button>

        <Modal visible={modalShow} setVisible={setModalShow} famFlag={true}>
          <NewOrOldFamily
            setSuccess={setSuccessMessage}
            setError={setErrorMessage}
            visible={modalShow}
            setVisible={setModalShow}
          />
        </Modal>

        {/* Success and Error Messages */}
        {successMessage && (
          <BottomCallout
            message={successMessage}
            variant="success"
            visible={!!successMessage}
            setVisible={() => setSuccessMessage("")}
          />
        )}
        {errorMessage && (
          <BottomCallout
            message={errorMessage}
            variant="error"
            visible={!!errorMessage}
            setVisible={() => setErrorMessage("")}
          />
        )}

        {/* Family Members Listing */}
        {isLoading ? (
          <div className="flex-1 grow flex items-center justify-center">
            <Lottie
              animationData={LoadingAnimation}
              className="w-[15rem] h-[15rem]"
            />
          </div>
        ) : (
          <div className="flex flex-wrap -mx-2">
            {fam.map((member, index) => (
              <div key={index} className="">
                <FamilyMemberCard
                  member={member}
                  name={member.name}
                  nationalId={member.nationalId}
                  age={member.age}
                  gender={member.gender}
                  relationToPatient={member.relationToPatient}
                  onCardClick={() => handleCardClick(member)}
                  selectedMemberName={selectedMemberName}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Appointments Section (2/3 of the screen) */}
      <div className="flex-2 w-3/5 pl-4">
        <FamilyAppointments
          memberId={selectedMemberId}
          memberName={selectedMemberName}
        />
      </div>
    </div>
  );
}

export default Familymembers;

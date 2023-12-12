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
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const familyMembers = useSelector(
    (state) => state.viewFamilyMembersReducer.familyMember
  );
  const isLoading = useSelector(
    (state) => state.addFamilyMembersReducer.loading
  );

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
      })) || []
    );
  }, [familyMembers, modalShow, isLoading]);
  console.log(fam);

  const renderTabContent = () => {
    switch (selectedTab) {
      case "members":
        return (
          <div className="prof h-400 overflow-hidden  rounded-xl p-10 my-7">
            <h1 className="font-bold text-2xl mb-4">
              Family Members <Badge>{fam?.length}</Badge>
            </h1>

            <div className="flex justify-between">
              <Button
                variant="secondary"
                className="px-4 py-2 my-2 rounded"
                onClick={() => setModalShow(true)}
              >
                Add New Family Member
              </Button>
            </div>

            <Modal visible={modalShow} setVisible={setModalShow} famFlag={true}>
              <NewOrOldFamily
                setSuccess={setSuccessMessage}
                setError={setErrorMessage}
                visible={modalShow}
                setVisible={setModalShow}
              />
            </Modal>

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
                  <div
                    key={index}
                    className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                  >
                    <FamilyMemberCard
                      name={member.name}
                      nationalId={member.nationalId}
                      age={member.age}
                      gender={member.gender}
                      relationToPatient={member.relationToPatient}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "appointments":
        return <FamilyAppointments />;
      default:
        return null;
    }
  };

  return (
    <div className="m-4">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2">
          <button
            onClick={() => setSelectedTab("members")}
            className={`inline-block p-4 ${
              selectedTab === "members"
                ? "text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }`}
          >
            Members
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setSelectedTab("appointments")}
            className={`inline-block p-4 ${
              selectedTab === "appointments"
                ? "text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }`}
          >
            Appointments
          </button>
        </li>
      </ul>

      {renderTabContent()}
      {/* Rest of your existing component logic */}
    </div>
  );
}

export default Familymembers;

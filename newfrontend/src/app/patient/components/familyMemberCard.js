import React from "react";
import Image from "next/image";
import { Button } from "@tremor/react";
import HealthPackage from "@/app/admin/healthpackages/page";
import { cancelSubscription } from "@/app/redux/actions/patientActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PromptMessage from "@/components/PromptMessage";
const FamilyMemberCard = ({
  member,
  name,
  nationalId,
  age,
  gender,
  relationToPatient,
  onCardClick,
  selectedMemberName,
  selectedMemberId,
  healthPackage,
  patientId,
  setSuccess,
  patient,
}) => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector(
    (state) => state.cancelSubscriptionReducer
  );
  const [confirm, setConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const getImageUrl = (relation) => {
    switch (relation) {
      case "wife":
        return "/mother.jpg"; // Replace with your image path
      case "husband":
        return "/father.jpg";
      case "father":
        return "/child.jpg";
      default:
        return "/child.jpg"; // Default image
    }
  };
  const renderIcon = (type) => {
    switch (type) {
      case "name":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        );
      case "nationalId":
        return (
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
              />
            </svg>
          </span>
        );
      case "age":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"
            />
          </svg>
        );
      case "gender":
        return <Image src="/gender.svg" height={25} width={25} />;
      case "relation":
        return <Image src="/family.svg" height={25} width={25} />;
      default:
        return null;
    }
  };

  function handleCancellation() {
    console.log(patientId);
    dispatch(cancelSubscription(patientId));
    // setCancelConfirm(false);
    //6549f806f3ee984c4052aa62
    setSubmitted(true);
  }

  useEffect(() => {
    if (!loading && submitted) {
      // setSuccess("Family member added successfully");
      // setVisible(false);
      setConfirm(false);
      setSuccess("Subscription Cancelled Successfuly!");
      // setCred("");
      // Trigger onSuccess if provided
    } else if (!loading & submitted) {
      setSubmitted(false);
      // setError("Error adding family member");
    }
  }, [loading]);
  return (
    <div
      className={`m-4 max-w-md ${
        selectedMemberName == name &&
        "border-y-4 border-blue-500/100 shadow-lg shadow-blue-500/50 "
      } rounded-xl`}
      style={{ width: "350px" }}
      onClick={() => onCardClick(member)}
    >
      <div className="rounded-lg border border-gray-800 px-4 pt-8 pb-10 shadow-2xl">
        <div className="relative mx-auto w-40 h-36 rounded-full overflow-hidden mb-4">
          <Image
            src={getImageUrl(relationToPatient)}
            alt={`${relationToPatient}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="text-center text-xl font-bold leading-8 text-gray-400">
          {name}
        </h1>
        <div className="grid grid-cols-2 gap-4 mt-3 ms-10">
          <div className="flex items-center py-1 text-sm">
            {renderIcon("nationalId")}
            <span className="ml-2">{nationalId}</span>
          </div>
          <div className="flex items-center py-1 text-sm">
            {renderIcon("age")}
            <span className="ml-2">{age}</span>
          </div>
          <div className="flex items-center py-1 text-sm">
            {renderIcon("gender")}
            <span className="ml-2">{gender}</span>
          </div>
          <div className="flex items-center py-1 text-sm">
            {renderIcon("relation")}
            <span className="ml-2">{relationToPatient}</span>
          </div>
          {healthPackage?.name && (
            <div className="flex items-center py-1 text-sm">
              {renderIcon("relation")}
              <span className="ml-2">{healthPackage?.name} Package</span>
            </div>
          )}
          {healthPackage?.name && (
            <div className="flex items-center py-1 text-sm">
              {renderIcon("relation")}
              <span className="ml-2">{patient.subscriptionStatus} </span>
            </div>
          )}
          {healthPackage?.name && (
            <div className="flex items-center py-1 text-sm">
              {renderIcon("relation")}
              <span className="ml-2">{patient.renewalDate} </span>
            </div>
          )}
          {healthPackage?.name && (
            <div className="flex items-center py-1 text-sm">
              {renderIcon("relation")}
              <span className="ml-2">{patient.cancellationEndDate} </span>
            </div>
          )}
        </div>
        <div
          className="flex justify-center"
          style={{
            overflow: "hidden",
            height: `${
              healthPackage?.name !== undefined && selectedMemberName == name
                ? "50px"
                : "0px"
            }`,
          }}
        >
          <Button
            className="border border-purple-500 text-purple-500 px-4 py-2 mt-4 rounded bg-indigo"
            onClick={() => {
              setConfirm(true);
              console.log("hey");
            }}
          >
            cancel subscription
          </Button>
          <PromptMessage
            visible={confirm}
            setVisible={setConfirm}
            onConfirm={handleCancellation}
            onCancel={() => setConfirm(false)}
            confirmLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyMemberCard;

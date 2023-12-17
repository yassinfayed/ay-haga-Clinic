"use client";
import SubscribeModal from "@/app/patient/components/SubscribeModal";
import { cancelSubscription } from "@/app/redux/actions/patientActions";
import { formatDateToDDMMYYYY } from "@/app/redux/validators";
import { Button } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PromptMessage from "./PromptMessage";

const PricingCard = ({ hp, patient, discount }) => {
  const [healthPackage, setHealthPackage] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  function handleCancellation() {
    dispatch(cancelSubscription(patient._id));
    setSubmitted(true);
    // setCancelConfirm(false);
    //6549f806f3ee984c4052aa62
  }
  const [confirm, setConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { loading, success } = useSelector(
    (state) => state.cancelSubscriptionReducer
  );
  useEffect(() => {
    if (!loading && submitted) {
      // setSuccess("Family member added successfully");
      // setVisible(false);
      setConfirm(false);
      // setSuccess("Subscription Cancelled Successfuly!");
      // setCred("");
      // Trigger onSuccess if provided
    } else if (!loading & submitted) {
      setSubmitted(false);
      // setError("Error adding family member");
    }
  }, [loading]);

  const cardClasses = `
    w-full max-w-sm p-4 bg-white rounded-lg shadow sm:p-8 dark:bg-gray-800
    ${
      patient?.package === hp._id
        ? "border-4 border-blue-500"
        : "border border-gray-200 dark:border-gray-700"
    }
  `;
  const { success: orderSuccess, loading: orderLoading } = useSelector(
    (state) => state.orderReducer
  );
  useEffect(() => {
    if (orderSuccess == true) setShow(false);
  }, [orderSuccess]);
  return (
    <div
      style={{ marginRight: "50px", marginLeft: "50px" }}
      className={cardClasses}
    >
      <h5 className="mb-4 text-xl font-medium  text-gray-500 dark:text-gray-400">
        {hp?.name}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span
          className={
            discount ? `text-xl  line-through` : "text-3xl  font-semibold"
          }
        >
          EGP
        </span>
        <span
          className={
            discount
              ? `text-2xl font-extrabold tracking-tight line-through`
              : "text-5xl font-extrabold tracking-tight"
          }
        >
          {hp?.ogprice}
        </span>
        <span
          className={
            discount
              ? "ms-1 text-xl font-normal text-gray-500 line-through dark:text-gray-400"
              : "ms-1 text-xl font-normal text-gray-500  dark:text-gray-400"
          }
        >
          /year
        </span>
      </div>
      {discount && (
        <div className="flex items-baseline text-gray-900 dark:text-white">
          <span className="text-3xl font-semibold">EGP</span>
          <span className="text-5xl font-extrabold tracking-tight">
            {hp?.price?.toFixed(2)}
          </span>
          <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
            /year
          </span>
        </div>
      )}
      <ul role="list" className="space-y-5 my-7">
        <li className="flex items-center">
          <svg
            className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            <strong className="text-primary">{hp?.doctorDiscount}%</strong> off
            any doctor's appointment.
          </span>
        </li>
        <li className="flex">
          <svg
            className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            <strong className="text-primary">{hp?.medicineDiscount}%</strong>{" "}
            off any medicine ordered from our pharmacy platform.
          </span>
        </li>
        <li className="flex">
          <svg
            className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            <strong className="text-primary">{hp?.familyDiscount}%</strong>{" "}
            discount on subscriptions of family members in any package.
          </span>
        </li>
      </ul>

      <div
        className={`grid grid-cols-1 gap-4 ${
          patient?.package === hp._id &&
          patient?.subscriptionStatus === "subscribed"
            ? "md:grid-cols-2"
            : "md:grid-cols-1"
        }`}
      >
        {patient?.package === hp._id &&
          patient?.subscriptionStatus === "subscribed" && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setConfirm(true);
                console.log("hey");
              }}
              color="red"
              className="text-white  focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            >
              Cancel subscription
            </Button>
          )}

        <Button
          type="button"
          variant="primary"
          onClick={() => {
            setHealthPackage(hp);
            setShow(true);
          }}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        >
          <span className="text-white font-semibold">Choose Plan</span>
        </Button>
        <PromptMessage
          visible={confirm}
          setVisible={setConfirm}
          onConfirm={handleCancellation}
          onCancel={() => setConfirm(false)}
          confirmLoading={loading}
        />

        {show && (
          <SubscribeModal
            title={`Subscribe to our ${hp?.name} Health Package`}
            subheader={``}
            subscribed={
              patient?.subscriptionStatus === "subscribed" ||
              patient?.subscriptionStatus == "cancelled"
            }
            visible={show}
            loading={orderLoading}
            setVisible={setShow}
            patient={patient}
            onHide={() => {
              setShow(false);
            }}
            id={hp?._id}
            healthPackage={hp}
          />
        )}
      </div>

      {patient?.package == hp._id &&
        patient?.subscriptionStatus == "cancelled" && (
          <>
            <div className="text-muted text-center ">
              <small>
                Subscription will end on <br />
                {formatDateToDDMMYYYY(patient.cancellationEndDate)}
              </small>
            </div>
          </>
        )}
    </div>
  );
};

export default PricingCard;

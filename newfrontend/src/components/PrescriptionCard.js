import React, { useState } from "react";
import { Button } from "@tremor/react";
import { useDispatch } from "react-redux";

import { downloadPrescription } from "@/app/redux/actions/prescriptionsActions";
import { CheckoutToPharmacy } from "@/app/redux/services/getMedicinesFromPharmacy";
import { BottomCallout } from "./BottomCallout";

const PrescriptionCard = ({
  id,
  prescriptionDate,
  doctorName,
  medicines,
  filled,
}) => {
  console.log(filled);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ width: "100%" }} className="max-w-md mx-auto">
      <div
        className="rounded-lg border border-gray-800 px-4 pt-8 shadow-lg flex flex-col"
        style={{ minHeight: "500px" }}
      >
        <div className="mb-4 flex-grow">
          <h2 className="text-xl font-bold leading-8 text-gray-400 text-center">
            Prescription Details
          </h2>
          <div className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600 mt-4">
            <p>Date: {prescriptionDate}</p>
            <p>Doctor Name: {doctorName}</p>
          </div>
          <div className="mt-3">
            <h3 className="font-lg text-semibold leading-6 text-gray-600 text-center">
              Medicines
            </h3>
            {medicines && medicines.length > 0 ? (
              <table className="min-w-full text-sm text-gray-500 mt-2">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Medicine</th>
                    <th className="text-left py-2 px-4">Dosage</th>
                    <th className="text-left py-2 px-4">Frequency</th>
                    <th className="text-left py-2 px-4">From - To</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((medicine, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{medicine.medicine}</td>
                      <td className="py-2 px-4">{medicine.dosage}</td>
                      <td className="py-2 px-4">{medicine.frequency}</td>
                      <td className="py-2 px-4">
                        {formatDate(medicine.startDate)} -{" "}
                        {formatDate(medicine.endDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No Medicines Found</p>
            )}
          </div>
        </div>
        {id && (
          <div className="flex justify-center mb-5">
            <Button
              className="border   mx-6 px-4 py-2 rounded"
              color="blue"
              onClick={() => {
                dispatch(downloadPrescription(id));
              }}
            >
              Download Prescription
            </Button>
            {!filled &&
              JSON.parse(localStorage.getItem("userInfo"))?.data.user.role ==
                "patient" && (
                <Button
                  className="border mx-6 px-4 py-2 rounded"
                  color="blue"
                  onClick={() => {
                    CheckoutToPharmacy(medicines, id);
                    setLoading(true);
                  }}
                >
                  Submit to Pharmacy
                </Button>
              )}
          </div>
        )}
      </div>
      {loading && (
        <BottomCallout
          variant="success"
          message="Adding your items to cart and redirecting to Pharmacy, Please wait..."
          visible={true}
          setVisible={(bro) => console.log("void")}
        />
      )}
    </div>
  );
};

export default PrescriptionCard;

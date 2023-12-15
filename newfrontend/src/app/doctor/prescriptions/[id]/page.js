"use client";
import { viewALLPrescriptions } from "@/app/redux/actions/prescriptionsActions";
import { BottomCallout } from "@/components/BottomCallout";
import PrescriptionCard from "@/components/PrescriptionCard";
import TableComponent from "@/components/Table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToDDMMYYYY } from "../../../redux/validators";
import { DateRangePicker } from "@tremor/react";
import AddPrescription from "../../components/AddPrescription";
import {
  createPrescription,
  updatePrescription,
} from "@/app/redux/actions/prescriptionsActions";
import { fetchMedicines } from "@/app/redux/services/getMedicinesFromPharmacy";

const Prescriptions = ({ params }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const onViewFiles = (pharmId) => {
    //   dispatch(downloadPharmacistDocs(pharmId));
  };
  const { prescription, loading } = useSelector(
    (state) => state.viewAllPrescriptionsReducer
  );
  const [open, setOpen] = useState(false);
  const [medicines, setMedicines] = useState([
    { medicine: "", dosage: "", frequency: "", startDate: null, endDate: null },
  ]);
  const [instructions, setInstructions] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState();
  const [edited, setEdited] = useState(false);

  async function fetchData() {
    const queryObj = {
      patientID: params.id,
    };

    dispatch(viewALLPrescriptions(queryObj));
  }

  const [freeze, setFreeze] = useState(false);

  const handleSelect = (id) => {
    setSelected(prescriptionList.find((item) => item._id === id));
    setFreeze(true);
  };

  const prescriptionList = useMemo(() => {
    return prescription?.data?.map(
      ({
        _id,
        prescriptionDate,
        doctorId,
        medicines,
        instructions,
        filled_unfilled,
      }) => ({
        _id,
        prescriptionDate: formatDateToDDMMYYYY(prescriptionDate),
        doctorName: doctorId.name,
        medicines,
        instructions,
        filled_unfilled: filled_unfilled ? "Filled" : "Unfilled",
      })
    );
  }, [prescription]);

  useEffect(() => {
    fetchData();
  }, [dispatch, refresh]);

  const handleSubmit = () => {
    if (edited) {
      const newPrescription = {
        medicines: medicines,
      };
      dispatch(updatePrescription(id, newPrescription));
      setEdited(false);
      setId(null);
    } else {
      const newPrescription = {
        patientId: params.id,
        prescriptionDate: new Date(),
        doctorId: JSON.parse(localStorage.getItem("userInfo"))?.data.user.doctor
          ?._id,
        medicines: medicines,
        filled_unfilled: false,
      };
      dispatch(createPrescription(newPrescription));
    }
    setOpen(false);
    setRefresh(!refresh);
  };

  const buttons = {
    right: {
      label: "Download",
      size: "xs",
      variant: "secondary",
      color: "rose",
      className: "mx-2",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      ),
      onClick: (e) => dispatch(),
    },
    left: {
      label: "Accept",
      size: "xs",
      variant: "secondary",
      color: "green",
      className: "mx-2",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
      onClick: (e) => dispatch(adminAcceptPharmacist(selected.pharmacistID)),
    },
  };

  //CROSS PLATFORM

  return (
    <>
      <>
        <div className="w-full flex flex-row gap-4 mb-4 divide-x divide-gray-400">
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Prescription
          </button>
        </div>

        {open && (
          <AddPrescription
            medicines={medicines}
            setMedicines={setMedicines}
            instructions={instructions}
            setInstructions={setInstructions}
            handleSubmit={handleSubmit}
          />
        )}
        <div className="flex overflow-hidden gap-x-4 gap-y-8">
          <div className="prof h-400 overflow-hidden w-4/6 rounded-xl p-10">
            <TableComponent
              setSelected={setSelected}
              rows={prescriptionList}
              columns={["Prescription Date", "Filled/Unfilled"]}
              fields={["prescriptionDate", "filled_unfilled"]}
              freeze={freeze}
              filters={<DateRangePicker className="z-10" />}
              buttons={[
                {
                  size: "xs",
                  variant: "secondary",
                  label: "Select",
                  className: "mx-2",
                  icon: () => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4 px"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                      />
                    </svg>
                  ),
                  function: (id) => handleSelect(id),
                },
                {
                  size: "xs",
                  variant: "secondary",
                  label: "Update Prescription",
                  className: "mx-2",
                  icon: () => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4 px"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                      />
                    </svg>
                  ),
                  function: (id, e) => {
                    setMedicines(selected.medicines);
                    setInstructions(selected.instructions);
                    setId(selected._id);
                    setEdited(true);
                    setOpen(true);
                  },
                },
              ]}
              badgeColumns={[]}
              title={"View Prescriptions"}
            />
          </div>

          <div className="prof h-400 overflow-hidden w-2/6 rounded-xl p-10">
            <PrescriptionCard
              prescriptionDate={selected?.prescriptionDate}
              patientName={selected?.patientId}
              doctorName={selected?.doctorName}
              medicines={selected?.medicines}
              instructions={selected?.instructions}
              id={selected?._id}
            />
          </div>
        </div>
      </>
    </>
  );
};

export default Prescriptions;

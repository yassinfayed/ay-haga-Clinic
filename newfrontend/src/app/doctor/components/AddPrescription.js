import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  DatePicker,
  SelectItem,
  Select,
} from "@tremor/react";
import { fetchMedicines } from "@/app/redux/services/getMedicinesFromPharmacy";

const MedicineInputFields = ({
  med,
  index,
  handleMedicineChange,
  deleteMedicine,
  medicines,
}) => (
  <div className="mb-4">
    <Select
      placeholder="Medicine"
      value={med.medicine}
      className="mb-4"
      onValueChange={(e) => {
        handleMedicineChange(index, "medicine", e);
      }}
      required
    >
      {medicines?.map((mem, index) => (
        <SelectItem key={index} value={mem.name}>
          {`\xa0\xa0\xa0`}
          {mem.name}
        </SelectItem>
      ))}
    </Select>
    <TextInput
      placeholder="Dosage (in mg)"
      value={med.dosage}
      type="number"
      onValueChange={(e) => handleMedicineChange(index, "dosage", e)}
      className="mb-4"
      required
    />
    <TextInput
      placeholder="Frequency"
      value={med.frequency}
      onValueChange={(e) => handleMedicineChange(index, "frequency", e)}
      className="mb-4"
      required
    />
    <DatePicker
      placeholder="Start Date"
      value={med.startDate && new Date(med.startDate)}
      onValueChange={(date) => handleMedicineChange(index, "startDate", date)}
      className="mb-4"
      required
    />
    <DatePicker
      placeholder="End Date"
      value={med.endDate && new Date(med.endDate)}
      onValueChange={(date) => handleMedicineChange(index, "endDate", date)}
      className="mb-4"
      required
    />
    <Button color="rose" onClick={() => deleteMedicine(index)}>
      Delete Medicine
    </Button>
  </div>
);
const AddPrescription = ({
  medicines,
  setMedicines,
  instructions,
  setInstructions,
  handleSubmit,
  setVisible,
}) => {
  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = medicines.map((med, i) => {
      if (i === index) {
        return { ...med, [field]: value };
      }
      return med;
    });

    setMedicines(updatedMedicines);
  };
  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        medicine: "",
        dosage: "",
        frequency: "",
        startDate: null,
        endDate: null,
      },
    ]);
  };
  const deleteMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  const [pMedicines, setPMedicines] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const meds = await fetchMedicines();
      setPMedicines(meds.data);
      console.log(meds.data);
    };
    fetchData();
  }, []);
  return (
    <div
      style={{ width: "100%" }}
      className="max-w-md mx-auto absolute inset-7  z-20 bg-gray-800 h-min"
    >
      <div className="flex flex-row w-100 m-4">
        <div
          role="button"
          onClick={() => setVisible(false)}
          className="ms-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div
        className="rounded-lg border border-gray-800 px-4 pt-8 shadow-lg flex flex-col"
        style={{ minHeight: "500px" }}
      >
        <h2 className="text-xl font-bold leading-8 text-gray-400 text-center mb-4">
          Add New Prescription
        </h2>
        <div className="flex flex-col space-y-4 mb-4">
          {medicines.map((med, index) => (
            <MedicineInputFields
              med={med}
              index={index}
              key={`medicine-${index}`}
              handleMedicineChange={handleMedicineChange}
              deleteMedicine={deleteMedicine}
              medicines={pMedicines}
            />
          ))}
          <div className="mb-4">
            <Button onClick={addMedicine} variant="secondary">
              Add New Medicine
            </Button>
          </div>

          <Button className="mt-4" onClick={handleSubmit}>
            Submit Prescription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPrescription;

import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  DatePicker,
  SelectItem,
  Select,
  DateRangePicker,
  NumberInput,
  Accordion,
  AccordionHeader,
  AccordionList,
  AccordionBody,
  Card,
} from "@tremor/react";
import { fetchMedicines } from "@/app/redux/services/getMedicinesFromPharmacy";
import { Modal } from "@/components/Modal";

const MedicineInputFields = ({
  med,
  index,
  handleMedicineChange,
  deleteMedicine,
  medicines,
}) => (
  <div className="mt-4">
    <div className="flex justify-center items-center">
      <Select
        placeholder="Medicine"
        value={med.medicine}
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

      <svg role="button" onClick={() => deleteMedicine(index)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff4444" className="w-6 h-6 mx-5">
        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
      </svg>


    </div>
    <div className="my-4">
      <h1>Frequency & Dosage</h1>
      <div className="flex gap-2 mt-2">
        <NumberInput
          placeholder="Dosage (in mg)"
          value={med.dosage}
          type="number"
          onValueChange={(e) => handleMedicineChange(index, "dosage", e)}
          required
        />

        <NumberInput
          placeholder="Number"
          onChange={
            (e) => {
              let val = e.target.value;
              let interval = med.frequency.split(' ');
              interval.shift();
              interval = interval.join(' ');

              const final = val + ' ' + interval;
              handleMedicineChange(index, 'frequency', final);
              console.log(final);
            }
          }
        />

        <Select onChange={(e) => { handleMedicineChange(index, "frequency", med.frequency.split(' ')[0] + ' ' + e) }} placeholder="Interval">
          <SelectItem value="per Hour">Per Hour</SelectItem>
          <SelectItem value="per Day">Per Day</SelectItem>
          <SelectItem value="per Week">Per Week</SelectItem>
          <SelectItem value="per Month">Per Month</SelectItem>
          <SelectItem value="per Year">Per Year</SelectItem>
        </Select>
      </div>
    </div>

    <div className="my-4">
      <h1>Date of usage</h1>
      <div className="flex gap-2 mt-2">
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
      </div>
    </div>
  </div >
);
const AddPrescription = ({
  medicines,
  setMedicines,
  instructions,
  setInstructions,
  handleSubmit,
  visible,
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
  const [open, setOpen] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const meds = await fetchMedicines();
      setPMedicines(meds.data);
      console.log(meds.data);
    };
    fetchData();
  }, []);
  return (
    <Modal
      className="w-1/2"
      visible={visible}
      setVisible={setVisible}
    >
      <div
        className="rounded-lg flex flex-col px-1 overflow-y-auto"
        style={{ minHeight: "500px" }}
      >
        <h2 className="text-xl font-bold leading-8 text-gray-400 text-center mb-4">
          Add New Prescription
        </h2>
        <div className="flex flex-col space-y-4 w-full mb-4">

          {medicines.map((med, index) => (
            <Card>
              <div role="button" onClick={() => setOpen(index)} className="flex w-full justify-between mb-2">
                <h1>
                  Item #{index + 1}
                </h1>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{rotate: open === index ? '180deg' : '0deg'}}>
                  <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                </svg>

              </div>

              {
                open === index &&
                <MedicineInputFields
                  med={med}
                  index={index}
                  key={`medicine-${index}`}
                  handleMedicineChange={handleMedicineChange}
                  deleteMedicine={deleteMedicine}
                  medicines={pMedicines}
                />
              }

            </Card>
          ))}
          <div className="mb-4">
            <Button onClick={addMedicine} variant="secondary">
              Add New Medicine
            </Button>
          </div>

          <Button className="mt-4" onClick={handleSubmit}>
            <span className="text-white">Submit Prescription</span>
          </Button>
        </div>
      </div>
    </Modal >
  );
};

export default AddPrescription;

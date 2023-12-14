import React, { useState } from 'react';
import { Button, Input, DatePicker, Switch } from '@tremor/react';
const AddPrescription = ({ isOpen, setIsOpen, medicines, setMedicines, instructions, setInstructions, filledUnfilled, setFilledUnfilled, handleSubmit }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { medicine: '', dosage: '', frequency: '', startDate: null, endDate: null }]);
  };

  const handleSubmit = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ width: "100%" }} className="max-w-md mx-auto">
      <div className="rounded-lg border border-gray-800 px-4 pt-8 shadow-lg flex flex-col" style={{ minHeight: '500px' }}>
        <h2 className="text-xl font-bold leading-8 text-gray-400 text-center mb-4">Add New Prescription</h2>

        {medicines.map((med, index) => (
          <div key={index} className="mb-4">
            <Input
              placeholder="Medicine"
              value={med.medicine}
              onChange={(e) => handleMedicineChange(index, 'medicine', e.target.value)}
            />
            <Input
              placeholder="Dosage"
              value={med.dosage}
              onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
            />
            <Input
              placeholder="Frequency"
              value={med.frequency}
              onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
            />
            <DatePicker
              placeholder="Start Date"
              selected={med.startDate}
              onChange={(date) => handleMedicineChange(index, 'startDate', date)}
            />
            <DatePicker
              placeholder="End Date"
              selected={med.endDate}
              onChange={(date) => handleMedicineChange(index, 'endDate', date)}
            />
          </div>
        ))}
        <Button onClick={addMedicine}>Add Medicine</Button>

        <Input
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <div className="mt-4">
          <label className="flex items-center space-x-3">
            <Switch checked={filledUnfilled} onChange={setFilledUnfilled} />
            <span>Prescription Filled</span>
          </label>
        </div>

        <Button className="mt-4" onClick={handleSubmit}>Submit Prescription</Button>
      </div>
    </div>
  );
};

export default AddPrescription;

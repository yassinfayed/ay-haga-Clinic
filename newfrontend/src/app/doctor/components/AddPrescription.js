import React from 'react';
import { Button, TextInput, DatePicker } from '@tremor/react';

const MedicineInputFields = ({ med, index , handleMedicineChange
}) => (
  <div className="mb-4">
    <TextInput
      placeholder="Medicine"
      value={med.medicine}
      onChange={(e) => handleMedicineChange(index, 'medicine', e.target.value)}
      className='mb-4'
    />
       <TextInput
      placeholder="Dosage"
      value={med.dosage}
      onValueChange={(e) => handleMedicineChange(index, 'dosage', e)}
      className='mb-4'
    />
    <TextInput
      placeholder="Frequency"
      value={med.frequency}
      onValueChange={(e) => handleMedicineChange(index, 'frequency', e)}
      className='mb-4'
    />
    <DatePicker
      placeholder="Start Date"
      value={med.startDate&&
        new Date(med.startDate)}
      onValueChange={(date) => handleMedicineChange(index, 'startDate', date)}
      className='mb-4'
    />
    <DatePicker
      placeholder="End Date"
      value={med.endDate&&
        new Date(med.endDate)}
      onValueChange={(date) => handleMedicineChange(index, 'endDate', date)}
      className='mb-4'
    />
  </div>
);
const AddPrescription = ({
  medicines,
  setMedicines,
  instructions,
  setInstructions,
  handleSubmit
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
    setMedicines([...medicines, { medicine: '', dosage: '', frequency: '', startDate: null, endDate: null }]);
  };


  return (
    <div style={{ width: "100%" }} className="max-w-md mx-auto absolute inset-7  z-20 bg-gray-800 h-min">
      <div className="rounded-lg border border-gray-800 px-4 pt-8 shadow-lg flex flex-col" style={{ minHeight: '500px' }}>
        <h2 className="text-xl font-bold leading-8 text-gray-400 text-center mb-4">Add New Prescription</h2>
        <div className="flex flex-col space-y-4 mb-4">
          {medicines.map((med, index) => (
            <MedicineInputFields med={med} index={index} key={`medicine-${index}`
            } handleMedicineChange={handleMedicineChange} 
            />
          ))}
          <Button onClick={addMedicine}>Add Medicine</Button>
         
        <TextInput
          placeholder="Instructions"
          value={instructions}
          onValueChange={(e) => setInstructions(e)}
        />

        <Button className="mt-4" 
        onClick={handleSubmit}
        
        >Submit Prescription</Button>
        </div>
      </div>
    </div>
  );
};

export default AddPrescription;

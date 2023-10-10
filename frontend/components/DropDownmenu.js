import React, { useState } from 'react';

const GenderDropdown = () => {
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  return (
    <div className="gender-dropdown">
      <label htmlFor="gender" className="label">Select your gender:</label>
      <select
        id="gender"
        value={selectedGender}
        onChange={handleGenderChange}
        className="select"
      >
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      {selectedGender && (
        <div className="selected-gender">
          You selected: {selectedGender}
        </div>
      )}
    </div>
  );
}

export default GenderDropdown;

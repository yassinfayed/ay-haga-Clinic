import React, { useEffect, useState } from "react";
import { Button } from "@tremor/react";
import AddFamily from "./AddFamilyMemberModal";
import LinkFamily from "./LinkFamilyMemberModal";
import "./component.css";

function NewOrOldFamilyMember({
  title,
  subheader,
  setSuccess,
  setError,
  visible,
  setVisible,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    setSelectedOption("");
  }, [visible]);

  const renderModalContent = () => {
    switch (selectedOption) {
      case "new":
        return (
          <AddFamily
            show={true}
            onHide={() => setSelectedOption(null)}
            setSuccess={setSuccess}
            setError={setError}
            visible={visible}
            setVisible={setVisible}
          />
        );
      case "link":
        return (
          <LinkFamily
            show={true}
            onHide={() => setSelectedOption(null)}
            setSuccess={setSuccess}
            setError={setError}
            visible={visible}
            setVisible={setVisible}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`p-4 `}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p>{subheader}</p>
      <div className="flex justify-center mt-4">
        <Button
          className={`mx-2 ${
            selectedOption === "link"
              ? "animate-expand-right "
              : selectedOption === "new"
              ? "animate-shrink-right"
              : ""
          }`}
          onClick={() => handleSelectOption("link")}
        >
          Link Existing Family Member
        </Button>
        <Button
          className={`mx-2 ${
            selectedOption === "new"
              ? "animate-expand-left"
              : selectedOption === "link"
              ? "animate-shrink-left"
              : ""
          }`}
          onClick={() => handleSelectOption("new")}
        >
          Add New Family Member
        </Button>
      </div>
      {renderModalContent()}
    </div>
  );
}

export default NewOrOldFamilyMember;

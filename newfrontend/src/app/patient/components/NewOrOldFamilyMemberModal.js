import React, { useState } from "react";
import { Button } from "@tremor/react";
import { Modal } from "../../../components/Modal"; // Assuming this is your custom Modal component
import AddFamily from "./AddFamilyMemberModal";
import LinkFamily from "./LinkFamilyMemberModal";

function NewOrOldFamilyMember({
  title,
  subheader,
  onHide,
  onSuccess,
  onError,
}) {
  const [newShow, setNewShow] = useState(false);
  const [oldShow, setOldShow] = useState(false);

  return (
    <Modal visible={true} setVisible={onHide}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p>{subheader}</p>
        <div className="flex justify-center mt-4">
          <Button className="mx-2" onClick={() => setOldShow(true)}>
            Existing Family Member
          </Button>
          <Button className="mx-2" onClick={() => setNewShow(true)}>
            New Family Member
          </Button>
        </div>
      </div>

      {newShow && (
        <AddFamily
          show={newShow}
          onHide={() => setNewShow(false)}
          onSuccess={onSuccess}
          onError={onError}
          setVisible={onHide} // Pass setVisible to AddFamily
        />
      )}

      {oldShow && (
        <LinkFamily
          show={oldShow}
          onHide={() => setOldShow(false)}
          onSuccess={onSuccess}
          onError={onError}
          setVisible={onHide} // Pass setVisible to LinkFamily
        />
      )}
    </Modal>
  );
}

export default NewOrOldFamilyMember;

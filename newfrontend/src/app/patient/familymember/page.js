"use client";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewFamilyMembers } from "@/app/redux/actions/FamilyMembersAction";
import { BottomCallout } from "@/components/BottomCallout";
import { Modal } from "@/components/Modal";
import { Button, Card, Grid } from "@tremor/react";
import NewOrOldFamily from "@/app/patient/components/NewOrOldFamilyMemberModal";
import Lottie from "lottie-react";
import LoadingAnimation from "../../../../public/loading.json";

function Familymembers() {
  const [modalShow, setModalShow] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const dispatch = useDispatch();

  const familyMembers = useSelector(
    (state) => state.viewFamilyMembersReducer.familyMember
  );
  const isLoading = useSelector(
    (state) => state.addFamilyMembersReducer.loading
  );

  useEffect(() => {
    dispatch(viewFamilyMembers());
  }, [dispatch, isLoading, modalShow]);

  const fam = useMemo(() => {
    return (
      familyMembers?.data?.map((value) => ({
        name: value?.linkedPatientId?.name,
        nationalId: value?.nationalId,
        age: value?.age,
        gender: value?.linkedPatientId?.gender,
        relationToPatient: value?.relationToPatient,
      })) || []
    );
  }, [familyMembers, modalShow, isLoading]);

  return (
    <Card className="grow flex-1 flex flex-col m-4">
      <h1 className="font-bold text-2xl mb-4">Family Members</h1>

      <div className="flex justify-between">
        <Button
          variant="secondary"
          className="px-4 py-2 my-2 rounded"
          onClick={() => setModalShow(true)}
        >
          Add New Family Member
        </Button>
      </div>

      <Modal visible={modalShow} setVisible={setModalShow}>
        <NewOrOldFamily
          onSuccess={() => setSuccessAlert(true)}
          onError={() => setErrorAlert(true)}
        />
      </Modal>

      {successAlert && (
        <BottomCallout
          message="Family member added successfully"
          variant="success"
          visible={successAlert}
          setVisible={setSuccessAlert}
        />
      )}

      {errorAlert && (
        <BottomCallout
          message="Family member was not added"
          variant="error"
          visible={errorAlert}
          setVisible={setErrorAlert}
        />
      )}

      {isLoading ? (
        <div className="flex-1 grow flex items-center justify-center">
          <Lottie
            animationData={LoadingAnimation}
            className="w-[15rem] h-[15rem]"
          />
        </div>
      ) : (
        <Grid numItems={1} numItemsMd={2} numItemsLg={3} className="mt-3 gap-4">
          {fam.map((familymember, index) => (
            <Card
              key={index}
              className="p-4"
              title={familymember.name}
              subtitle={`National ID: ${familymember.nationalId}`}
              body={
                <>
                  Age: {familymember.age}
                  <br />
                  Gender: {familymember.gender}
                  <br />
                  Relation to Patient: {familymember.relationToPatient}
                </>
              }
            />
          ))}
        </Grid>
      )}
    </Card>
  );
}

export default Familymembers;

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewFamilyMembers } from "@/app/redux/actions/FamilyMembersAction";
import { makeOrder } from "@/app/redux/actions/paymentActions";
import { Modal } from "@/components/Modal";
import { Button, Divider, Select, SelectItem } from "@tremor/react";
import { viewPatientDetails } from "@/app/redux/actions/patientActions";

function ReserveModal(props) {
  const { title, subheader, edit, id, healthPackage,hourlyRate,selectedDate,
success,reserveloading } = props;

  const dispatch = useDispatch();

  const [packageReciever, setPackageReciever] = useState(null);
  const [familyMember, setFamilyMember] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState(false);

  const patientDetails = useSelector((state) => state.patientViewMyDetailsReducer.patient);
  const patientLoading = useSelector((state) => state.patientViewMyDetailsReducer.loading);

  const health = useMemo(() => {
    return patientDetails?.patient?.package?.doctorDiscount || 0;
}, [patientDetails, patientLoading]);
  const { loading, error, session } = useSelector(
    (state) => state.orderReducer
  );
  const familyMembers = useSelector(
    (state) => state.viewFamilyMembersReducer.familyMember
  );
  const isLoading = useSelector(
    (state) => state.addFamilyMembersReducer.loading
  );

  async function fetchData() {
    dispatch(viewPatientDetails());
    dispatch(viewFamilyMembers());
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, isLoading]);
  useEffect(() => {
    if(success)
    {
        props.setVisible(false)
    }
  }, [dispatch, success]);

  useEffect(() => {}, [error, submitted, session, loading, props]);

  const fam = useMemo(() => {
    if (familyMembers && familyMembers.data) {
      return familyMembers.data.map((value) => ({
        _id: value._id,
        name: value.name,
        nationalId: value.nationalId,
        age: value.age,
        gender: value.gender,
        relationToPatient: value.relationToPatient,
      }));
    }
    return [];
  }, [familyMembers, isLoading]);

  const handleRecieverChange = (e) => {
    setPackageReciever(e.target.value);
  };

  const handleFamilyMemberChange = (e) => {
    console.log(e);
    setFamilyMember(e);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !packageReciever ||
      (packageReciever === "family" && !familyMember) ||
      !paymentMethod
    ) {
      setAlert(true);
      return;
    }

    const price = health ? (hourlyRate - (hourlyRate * (health / 100))) : hourlyRate

        if (familyMember === null)
        dispatch(makeOrder({
            date: selectedDate,
            doctor: id,
            price,
            paymentMethod,
            reserve: true
        }));

        else dispatch(makeOrder({
            date: selectedDate,
            doctor: id,
            price,
            paymentMethod,
            reserve: true
        }, familyMember));


        setFamilyMember(null);
        setPackageReciever(null);
        setPaymentMethod(null);
        setSubmitted(true);

  };

  return (
    <Modal visible={props.visible} setVisible={props.setVisible}>
      <div className="p-4 flex flex-col">
        <h1 className="text-center my-2">{title}</h1>

        <div className="flex-[2] my-2">
          <input
            type="radio"
            id="me"
            name="packageReceiver"
            value="me"
            checked={packageReciever === "me"}
            onChange={(e) => handleRecieverChange(e)}
            className="mr-2"
          />
          <label htmlFor="me" className="mr-4 cursor-pointer">
            Me
          </label>

          <input
            type="radio"
            id="family"
            name="packageReceiver"
            value="family"
            checked={packageReciever === "family"}
            onChange={(e) => handleRecieverChange(e)}
            className="mr-2"
          />
          <label htmlFor="family" className="cursor-pointer">
            Family Member
          </label>
        </div>
        <br />

        <div className="flex-[2] my-2">
          <input
            type="radio"
            id="me"
            name="paymentMethod"
            value="wallet"
            // disabled={ JSON.parse(localStorage.getItem('userInfo')).data.user.wallet === undefined || JSON.parse(localStorage.getItem('userInfo')).data.user.wallet < healthPackage?.price }
            checked={paymentMethod === "wallet"}
            onChange={(e) => handlePaymentChange(e)}
          />
          <label className="mr-4 cursor-pointer">Wallet</label>

          <input
            type="radio"
            label="Credit Card"
            name="paymentMethod"
            value="Stripe"
            className="mr-2"
            checked={paymentMethod === "Stripe"}
            onChange={(e) => handlePaymentChange(e)}
          />
          <label className="cursor-pointer">Credit card</label>
        </div>
        <div className="my-4 flex-[2] md:w-3/5">
          <Select
            placeholder={`Choose family member`}
              disabled={packageReciever !== "family"}
            className="mr-2"
            value={familyMember}
            onValueChange={(e) => {
              console.log(e);
              handleFamilyMemberChange(e);
            }}
            required
          >
            {fam?.map((mem, index) => (
              <SelectItem key={index} value={mem._id}>
                {`\xa0\xa0\xa0`}
                {mem.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Divider></Divider>
        {health ? (
                <>
                    <div className='line-through'>
                                    {hourlyRate.toFixed(2)}                                        </div>
                                    <div className=''>
                                        {(hourlyRate - (hourlyRate * (health / 100))).toFixed(2)}
                                    </div>
                                </>
                            ) : (
                                <div>                                            {hourlyRate.toFixed(2)}
                            </div>
                                )}
        <div className="my-4 flex-[2] md:w-3/5">
            
          <Button disabled={ !paymentMethod || !packageReciever || (packageReciever == 'family' && !familyMember)} loading={ loading} onClick={handleSubmit}> Reserve</Button>
        </div>
      </div>
    </Modal>
  );
}

export default ReserveModal;
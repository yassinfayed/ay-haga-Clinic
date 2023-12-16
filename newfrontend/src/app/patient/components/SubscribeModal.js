import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewFamilyMembers } from "@/app/redux/actions/FamilyMembersAction";
import { makeOrder } from "@/app/redux/actions/paymentActions";
import { Modal } from "@/components/Modal";
import { Button, Divider, Select, SelectItem } from "@tremor/react";

function SubscribeModal(props) {
  const {
    title,
    subheader,
    edit,
    id,
    healthPackage,
    subscribed,
    loading: loadingP,
  } = props;

  const dispatch = useDispatch();

  console.log(subscribed);
  console.log(healthPackage);
  const [packageReciever, setPackageReciever] = useState(
    !subscribed ? "me" : "family"
  );
  const [familyMember, setFamilyMember] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState(false);
  const { success: orderSuccess } = useSelector((state) => state.orderReducer);

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
    dispatch(viewFamilyMembers());
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, isLoading]);

  // useEffect(() => {}, [error, submitted, session, loading, props]);

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
    setPackageReciever(e);
  };

  const handleFamilyMemberChange = (e) => {
    console.log(e);
    setFamilyMember(e);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e);
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

    console.log(id);
    console.log(paymentMethod);
    console.log(familyMember);

    dispatch(makeOrder({ id, paymentMethod }, familyMember));
    setSubmitted(true);
    setFamilyMember(null);
    setPackageReciever(null);
    setPaymentMethod(null);
  };

  return (
    <Modal visible={props.visible} setVisible={props.setVisible}>
      <div className="p-4 flex flex-col flex-1 grow justify-center items-center">
        <h1 className="text-center my-4">{title}</h1>
        {/* <Divider></Divider> */}
        <div className="w-full mt-2">
          <div className="flex w-full items-center justify-center">
            <div
              role={!subscribed && "button"}
              onClick={() => {
                if (subscribed) return;
                handleRecieverChange("me");
              }}
              className="flex-1 flex-col grow flex items-center justify-center"
              style={{
                filter: packageReciever === "me" ? "" : "brightness(0.3)",
                cursor: subscribed ? "not-allowed" : "pointer",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-20 h-20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="font-semibold text-lg mt-2">Myself</h1>
            </div>

            <div
              role="button"
              onClick={() => handleRecieverChange("family")}
              className="flex-1 flex-col grow flex items-center justify-center"
              style={{
                filter: packageReciever === "family" ? "" : "brightness(0.3)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-20 h-20"
              >
                <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
              </svg>
              <h1 className="font-semibold text-lg mt-2">Family Member</h1>
            </div>
          </div>
        </div>
        <br />

        <div className="my-2 w-full text-center">
          <h1>Payment Method</h1>
          <Select
            className="w-full mt-2"
            value={paymentMethod}
            onValueChange={handlePaymentChange}
          >
            <SelectItem
              icon={() => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#357A59"
                    className="w-6 h-6 mx-2"
                  >
                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                      clipRule="evenodd"
                    />
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                  </svg>
                </>
              )}
              value="wallet"
              // name="paymentMethod"
              disabled={
                JSON.parse(localStorage.getItem("userInfo")).data?.user
                  .wallet === undefined ||
                JSON.parse(localStorage.getItem("userInfo")).data?.user.wallet <
                  healthPackage?.price
              }
            >
              Wallet (Available Balance:{" "}
              {JSON.parse(localStorage.getItem("userInfo")).data?.user.wallet}{" "}
              USD)
            </SelectItem>

            <SelectItem
              icon={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#424874"
                  className="w-6 h-6 mx-2"
                >
                  <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                  <path
                    fillRule="evenodd"
                    d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              value="Stripe"
              // name="paymentMethod"
            >
              Credit Card
            </SelectItem>
          </Select>
        </div>
        {packageReciever === "family" && (
          <div className="my-4 w-full">
            <h1 className="text-center">Family Member</h1>
            <h1 className="text-gray-700 text-sm text-center">
              (To Receive Health Package)
            </h1>
            <Select
              placeholder={`Choose Family Member`}
              className="mt-2"
              disabled={packageReciever !== "family"}
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
        )}
        <div className="my-4">
          <Button
            disabled={
              !paymentMethod ||
              !packageReciever ||
              (packageReciever == "family" && !familyMember)
            }
            loading={loadingP}
            onClick={handleSubmit}
          >
            <span className="text-white">Subscribe</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SubscribeModal;

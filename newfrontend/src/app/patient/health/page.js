"use client";
import { listHealthPackages } from "@/app/redux/actions/healthPackagesActions";
import { viewPatients } from "@/app/redux/actions/patientsActions";
import PricingCard from "@/components/HealthPackagesCard";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const [modalShow, setModalShow] = useState(false);
  const [healthPackage, setHealthPackage] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState("");

  const patients = useSelector((state) => state.patientsReducer.patients.data);
  let patient;
  if (patients) {
    patient = patients[0];
  }
  const healthPackages = useSelector(
    (state) => state.getHealthPackagesReducer.healthPackages
  );
  const isLoading = useSelector(
    (state) => state.addFamilyMembersReducer.loading
  );

  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem("userInfo")).data.user.patient._id;

  useEffect(() => {
    dispatch(listHealthPackages());
    dispatch(viewPatients({ _id: id }));
  }, [dispatch, isLoading, modalShow]);

  const packages = useMemo(() => {
    if (healthPackages && healthPackages.data) {
      return healthPackages.data.map((value) => ({
        _id: value._id,
        name: value.name,
        price: value.price,
        doctorDiscount: value.doctorDiscount,
        medicineDiscount: value.medicineDiscount,
        familyDiscount: value.familyMemberSubDiscount,
      }));
    }
    return [];
  }, [healthPackages, modalShow]);

  function handleCancellation() {
    dispatch(cancelSubscription(cancelId));
    setCancelConfirm(false);
    //6549f806f3ee984c4052aa62
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Health Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <PricingCard key={pkg.id} hp={pkg} patient={patient} />
        ))}
      </div>
    </>
  );
};

export default page;

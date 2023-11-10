"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useState } from "react";
import { Button } from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { listHealthPackages } from "@/app/redux/actions/healthPackagesActions";
import { useEffect } from "react";
import { useMemo } from "react";
import SubscribeModal from "../../../../components/SubscribeModal";
import { Card } from "../../../../components/Card";
import Image from "next/image";

function HealthPackages() {
  const [modalShow, setModalShow] = useState(false);
  const [healthPackage, setHealthPackage] = useState(null);
  const [CancelModalShow, setCancelModalShow] = useState(false);
  const dispatch = useDispatch();

  const healthPackages = useSelector(
    (state) => state.getHealthPackagesReducer.healthPackages
  );

  async function fetchData() {
    dispatch(listHealthPackages());
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, modalShow]);

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

  function cancel(pack) {
    console.log(pack);
  }
  //get the subscribed package from patient
  const [subscribed, setSubscribed] = useState("");

  const testData = [
    {
      name: "John Doe",
      relation: "Brother",
      subscribed: true,
      date: "2023-11-09",
      package: "silver",
    },
    {
      name: "Jane Doe",
      relation: "Sister",
      subscribed: false,
      date: "2023-11-10",
      package: "silver",
    },
    {
      name: "Jane Doe",
      relation: "Sister",
      subscribed: false,
      date: "2023-11-10",
      package: "silver",
    },
    // Add more objects as needed
  ];
  return (
    <div className="m-2">
      <h3 className="my-1 mt-0 text-center text-title">Health Packages</h3>
      <div className="underline-Bold mx-auto mb-5"></div>
      {/* <h5 className='my-1 mt-0 text-center text-primary mb-3 text-semibold'>Current active health package subscription:</h5> */}
      <div className="w-100 row m-3 justify-content-center ">
        <SubscribeModal
          title={`Subscribe to our ${healthPackage?.name} Health Package`}
          subheader={``}
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={healthPackage?._id}
        />
        {packages.map((pack) => (
          <div className={`col-md-3 m-2 p-4 `}>
            <div
              className={`card shadow p-4  border border-5 ${
                subscribed == pack._id ? "border-primary" : ""
              }`}
            >
              <div className="card-body">
                <h3 className="card-title text-center">{pack.name} Package</h3>
                <p className="card-subtitle text-primary pb-2 text-center">
                  Subscribe for {pack.price}EGP/year
                </p>
                <ul>
                  <li>
                    <strong className="text-primary">
                      {pack.doctorDiscount}%
                    </strong>{" "}
                    off any doctor's appointment.
                  </li>
                  <li>
                    <strong className="text-primary">
                      {pack.medicineDiscount}%
                    </strong>{" "}
                    off any medicine ordered from our pharmacy platform.
                  </li>
                  <li>
                    <strong className="text-primary">
                      {pack.familyDiscount}%
                    </strong>{" "}
                    discount on subscriptions of family members in any package.
                  </li>
                </ul>
              </div>

              <div className="col-md-10 my-3 mb-4 mx-auto">
                {subscribed == pack._id || (
                  <Button
                    text="Subscribe"
                    variant="md"
                    className="col-md-12"
                    onClick={() => {
                      setHealthPackage(pack);
                      setModalShow(true);
                    }}
                  />
                )}
                {subscribed == pack._id && (
                  <>
                    <Button
                      text="Subscribed"
                      variant="md"
                      color="secondary"
                      disabled="true"
                      className="col-md-8 me-3"
                      onClick={() => {
                        setHealthPackage(pack);
                        setModalShow(true);
                      }}
                    />
                    <Button
                      text="cancel"
                      variant="md"
                      color="danger"
                      className="col-md-3"
                      onClick={() => {
                        cancel(pack);
                      }}
                    />
                  </>
                )}
              </div>
              {subscribed == pack._id && (
                <>
                  <div className="text-muted text-center ">
                    <small>subscribed with renewal date</small>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <hr />

      <div>
        <h2 className="text-center text-primary fw-bold">Family Members</h2>
        <div className="d-flex">
          {testData.map((person) => {
            return (
              <div className="mx-auto col-md-3" key={person?.name}>
                <Card
                  className="col-md-10 mx-auto offset-lg-1 my-3 bg-light my-4"
                  title={<div className="text-capitalize ">{person.name}</div>}
                  text={
                    <div className="p-3">
                      <div>Relation: {person.relation}</div>
                      <div>Package: {person.package}</div>
                    </div>
                  }
                  image={
                    <Image
                      src="/person.svg"
                      height={30}
                      width={30}
                      className="m-3 mb-0 rounded-circle"
                    />
                  }
                  buttonText={"remove"}
                  buttonTrue={true}
                  buttonClass="col-md-12 m-3 ms-auto btn btn-danger"
                  onClickButton={() => handleCardClick(person)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HealthPackages;

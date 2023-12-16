"use client";
import { Button, Grid, NumberInput } from "@tremor/react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, removeUser } from "@/app/redux/actions/userActions";
import TableComponent from "@/components/Table";
import { Spinner } from "@material-tailwind/react";
import { BottomCallout } from "@/components/BottomCallout";
import { TextInput } from "@tremor/react";
import Image from "next/image";
import { registerAction } from "@/app/redux/actions/authActions";
import { validateEmail, validatePassword } from "@/app/redux/validators";
import PromptMessage from "@/components/PromptMessage";
import {
  createHealthPackage,
  deleteHealthPackage,
  listHealthPackages,
} from "@/app/redux/actions/healthPackagesActions";
import { EditHealthPackageModal } from "@/components/EditHealthPackage";

const HealthPackage = () => {
  const [showCallout, setShowCallout] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const UpdateisLoading = useSelector(
    (state) => state.updateHealthPackageReducer.loading,
  );
  const [id, setId] = useState(0);
  const {
    healthPackages: healthpackages,
    loading: isLoading,
    error: getPackagesError,
  } = useSelector((state) => state.getHealthPackagesReducer);
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = useSelector((state) => state.createHealthPackageReducer);

  const {
    loading: removeLoading,
    success: removeSuccess,
    error: removeError,
  } = useSelector((state) => state.deleteHealthPackageReducer);

  const {
    loading: editLoading,
    success: editSuccess,
    error: editError,
  } = useSelector((state) => state.updateHealthPackageReducer);
  const health = useMemo(() => {
    if (healthpackages && healthpackages.data) {
      return healthpackages.data.map((value) => ({
        name: value.name,
        doctorDiscount: value.doctorDiscount,
        medicineDiscount: value.medicineDiscount,
        familyMemberSubDiscount: value.familyMemberSubDiscount,
        price: value.price,
        _id: value._id,
        editButton: (
          <div className="ml-5" role="button">
            <span className="">
              <Image src="/edit.svg" height={25} width={25}></Image>{" "}
            </span>{" "}
          </div>
        ),
      }));
    }
    return [];
  }, [healthpackages, removeLoading, createLoading, UpdateisLoading]);

  useEffect(() => {
    dispatch(listHealthPackages());
    setShowCallout(true);
    //setIsDataChanged(false);
  }, [dispatch, createLoading, removeLoading, UpdateisLoading]);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    doctorDiscount: "",
    familyMemberSubDiscount: "",
    medicineDiscount: "",
    price: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch register action with form data
    dispatch(createHealthPackage(formData));
    setShowCreate(true);
    // Clear form fields
  };

  const [visibleFeedback, setVisibleFeedback] = useState(true);

  const [showPrompt, setShowPrompt] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const handleDelete = (id) => {
    setShowPrompt(true);
    setDeleteID(id);
  };
  const confirmDelete = () => {
    dispatch(deleteHealthPackage(deleteID));
    setShowRemove(true);
    setShowPrompt(!showPrompt);
  };
  const cancelDelete = () => {
    setShowPrompt(!showPrompt);
  };
  const handleEdit = (id) => {
    setId(id);
    setData(health?.find((value) => value._id === id));
    setModalShow(true);
  };
  const [data, setData] = useState();
  useEffect(() => {
    // dispatch(listHealthPackages());
    setData(health?.find((value) => value._id === id));
    //setIsDataChanged(false);
  }, [id]);

  return (
    <>
      <EditHealthPackageModal
        visible={modalShow}
        setVisible={setModalShow}
        data={data}
        setData={setData}
        setId={setId}
        setShowCall={setShowEdit}
      ></EditHealthPackageModal>
      {createSuccess && (
        // Show success message for registration
        <BottomCallout
          message="Package created successfully"
          variant="success"
          visible={showCreate}
          setVisible={setShowCreate}
        />
      )}

      {removeSuccess && (
        // Show success message for user removal
        <BottomCallout
          message="Package removed successfully"
          variant="success"
          visible={showRemove}
          setVisible={setShowRemove}
        />
      )}

      {editSuccess && (
        // Show success message for user removal
        <BottomCallout
          message="You have successfully edited the health package"
          variant="success"
          visible={showEdit}
          setVisible={setShowEdit}
        />
      )}

      {editError && (
        // Show success message for user removal
        <BottomCallout
          message="There was an error updating the health packaage"
          variant="error"
          visible={showEdit}
          setVisible={setShowEdit}
        />
      )}

      {createError && (
        // Show error message for registration failure
        <BottomCallout
          message="Package creation failed"
          variant="error"
          visible={showCreate}
          setVisible={setShowCreate}
        />
      )}

      {removeError && (
        // Show error message for user removal failure
        <BottomCallout
          message="Error removing package"
          variant="error"
          visible={showRemove}
          setVisible={setShowRemove}
        />
      )}

      {getPackagesError && (
        // Show error message for fetching users failure
        <BottomCallout
          message="Error fetching packages"
          variant="error"
          visible={showCallout}
          setVisible={setShowCallout}
        />
      )}

      <>
        <PromptMessage
          visible={showPrompt}
          setVisible={setShowPrompt}
          message="Are you sure you want to remove this health package?"
          onConfirm={confirmDelete}
          confirmLoading={removeLoading}
          onCancel={cancelDelete}
        />
        <div className="flex overflow-hidden gap-x-4 gap-y-8">
          <div className="prof h-400 w-4/6 overflow-hidden rounded-xl p-10">
            <TableComponent
              rows={health}
              columns={[
                "Name",
                "Doctor Session Discount",
                "Subscriptions Discount",
                "Medicine Discount",
                "Price",
              ]}
              fields={[
                "name",
                "doctorDiscount",
                "familyMemberSubDiscount",
                "medicineDiscount",
                "price",
              ]}
              buttons={[
                {
                  size: "xs",
                  variant: "secondary",
                  color: "blue",
                  label: "Edit",
                  icon: () => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.65661 17L6.99975 17L6.99975 14M6.10235 14.8974L17.4107 3.58902C18.1918 2.80797 19.4581 2.80797 20.2392 3.58902C21.0202 4.37007 21.0202 5.6364 20.2392 6.41745L8.764 17.8926C8.22794 18.4287 7.95992 18.6967 7.6632 18.9271C7.39965 19.1318 7.11947 19.3142 6.8256 19.4723C6.49475 19.6503 6.14115 19.7868 5.43395 20.0599L3 20.9998L3.78312 18.6501C4.05039 17.8483 4.18403 17.4473 4.3699 17.0729C4.53497 16.7404 4.73054 16.424 4.95409 16.1276C5.20582 15.7939 5.50466 15.4951 6.10235 14.8974Z"
                      />
                    </svg>
                  ),
                  function: (id) => handleEdit(id),
                },
                {
                  size: "xs",
                  variant: "secondary",
                  color: "red",
                  label: "Delete",
                  className: "mx-2",
                  icon: () => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  ),
                  function: (id) => handleDelete(id),
                },
              ]}
              badgeColumns={[]}
              title={"Manage Health Packages"}
            />
          </div>

          <div className="prof h-400 overflow-hidden w-2/6 rounded-xl p-10">
            <h2 className="text-3xl font-semibold mb-6">
              New Health Package
            </h2>

            <div className="my-3">
              <h1 className="font-semibold">Package Name</h1>
              <TextInput
                onChange={handleChange}
                className="mt-2"
                type="username"
                placeholder="Name (e.g. Gold)"
                name="name"
                required
                error={createError && formData.name === ""}
                errorMessage={
                  createError &&
                  formData.name === "" &&
                  "Please enter a package name"
                }
              />
            </div>

            <div className="my-3">
              <h1 className="font-semibold">Doctor Session Discount</h1>
              <NumberInput
                className="mt-2"
                type="username"
                placeholder="Percentage (e.g. 10%)"
                onChange={handleChange}
                name="doctorDiscount"
                required
                error={createError && formData.doctorDiscount === ""}
                errorMessage={
                  createError &&
                  formData.doctorDiscount === "" &&
                  "Please enter a doctor session discount"
                }
              />
            </div>

            <div className="my-3">
              <h1 className="font-semibold">Subscription Discount</h1>

              <NumberInput
                className="mt-2"
                type="username"
                placeholder="Percentage (e.g. 10%)"
                onChange={handleChange}
                name="familyMemberSubDiscount"
                required
                error={createError && formData.familyMemberSubDiscount === ""}
                errorMessage={
                  createError &&
                  formData.familyMemberSubDiscount === "" &&
                  "Please enter a family member subscription discount"
                }
              />
            </div>


            <div className="my-3">
              <h1 className="font-semibold">Medicine Discount</h1>

              <NumberInput
                className="mt-2"
                type="username"
                placeholder="Percentage (e.g. 10%)"
                onChange={handleChange}
                name="medicineDiscount"
                required
                error={createError && formData.medicineDiscount === ""}
                errorMessage={
                  createError &&
                  formData.medicineDiscount === "" &&
                  "Please enter a medicine discount"
                }
              />
            </div>

            <div className="my-3">
              <h1 className="font-semibold">Package Price</h1>

              <NumberInput
                className="mt-2"
                type="username"
                placeholder="Package Price (e.g. 10 USD)"
                onChange={handleChange}
                name="price"
                required
                error={createError && formData.price === ""}
                errorMessage={
                  createError && formData.price === "" && "Please enter a price"
                }
              />
            </div>

            <Button
              loading={createLoading}
              onClick={handleSubmit}
              disabled={formData.name === "" || formData.doctorDiscount === "" || formData.familyMemberSubDiscount === "" || formData.medicineDiscount === "" || formData.price === ""}
              className="mt-5 tracking-wide font-semibold bg-purple-600 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <span className="text-white">Submit</span>
            </Button>
          </div>
        </div>{" "}
      </>
    </>
  );
};

export default HealthPackage;

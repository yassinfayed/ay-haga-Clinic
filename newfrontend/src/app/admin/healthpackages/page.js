"use client";
import { Button, Grid } from "@tremor/react";
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
  const [modalShow, setModalShow] = useState(false);
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
    setShowCallout(true);
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
    setShowPrompt(!showPrompt);
    setShowCallout(true);
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
      ></EditHealthPackageModal>
      {createSuccess && (
        // Show success message for registration
        <BottomCallout
          message="Package created successfully"
          variant="success"
          visible={showCallout}
          setVisible={setShowCallout}
        />
      )}

      {removeSuccess && (
        // Show success message for user removal
        <BottomCallout
          message="Package removed successfully"
          variant="success"
          visible={showCallout}
          setVisible={setShowCallout}
        />
      )}

      {createError && (
        // Show error message for registration failure
        <BottomCallout
          message="Package creation failed"
          variant="error"
          visible={showCallout}
          setVisible={setShowCallout}
        />
      )}

      {removeError && (
        // Show error message for user removal failure
        <BottomCallout
          message="Error removing package"
          variant="error"
          visible={showCallout}
          setVisible={setShowCallout}
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
          <div className="prof h-400 overflow-hidden w-4/6 rounded-xl p-10">
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
                  color: "gray",
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  ),
                  function: (id) => handleEdit(id),
                },
                {
                  size: "xs",
                  variant: "secondary",
                  color: "gray",
                  label: "Delete",
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
            <h2 className="text-3xl text-center font-semibold mb-6">
              Create New Health Package
            </h2>
            <TextInput
              onChange={handleChange}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-5"
              type="username"
              placeholder="Package Name"
              name="name"
              required
              error={createError && formData.name === ""}
              errorMessage={
                createError &&
                formData.name === "" &&
                "Please enter a package name"
              }
            />
            <TextInput
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
              type="username"
              placeholder="Doctor Session Discount"
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
            <TextInput
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
              type="username"
              placeholder="Subscription Discount"
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
            <TextInput
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
              type="username"
              placeholder="Medicine Discount"
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
            <TextInput
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
              type="username"
              placeholder="Price"
              onChange={handleChange}
              name="price"
              required
              error={createError && formData.price === ""}
              errorMessage={
                createError && formData.price === "" && "Please enter a price"
              }
            />
            <Button
              loading={createLoading}
              onClick={handleSubmit}
              className="mt-5 tracking-wide font-semibold bg-purple-600 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <span className="ml-3">Submit</span>
            </Button>
          </div>
        </div>{" "}
      </>
    </>
  );
};

export default HealthPackage;

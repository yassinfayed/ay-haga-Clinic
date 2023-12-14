"use client";
import React, { useEffect, useMemo, useState } from "react";
import YourComponent from "../components/RightBar";
import { useDispatch, useSelector } from "react-redux";
import { viewPatients } from "@/app/redux/actions/patientsActions";
import TableComponent from "@/components/Table";
import { formatDateToDDMMYYYY } from "@/app/redux/validators";
import { Select, SelectItem, TextInput } from "@tremor/react";

const page = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const { patients, loading } = useSelector((state) => state.patientsReducer);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState({});
  const [upcoming, setUpcoming] = useState({});

  useEffect(() => {
    dispatch(viewPatients({ ...name, ...upcoming }));
  }, [name, upcoming]);

  const handleSelect = (id, e) => {
    e.stopPropagation();
    for (let i = 0; i < patientsList.length; i++) {
      
      if (patientsList[i]._id == id) {
        console.log(patientsList[i]._id);
        console.log("aegkerngrlgmsr");
        setSelected(patientsList[i]);
        console.log(patientsList[i]);
        break;
      }
     
    }
    console.log("opening");

    setOpen(true);
  };

  const patientsList = useMemo(() => {
    const t = patients?.data?.map(
      ({ _id, user, emergencyContact, dateOfBirth, ...rest }) => ({
        ...rest,
        eMobileNumber: emergencyContact.mobileNumber,
        eName: emergencyContact.fullName,
        eRelation: emergencyContact.relationToPatient,
        ...user,
        dateOfBirth: formatDateToDDMMYYYY(dateOfBirth),
      })
    );
    return t;
  }, [patients]);

  return (
    <>
      <div tabIndex={0} onFocus={() => setOpen(false)}>
        <div className="flex flex-row gap-4 py-5 my-5">
          <TextInput
            onChange={(e) => {
              setName({ name: e.target.value });
            }}
            icon={() => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-2 w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            type="search"
            className="flex-[3] w-20"
            placeholder="Search For Patient"
          ></TextInput>
          <div class="flex items-center">
            <input
              onChange={(e) => {
                setUpcoming(e.target.checked ? { status: "Upcoming" } : {});
              }}
              id="checked-checkbox"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="checked-checkbox" class="ms-2 text-sm font-medium ">
              Upcoming Appointments
            </label>
          </div>
        </div>
        <TableComponent
          setSelected={setSelected}
          rows={patientsList}
          columns={["Username", "Name", "Birth Date"]}
          fields={["username", "name", "dateOfBirth"]}
          buttons={[
            {
              size: "xs",
              variant: "secondary",
              label: "Select",
              className: "mx-2",
              icon: () => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 px"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                  />
                </svg>
              ),
              function: (id, e) => handleSelect(id, e),
            },
            {
              size: "xs",
              variant: "secondary",
              label: "View Prescription",
              className: "mx-2",
              icon: () => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24" 
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 px"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                  />
                </svg>
              ),
              function: (id, e) => {
                e.stopPropagation();
                window.location.href = `/doctor/prescriptions/${id}`;
              },
            },

          ]}
          badgeColumns={[]}
          title={"Manage my Patients"}
        />
      </div>

      <YourComponent isOpen={open} setIsOpen={setOpen} patient={selected} />
    </>
  );
};

export default page;

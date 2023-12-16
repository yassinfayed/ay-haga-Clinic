"use client";
import {
  adminAcceptDoctor,
  downloadDoctorDocs,
  getDoctorsForPatientAction,
  rejectDoctor,
  viewDoctorDetails,
} from "@/app/redux/actions/doctorActions";
import { rejectUser } from "@/app/redux/actions/userActions";
import { BottomCallout } from "@/components/BottomCallout";
import PersonalCard from "@/components/PersonCard";
import TableComponent from "@/components/Table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToDDMMYYYY } from "../../redux/validators";
import {
  DatePicker,
  DateRangePicker,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import PromptMessage from "@/components/PromptMessage";
import DoctorPersonCard from "@/components/DoctorPersonCard";
import Calendar from "@/components/Calendar";
import ReserveCalendar from "@/components/ReserveCalendar";
// import DateTimePicker from 'terra-date-time-picker';

//OPTIONAL

const DoctorsPage = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const [doctorSelected, setDoctorSelected] = useState(false);
  const [showAvailability, setShowAvailabilty] = useState(false);
  const [speciality, setSpeciality] = useState({});
  const [date, setDate] = useState("");
  const [name, setName] = useState({});
  const [visibleFeedback, setVisibleFeedback] = useState(false);
  const [availableDate, setAvailableDate] = useState({});

  const { doctors, loading, specialities } = useSelector(
    (state) => state.getDrsForPatientsReducer
  );
  console.log(doctors);
  async function fetchData() {
    // const queryObj = {
    //   name,
    //   speciality,
    // };

    // const filteredQueryObj = Object.keys(queryObj).reduce((acc, key) => {
    //   if (queryObj[key] !== "") {
    //     acc[key] = queryObj[key];
    //   }
    //   return acc;
    // }, {});

    // console.log(filteredQueryObj);
    dispatch(
      getDoctorsForPatientAction({ ...name, ...speciality, ...availableDate })
    );
  }

  useEffect(() => {
    // dispatch(login("sysadmin","pass1234"));
    fetchData();
  }, [dispatch, name, speciality, availableDate]);

  const [freeze, setFreeze] = useState(false);

  const handleSelect = (id) => {
    console.log(id);
    setDoctorSelected(true);
    for (let i = 0; i < doctorList.length; i++) {
      if (doctorList[i].doctorID == id) {
        console.log(doctorList[i].doctorID);
        setSelected(doctorList[i]);
        dispatch(viewDoctorDetails(doctorList[i].doctorID));
        break;
      }
    }
    setFreeze(true);
  };

  const doctorList = useMemo(() => {
    return doctors?.data
      ?.map(({ _id, user, DateOfbirth, employmentContract, ...rest }) => ({
        ...rest,
        ...user,
        doctorID: _id,
        employmentStatus: employmentContract.status,
        DateOfbirth: formatDateToDDMMYYYY(DateOfbirth),
      }))
      .filter((value) => value.employmentStatus === "accepted");
  }, [doctors, name, availableDate]);

  const [showPrompt, setShowPrompt] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const handleDelete = (id) => {
    setShowPrompt(true);
    setDeleteID(id);
  };
  const confirmDelete = () => {
    dispatch(rejectDoctor(deleteID));
    setShowPrompt(!showPrompt);
    setSelected(null);
    setFreeze(false);
  };
  const cancelDelete = () => {
    setShowPrompt(!showPrompt);
  };
  const handleCheckAvailabilty = () => {
    setShowAvailabilty(true);
  };
  return (
    <>
      {/* {rejectSuccess && (
          // Show success message for user removal
          <BottomCallout
            message="Doctor rejected successfully"
            variant="success"
            visible={true}
            setVisible={setVisibleFeedback}
          />
        )}
        {rejectError && (
          // Show error message for user removal failure
          <BottomCallout
            message="Error removing user"
            variant="error"
            visible={true}
            setVisible={setVisibleFeedback}
          />
        )}
        {approvalSuccess && (
          <BottomCallout
            message="Doctor approved successfully and is now moved to doctors tab!"
            variant="success"
            visible={true}
            setVisible={setVisibleFeedback}
          />
        )} */}

      <>
        {/* <PromptMessage visible={showPrompt} setVisible={setShowPrompt} message="Are you sure you want to reject this doctor?" onConfirm={confirmDelete} 
        onCancel={cancelDelete}/> */}
        {!showAvailability ? (
          <>
            <div className="flex flex-row gap-4 mb-4">
              <TextInput
                onChange={(e) => setName({ name: { regex: e.target.value } })}
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
                className="flex-[3]"
                placeholder="Search For Doctor By Name"
              ></TextInput>
              <Select
                placeholder={`\xa0\xa0\xa0Filter (By Speciality)`}
                icon={() => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-2 w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                    />
                  </svg>
                )}
                className="flex-[2]"
                onChange={(e) =>
                  setSpeciality(e === "" ? {} : { speciality: { in: e } })
                }
              >
                <SelectItem value="">All</SelectItem>
                {specialities?.map((speciality, index) => (
                  <SelectItem key={index} value={speciality}>
                    {speciality}
                  </SelectItem>
                ))}
                {/* <SelectItem value="">All</SelectItem>
            <SelectItem value="true">Filled</SelectItem>
            <SelectItem value="false">Unfilled</SelectItem> */}
              </Select>
              <TextInput
                type="datetime-local"
                selected={availableDate}
                onValueChange={(date) => {
                  setAvailableDate(
                    date ? { availableDates: { in: date + ":00.000Z" } } : {}
                  );
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="Appointment Date"
                className="w-full"
              />
            </div>

            <div className="flex overflow-hidden gap-x-4 gap-y-8">
              <div className="prof h-400 overflow-hidden w-4/6 rounded-xl p-10">
                <TableComponent
                  setSelected={setSelected}
                  rows={doctorList}
                  columns={["Name", "Speciality", "Affiliation"]}
                  fields={["name", "speciality", "affiliation"]}
                  freeze={freeze}
                  dr={true}
                  filters={<DateRangePicker className="z-10" />}
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
                      function: (doctorID) => handleSelect(doctorID),
                    },
                  ]}
                  badgeColumns={[]}
                  title={"Check Our Doctors"}
                />
              </div>

              <div className="prof h-400 overflow-hidden w-2/6 rounded-xl p-10">
                <DoctorPersonCard
                  imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                  name={selected?.name}
                  title="Marketing Exec. at Denva Corp"
                  description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!"
                  data={selected}
                  handleCheckAvailability={handleCheckAvailabilty}
                  displayColumns={["Status", "Joined On"]}
                  actualColumns={["status", "joinedOn"]}
                  selected={doctorSelected}
                  css={{ marginRight: "50px" }}
                  worker={true}
                  fields={["username", "email", "DateOfbirth", "HourlyRate"]}
                  displayNames={[
                    "Username",
                    "Email",
                    "Birth Date",

                    "Hourly Rate",
                  ]}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              role="button"
              onClick={() => setShowAvailabilty(false)}
              className="ms-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <ReserveCalendar id={selected?.doctorID}></ReserveCalendar>
          </>
        )}
      </>
    </>
  );
};

export default DoctorsPage;

"use client"
import {
    doctorFollowUpAction,
    getDoctorAppointments,
  } from "@/app/redux/actions/doctorActions";
import { BottomCallout } from "@/components/BottomCallout";
import PersonalCard from "@/components/PersonCard";
import TableComponent from "@/components/Table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToDDMMYYYY } from "../../redux/validators";
import { DatePicker } from "@tremor/react";
import { Modal } from "@/components/Modal";
import {
  Select,
  SelectItem,
  TextInput,
  Button,
} from "@tremor/react";


const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector(
    (state) => state.viewDoctorsAppointmentsReducer
  );

  const followuploading= useSelector(
    (state) => state.doctorFollowUpReducer.loading
    );

const [selectedDate, setSelectedDate] = useState(null);
const [selectedStatus, setSelectedStatus] = useState(null);
const [open, setOpen] = useState(false);
const [newDate, setNewDate] = useState(null);
const [rescheduleId, setRescheduleID] = useState(null);



  const formatDateToISOString = (date) => {
    if (!date) return '';
    const utcDate = new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ));
    const selectedDateState = utcDate.toUTCString();
    return selectedDateState;
  };

 async function fetchData() {

    const queryObj = {
        date:  formatDateToISOString(selectedDate),
        status: selectedStatus
      };

    const filteredQueryObj = Object.keys(queryObj).reduce((acc, key) => {
        if (queryObj[key] !== '') {
          acc[key] = queryObj[key];
        }
        return acc;
      }, {});

    dispatch(getDoctorAppointments(filteredQueryObj));
}

  useEffect(() => {
    fetchData();
}, [dispatch, selectedDate, selectedStatus, followuploading]);

const handleFollowup = (id) => () => {
    setRescheduleID(id);
    setOpen(true);
}
const onFollowUp = () => {
    dispatch(doctorFollowUpAction(rescheduleId, newDate));
    setNewDate(null);
    setRescheduleID(null);
    setOpen(false);
}



  return (
    <>

      <>
      <div className="flex flex-row gap-4 mb-4">
             <Select
            
              placeholder={`\xa0\xa0\xa0Filter (By Status)`}
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
              onChange={(e) => {
                setSelectedStatus(e)  
              }}
            >
                <SelectItem value="">All</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Missed">Missed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Rescheduled">Rescheduled</SelectItem>

            </Select>
            <div className="flex-[1]">
            <DatePicker
                selected={selectedDate}
                onValueChange={(date) => {
                  setSelectedDate(date); 
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="Appointment Date"
                className="w-full"
              />
   
              </div>
        </div>
        <div className="flex overflow-hidden gap-x-4 gap-y-8">
          <div className="prof h-400 overflow-hidden w-[120%] rounded-xl p-10">
            <TableComponent
              columns={["Patient Name", "Date", "Status",""]}
              fields={["patientname", "date", "status","detailsButton"]}
              rows={appointments?.data ?.map((appointment) => ({
                date: formatDateToDDMMYYYY(appointment.date),
                patientname: appointment.patientId?.name,
                status: appointment.status,
                detailsButton: (
                    <>
                    { 
                        appointment.status !=="Upcoming" && appointment.status !=="Cancelled" && appointment.status !=="Rescheduled" &&
                        ( <Button
                            className="hover:underline focus:outline-none mx-2"
                            onClick={handleFollowup(appointment._id)}
                            size="xs"
                            variant="secondary"
                            color="blue"
                            icon={() => (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4 px"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                                />
                              </svg>
                            )}
                          >
                            Schedule Followup
                          </Button>)
                        }
                    
                    </>

                    ),
              }))
                }
              badgeColumns={[]}
              title={"Mange Appointments"}
            />
          </div>
        </div>
          <Modal visible={open} setVisible={setOpen}>
            <div className="p-4 md:p-5 text-center my-[5rem]">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Schedule Followup ?
              </h3>
              <DatePicker
                selected={newDate}
                onValueChange={(date) => {
                  setNewDate(date);
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="Appointment Date"
                className="w-full"
                />
              <Button
                type="button"
                className="text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5"
                color="blue"
                onClick={onFollowUp}
                loading={followuploading}
              >
                Schedule
              </Button>

            </div>

          </Modal>  
      </>
    </>
  );
};

export default Appointments;

"use client";
import {
  doctorEvaluateFollowUp,
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
import { Select, SelectItem, TextInput, Button } from "@tremor/react";
import {
  cancelAction,
  rescheduleAction,
} from "@/app/redux/actions/appointmentActions";
import { rescheduleReducer } from "@/app/redux/reducers/appointmentReducer";
import PromptMessage from "@/components/PromptMessage";
import { translateDate } from "@/util";

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector(
    (state) => state.viewDoctorsAppointmentsReducer
  );

  const followuploading = useSelector(
    (state) => state.doctorFollowUpReducer.loading
  );
  const {
    loading: rescheduleLoading,
    success: rescheduleSuccess,
    appointment,
    error,
  } = useSelector((state) => state.rescheduleReducer);
  const {
    loading: cancelLoading,
    success: cancelSuccess,
    errorcancle,
  } = useSelector((state) => state.cancelReducer);
  const { loading: revokeLoading, success: revokeSuccess } = useSelector(
    (state) => state.doctorEvaluateFollowUpReducer
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [open, setOpen] = useState(false);
  const [newDate, setNewDate] = useState(null);
  const [followUpId, setFollowUpID] = useState(null);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState(null);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelId, setCancelId] = useState(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [revokeId, setRevokeId] = useState(null);
  const [revokeOpen, setRevokeOpen] = useState(false);
  const [rescheduleFeedback, setRescheduleFeedback] = useState(true);
  const [cancelFeedback, setCancelFeedback] = useState(true);

  const formatDateToISOString = (date) => {
    if (!date) return "";
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const selectedDateState = utcDate.toUTCString();
    return selectedDateState;
  };

  async function fetchData() {
    const queryObj = {
      date: formatDateToISOString(selectedDate),
      status: selectedStatus,
    };

    const filteredQueryObj = Object.keys(queryObj).reduce((acc, key) => {
      if (queryObj[key] !== "") {
        acc[key] = queryObj[key];
      }
      return acc;
    }, {});

    dispatch(getDoctorAppointments(filteredQueryObj));
  }

  useEffect(() => {
    fetchData();
  }, [
    dispatch,
    selectedDate,
    selectedStatus,
    followuploading,
    rescheduleLoading,
    cancelLoading,
    revokeLoading,
  ]);

  const handleFollowup = (id) => () => {
    console.log(id);
    setFollowUpID(id);
    setOpen(true);
  };
  const onFollowUp = () => {
    dispatch(doctorFollowUpAction(followUpId, newDate));
    setNewDate(null);
    setFollowUpID(null);
    setOpen(false);
  };
  const handleReschedule = (id) => () => {
    setRescheduleId(id);
    setRescheduleOpen(true);
  };
  const onReschedule = () => {
    dispatch(rescheduleAction(rescheduleId, rescheduleDate));
    setRescheduleDate(null);
    setRescheduleId(null);
    //setRescheduleOpen(false)
  };
  useEffect(() => {
    if (!rescheduleLoading && appointment) setRescheduleOpen(false);
  }, [rescheduleLoading, rescheduleSuccess]);
  const handleCancel = (id) => () => {
    setCancelId(id);
    setCancelOpen(true);
  };
  const onCancel = () => {
    dispatch(cancelAction(cancelId));
    setCancelOpen(false);
  };
  const onCloseCancel = () => {
    setCancelOpen(false);
    setCancelId(null);
  };

  const handleRevoke = (id) => () => {
    setRevokeId(id);
    setRevokeOpen(true);
  };
  const onRevoke = () => {
    dispatch(doctorEvaluateFollowUp("Revoked", "", revokeId));
    setRevokeOpen(false);
  };
  const onRevokeCancel = () => {
    setRevokeOpen(false);
    setRevokeId(null);
  };
  return (
    <>
      {revokeSuccess && (
        <BottomCallout
          message="Follow up Revoked."
          visible={rescheduleFeedback}
          setVisible={setRescheduleFeedback}
          variant="success"
        />
      )}
      {rescheduleSuccess && (
        <BottomCallout
          message="Appointment Rescheduled Successfully."
          visible={rescheduleFeedback}
          setVisible={setRescheduleFeedback}
          variant="success"
        />
      )}
      {error && (
        <BottomCallout
          message={rescheduleError}
          visible={rescheduleFeedback}
          setVisible={setRescheduleFeedback}
          variant="error"
        />
      )}
      {cancelSuccess && (
        <BottomCallout
          message="Appointment cancelled Successfully."
          visible={cancelFeedback}
          setVisible={setCancelFeedback}
          variant="success"
        />
      )}
      {errorcancle && (
        <BottomCallout
          message={cancelError}
          visible={cancelFeedback}
          setVisible={setCancelFeedback}
          variant="error"
        />
      )}
      <>
        <PromptMessage
          message="are you sure you to cancel this appointment?"
          visible={cancelOpen}
          setVisible={setCancelOpen}
          onConfirm={onCancel}
          confirmLoading={cancelLoading}
          onCancel={onCloseCancel}
        />
        <PromptMessage
          message="are you aure you to reject this follow up request?"
          visible={revokeOpen}
          setVisible={setRevokeOpen}
          onConfirm={onRevoke}
          confirmLoading={revokeLoading}
          onCancel={onRevokeCancel}
        />
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
              setSelectedStatus(e);
            }}
          >
            <SelectItem value="">All</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Upcoming">Upcoming</SelectItem>
            {/* <SelectItem value="Missed">Missed</SelectItem> */}
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
              columns={["Patient Name", "Date", "Status", ""]}
              fields={["patientname", "date", "status", "detailsButton"]}
              rows={appointments?.data?.map((appointment) => ({
                date: translateDate(new Date(appointment.date))[0] + " @ " + translateDate(new Date(appointment.date))[1],
                patientname: appointment.patientId?.name,
                status: appointment.status,
                detailsButton: (
                  <>
                    {appointment.status === "Completed" ? (
                      appointment.followUp === "None" ? (
                        <Button
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
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                              />
                            </svg>
                          )}
                        >
                          Schedule Followup
                        </Button>
                      ) : appointment.followUp === "FollowUpRequest" ? (
                        <>
                          <Button
                            className="hover:underline focus:outline-none mx-1"
                            onClick={handleFollowup(appointment._id)}
                            size="xs"
                            variant="secondary"
                            color="green"
                            icon={() => (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                />
                              </svg>
                            )}
                          >
                            Accept Followup
                          </Button>
                          <Button
                            className="hover:underline focus:outline-none mx-1"
                            onClick={handleRevoke(appointment._id)}
                            size="xs"
                            variant="secondary"
                            color="red"
                            icon={() => (
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
                            )}
                          >
                            Reject Followup
                          </Button>
                        </>
                      ) : appointment.followUp === "Accepted" ? (
                        <span className="mx-10">Follow Up Scheduled</span>
                      ) : (
                        <span className="mx-10">Follow Up Rejected</span>
                      )
                    ) : appointment.status === "Upcoming" ? (
                      <>
                        <Button
                          className="hover:underline focus:outline-none mx-1"
                          onClick={handleReschedule(appointment._id)}
                          size="xs"
                          variant="secondary"
                          color="blue"
                          icon={() => (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                              />
                            </svg>
                          )}
                        >
                          Reschedule
                        </Button>
                        <Button
                          className="hover:underline focus:outline-none mx-1"
                          onClick={handleCancel(appointment._id)}
                          size="xs"
                          variant="secondary"
                          color="red"
                          icon={() => (
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
                          )}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      appointment.status === "Rescheduled" && (
                        <Button
                          className="hover:underline focus:outline-none mx-1"
                          onClick={handleCancel(appointment._id)}
                          size="xs"
                          variant="secondary"
                          color="red"
                          style={{ marginLeft: "135px" }}
                          icon={() => (
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
                          )}
                        >
                          Cancel
                        </Button>
                      )
                    )}
                  </>
                ),
              }))}
              badgeColumns={[]}
              title={"Manage My Appointments"}
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
        <Modal visible={rescheduleOpen} setVisible={setRescheduleOpen}>
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
              Chhose a Date if you are sure you want to reschedule
            </h3>
            <DatePicker
              selected={rescheduleDate}
              onValueChange={(date) => {
                setRescheduleDate(date);
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="Appointment Date"
              className="w-full"
            />
            <Button
              type="button"
              className="text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5"
              color="blue"
              onClick={onReschedule}
              loading={rescheduleLoading}
            >
              Reschedule
            </Button>
          </div>
        </Modal>
      </>
    </>
  );
};

export default Appointments;

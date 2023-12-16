import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientAppointments } from "@/app/redux/actions/patientActions";
import { BottomCallout } from "@/components/BottomCallout";
import { DatePicker, DateRangePicker } from "@tremor/react";

import {
  Card,
  Title,
  Badge,
  BadgeDelta,
  StatusOnlineIcon,
  ShoppingCartIcon,
  ClockIcon,
  CogIcon,
  MinusCircleIcon,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Button,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import LoadingAnimation from "../../../../public/loading.json";
import Lottie from "lottie-react";
import { viewDoctorDetails } from "@/app/redux/actions/doctorActions";
import {
  cancelAction,
  followUpAction,
} from "@/app/redux/actions/appointmentActions";
import RescheduleCalendar from "@/components/RescheduleCalendar";
import { Modal } from "@/components/Modal";

const FamilyAppointments = ({ memberId, memberName }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [reschedule, setReschedule] = useState(false);
  const [doctorID, setDoctorID] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [followUpFeedback, setFollowUpFeedback] = useState(true);
  const [rescheduleFeedback, setRescheduleFeedback] = useState(true);
  const [cancelFeedback, setCancelFeedback] = useState(true);
  const appointmentsData = useSelector(
    (state) => state.viewPatientsAppointmentsReducer.appointments
  );
  const { success: followUpSuccess, error: followUpError } = useSelector(
    (state) => state.followUpReducer
  );
  const { success: rescheduleSuccess, error: rescheduleError } = useSelector(
    (state) => state.rescheduleReducer
  );
  const { success: cancelSuccess, error: cancelError } = useSelector(
    (state) => state.cancelReducer
  );
  const isLoading = useSelector(
    (state) => state.viewPatientsAppointmentsReducer.loading
  );
  const { loading: followUpLoading } = useSelector(
    (state) => state.followUpReducer
  );
  const { doctor, loading: doctorLoading } = useSelector(
    (state) => state.doctorReducer
  );
  const { loading: rescheduleLoading } = useSelector(
    (state) => state.rescheduleReducer
  );
  const { loading: cancelLoading } = useSelector(
    (state) => state.cancelReducer
  );

  useEffect(() => {
    fetchData();
  }, [
    dispatch,
    selectedDate,
    selectedStatus,
    memberId,
    cancelLoading,
    followUpLoading,
    rescheduleLoading,
  ]);

  const formatDateToISOString = (date) => {
    if (!date) return ""; // Return an empty string if date is falsy
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const selectedDateState = utcDate.toUTCString();
    return selectedDateState;
  };

  async function fetchData() {
    if (memberId) {
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

      console.log(filteredQueryObj);
      console.log("amk;mfea;mae;k");
      dispatch(getPatientAppointments(filteredQueryObj, memberId));
    }
  }

  const handleClearFilters = () => {
    setSelectedDate(null);
    setSelectedStatus("");
  };
  const handleReschedule = (id, appointmentId) => {
    dispatch(viewDoctorDetails(id));
    console.log(id);
    setAppointmentId(appointmentId);
    // setDoctorID(id)
  };
  const handleCancel = (id) => {
    dispatch(cancelAction(id));
  };
  const handleFollowUp = (id) => {
    dispatch(followUpAction(id));
  };
  useEffect(() => {
    //dispatch(viewDoctorDetails(doctorID))
    if (!doctorLoading && doctor) setReschedule(true);
    setDoctorID(doctor?._id);
  }, [doctorLoading]);

  const columns = ["Date", "Time", "Doctor Name", "Status", ""];
  const fields = ["date", "doctorname", "status", "buttons"];
  const rows = useMemo(() => {
    return appointmentsData && appointmentsData.data
      ? appointmentsData.data.map((value) => ({
        date: new Date(value.date).toLocaleString(),
        doctorname: value.doctorId?.name,
        status: value.status,
        buttons:
          value.status === "Upcoming" ? (
            value.followUp === "None" ? (
              <>
                <Button
                  variant="secondary"
                  className="mx-7"
                  onClick={(e) => {
                    handleReschedule(value.doctorId._id, value._id);
                  }}
                >
                  Reschedule
                </Button>
                <Button
                  variant="secondary"
                  color="red"
                  onClick={(e) => handleCancel(value._id)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  disabled={true}
                  variant="secondary"
                  className="mx-7"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "transparent",
                    cursor: "default",
                  }}
                >
                  Reschedule
                </Button>
                <Button
                  variant="secondary"
                  color="red"
                  onClick={(e) => handleCancel(value._id)}
                >
                  Cancel
                </Button>
              </>
            )
          ) : value.status === "Completed" ? (
            value.followUp === "None" ? (
              <>
                <Button
                  variant="secondary"
                  className="mx-8"
                  color="green"
                  onClick={(e) => handleFollowUp(value._id)}
                >
                  Follow Up
                </Button>
              </>
            ) : value.followUp === "FollowUpRequest" ? (
              <span className="mx-10">Awaiting Doctor</span>
            ) : value.followUp === "Accepted" ? (
              <span className="mx-10">Follow Up Scheduled</span>
            ) : (
              <span className="mx-10">Follow Up Rejected</span>
            )
          ) : (
            ""
          ),
      }))
      : [];
  }, [appointmentsData]);
  console.log(appointmentsData, !appointmentsData?.data[0]);
  const notHasAppointments =
    appointmentsData && !appointmentsData?.data[0] && memberName;
  console.log(notHasAppointments);
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Upcoming":
        return <Badge icon={ClockIcon}>Upcoming</Badge>;
      case "Completed":
        return <Badge icon={StatusOnlineIcon}>Completed</Badge>;
      case "Rescheduled":
        return <Badge icon={CogIcon}>Rescheduled</Badge>;
      case "Missed":
        return <Badge icon={MinusCircleIcon}>Missed</Badge>;
      case "Cancelled":
        return <Badge icon={ShoppingCartIcon}>Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>; // Default badge
    }
  };

  const formatDateAndTime = (dateTime) => {
    const dateObj = new Date(dateTime);
    return {
      date: dateObj.toLocaleDateString(),
      time: dateObj.toLocaleTimeString(),
    };
  };

  return (
    <>
      {followUpSuccess && (
        <BottomCallout
          message="Follow Up Request Sent Successfully."
          visible={followUpFeedback}
          setVisible={setFollowUpFeedback}
          variant="success"
        />
      )}
      {followUpError && (
        <BottomCallout
          message={followUpError}
          visible={followUpFeedback}
          setVisible={setFollowUpFeedback}
          variant="error"
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
      {rescheduleError && (
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
      {cancelError && (
        <BottomCallout
          message={cancelError}
          visible={cancelFeedback}
          setVisible={setCancelFeedback}
          variant="error"
        />
      )}

      {!reschedule && (
        <>
          <Card className="flex flex-col h-full">
            <div className=" space-y-4 ">
              <h1 className="font-bold text-2xl mb-4">
                Family Appointments<Badge>{rows.length}</Badge>
              </h1>

              <div className="flex space-x-4">
                <Select
                  value={selectedStatus}
                  onValueChange={(e) => setSelectedStatus(e)}
                >
                  <SelectItem value="">Filter by status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Missed">Missed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                </Select>
                <DatePicker
                  selected={selectedDate}
                  onValueChange={(date) => {
                    setSelectedDate(date);
                  }}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Filter by date"
                  className="w-full"
                />

                <Button
                  variant="secondary"
                  className="px-4  rounded"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex-1 grow flex justify-center">
                <Lottie
                  animationData={LoadingAnimation}
                  className="w-[15rem] h-[15rem]"
                />
              </div>
            ) : (
              <>
                <Table className="mt-6">
                  <TableHead>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableHeaderCell key={index}>{column}</TableHeaderCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  {notHasAppointments && (
                    <p className="pt-5">No appointments for {memberName}</p>
                  )}
                  <TableBody>
                    {rows.map((item, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {fields.map((field, fieldIndex) => {
                          if (field === "date") {
                            const { date, time } = formatDateAndTime(
                              item[field]
                            );
                            return (
                              <>
                                <TableCell
                                  key={`${fieldIndex}-date`}
                                  className="text-lg"
                                >
                                  {date}
                                </TableCell>
                                <TableCell
                                  key={`${fieldIndex}-time`}
                                  className="text-lg"
                                >
                                  {time}
                                </TableCell>
                              </>
                            );
                          } else if (field === "status") {
                            return (
                              <TableCell key={fieldIndex} className="text-lg">
                                {renderStatusBadge(item[field])}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={fieldIndex} className="text-lg">
                                {item[field]}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </Card>
        </>
      )}
      <Modal visible={reschedule} setVisible={setReschedule} className="w-full h-full">
        {reschedule &&
          <RescheduleCalendar
            setCalendar={setReschedule}
            id={doctorID}
            appointmentId={appointmentId}
          ></RescheduleCalendar>
        }
      </Modal>
    </>
  );
};

export default FamilyAppointments;

import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientAppointments } from "@/app/redux/actions/patientActions";

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

const FamilyAppointments = ({ memberId, memberName }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const appointmentsData = useSelector(
    (state) => state.viewPatientsAppointmentsReducer.appointments
  );
  const isLoading = useSelector(
    (state) => state.viewPatientsAppointmentsReducer.loading
  );

  useEffect(() => {
    if (memberId) {
      console.log(selectedStatus);
      const queryObj = {
        date: selectedDate,
        status: selectedStatus,
      };

      const filteredQueryObj = Object.keys(queryObj).reduce((acc, key) => {
        if (queryObj[key] !== "") {
          acc[key] = queryObj[key];
        }
        return acc;
      }, {});
      console.log(filteredQueryObj);
      dispatch(getPatientAppointments(filteredQueryObj, memberId));
    }
  }, [dispatch, selectedDate, selectedStatus, memberId]);

  const handleClearFilters = () => {
    setSelectedDate(null);
    setSelectedStatus("");
  };

  const columns = ["Date", "Time", "Doctor Name", "Status"];
  const fields = ["date", "doctorname", "status"];
  const rows = useMemo(() => {
    return appointmentsData && appointmentsData.data
      ? appointmentsData.data.map((value) => ({
          date: new Date(value.date).toLocaleString(),
          doctorname: value.doctorId?.name,
          status: value.status,
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
            <TextInput
              type="date"
              placeholder="Filter By date"
              name="dateOfBirth"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              style={{ color: "white" }}
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
                        const { date, time } = formatDateAndTime(item[field]);
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
  );
};

export default FamilyAppointments;

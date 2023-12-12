import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientAppointments } from "@/app/redux/actions/patientActions";
import {
  Card,
  Title,
  Badge,
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

const FamilyAppointments = () => {
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
    const filteredQueryObj = {
      date: selectedDate,
      status: selectedStatus,
    };
    dispatch(getPatientAppointments(filteredQueryObj));
  }, [dispatch, selectedDate, selectedStatus]);

  const handleClearFilters = () => {
    setSelectedDate(null);
    setSelectedStatus("");
  };

  const columns = ["Date", "Doctor Name", "Status"];
  const fields = ["date", "doctorname", "status"];
  const rows = useMemo(() => {
    return appointmentsData && appointmentsData.data
      ? appointmentsData.data.map((value) => ({
          date: new Date(value.date).toLocaleString(),
          doctorname: value.doctorId.name,
          status: value.status,
        }))
      : [];
  }, [appointmentsData]);

  return (
    <Card>
      <div className="flex flex-col space-y-4">
        <Title>
          Family Appointments<Badge>{rows.length}</Badge>
        </Title>

        <div className="flex space-x-4">
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <SelectItem value="">Filter by status</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Upcoming">Upcoming</SelectItem>
            <SelectItem value="Missed">Missed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
            <SelectItem value="Rescheduled">Rescheduled</SelectItem>
          </Select>
          <TextInput
            type="datetime-local"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 grow flex items-center justify-center">
          <Lottie
            animationData={LoadingAnimation}
            className="w-[15rem] h-[15rem]"
          />
        </div>
      ) : (
        <Table className="mt-6">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableHeaderCell key={index}>{column}</TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {fields.map((field, fieldIndex) => (
                  <TableCell key={fieldIndex}>{item[field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};

export default FamilyAppointments;

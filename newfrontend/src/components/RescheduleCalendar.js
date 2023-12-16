import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { doctorAddAvailableDate } from "@/app/redux/actions/doctorActions";
import { doctorAddAvailableDateReducer } from "@/app/redux/reducers/doctorReducer";
import { BottomCallout } from "./BottomCallout";
import { useSelector } from "react-redux";
import { viewDoctorDetails } from "@/app/redux/actions/doctorActions";
import { Button } from "@tremor/react";
import ReserveModal from "./ReserveModal";
import { rescheduleAction } from "@/app/redux/actions/appointmentActions";

function RescheduleCalendar({ id, appointmentId, setCalendar }) {
  const [visibleFeedback, setVisibleFeedback] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [clickedDay, setClickedDay] = useState(null);
  const [events, setEvents] = useState({});
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const dispatch = useDispatch();
  const success = useSelector((state) => state.orderReducer?.success);
  const loading = useSelector((state) => state.rescheduleReducer?.loading);
  const {
    loading: addLoading,
    error: addError,
    success: addSuccess,
  } = useSelector((state) => state.doctorAddAvailableDateReducer);

  const doctor = useSelector((state) => state.doctorReducer.doctor);

  useEffect(() => {
    const formattedEvents = doctor?.availableDates.reduce((acc, slot) => {
      const date = new Date(slot);
      const day = date.getDate();
      const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const month = date.getMonth();
      const year = date.getFullYear();
      const eventKey = `${day}-${month}-${year}`;
      acc[eventKey] = [
        ...(acc[eventKey] || []),
        { time, formattedDate: date.toISOString() },
      ];
      return acc;
    }, {});
    setEvents(formattedEvents);
  }, []);

  useEffect(() => {
    if (success) dispatch(viewDoctorDetails(id));
  }, [success]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1)
    );
  };

  const handleDayClick = (day) => {
    setClickedDay(day);
    setIsTimePickerOpen(true);
  };
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!loading && init == true) {
      setTimeout(() => {
        setCalendar(false);
      }, 2000);
    }
    setInit(true);
  }, [loading]);
  const displayLocalTime = (utcTime) => {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const totalDays = daysInMonth(year, month);
    const startingDay = firstDayOfMonth(year, month);

    let days = [];

    // Add empty cells for the days before the 1st of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<td key={`empty-${i}`} className="border p-1 w-10 h-40"></td>);
    }

    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      const eventKey = `${day}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
      days.push(
        <td
          key={day}
          className="border p-1 h-40 w-10 overflow-auto transition cursor-pointer duration-500 ease"
          onClick={() => handleDayClick(day)}
        >
          <div className=" h-40 mx-auto w-40 mx-auto overflow-hidden">
            <div className="top h-5 w-full">
              <span className="text-white-500">{day}</span>
            </div>
            <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer text-lg">
              {events[eventKey] &&
                events[eventKey]
                  .filter((event) => {
                    const eventMonth = new Date(event.formattedDate).getMonth();
                    const eventYear = new Date(
                      event.formattedDate
                    ).getFullYear();
                    return (
                      eventMonth === currentDate.getMonth() &&
                      eventYear === currentDate.getFullYear()
                    );
                  })
                  .map((event, index) => (
                    <div
                      key={index}
                      className="flex text-white rounded  text-2xl mb-1 justify-center"
                    >
                      <Button
                        variant="primary"
                        color="blue"
                        className="w-[8rem]"
                        onClick={() => {
                          dispatch(
                            rescheduleAction(appointmentId, event.formattedDate)
                          );
                          setReserve(true);
                        }}
                        // loading={loading}
                      >
                        {displayLocalTime(event.formattedDate)}
                      </Button>
                    </div>
                  ))}
            </div>
          </div>
        </td>
      );
    }
    // Wrap days in rows
    let rows = [];
    let cells = [];

    days.forEach((day, index) => {
      if (index % 7 !== 0 || index === 0) {
        cells.push(day);
      } else {
        rows.push(<tr key={index / 7}>{cells}</tr>);
        cells = [];
        cells.push(day);
      }
    });

    // Add the last row
    rows.push(<tr key={days.length / 7}>{cells}</tr>);

    // Define an array of day names
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Create header row with day names
    const headerRow = (
      <tr>
        {dayNames.map((dayName) => (
          <th key={dayName} className="border p-1 w-10 h-10 text-center">
            {dayName}
          </th>
        ))}
      </tr>
    );

    return (
      <tbody>
        {headerRow}
        {rows}
      </tbody>
    );
  };
  const [reserve, setReserve] = useState(false);

  return (
    <>
      {success && (
        // Show success message for registration
        <BottomCallout
          message="Reservatiom successful"
          variant="success"
          visible={visibleFeedback}
          setVisible={setVisibleFeedback}
        />
      )}

      {/* <ReserveModal visible={reserve} 
    setVisible={setReserve} 
    title="Reservation" 
    id={id} 
    hourlyRate={doctor?.HourlyRate}
    selectedDate={selectedDate}
    success={success}></ReserveModal> */}
      <div className="container mx-auto mt-10">
        <div className="wrapper rounded shadow w-full ">
          <div className="header flex justify-between border-b p-2">
            <span className="text-lg font-bold">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>

            <div className="buttons">
              <button className="p-1" onClick={prevMonth}>
                <svg
                  width="1em"
                  fill="gray"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-arrow-left-circle"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"
                  />
                </svg>
              </button>
              <button className="p-1" onClick={nextMonth}>
                <svg
                  width="1em"
                  fill="gray"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-arrow-right-circle"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr>{/* Header row for day names */}</tr>
            </thead>
            {renderCalendar()}
          </table>
          {addError && (
            <BottomCallout
              message="There was an error updating your schedule"
              variant="error"
              visible={show}
              setVisible={setShow}
            />
          )}
          {addSuccess && (
            <BottomCallout
              message="You have successfully added a slot to your schedule"
              variant="success"
              visible={show}
              setVisible={setShow}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default RescheduleCalendar;

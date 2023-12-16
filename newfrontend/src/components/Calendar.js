import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { doctorAddAvailableDate } from "@/app/redux/actions/doctorActions";
import { doctorAddAvailableDateReducer } from "@/app/redux/reducers/doctorReducer";
import { BottomCallout } from "./BottomCallout";
import { useSelector } from "react-redux";
// import { TimePicker } from 'react-ios-time-picker';
import { viewDoctorDetails } from "@/app/redux/actions/doctorActions";
import { Button } from "@tremor/react";

function Calendar({ id }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [clickedDay, setClickedDay] = useState(null);
  const [events, setEvents] = useState({});
  const [show, setShow] = useState(false);
  const [initialCurrentDay] = useState(new Date());
  const dispatch = useDispatch();

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

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    const currentDateClone = new Date(currentDate);
    currentDateClone.setMonth(currentDateClone.getMonth() - 1);
  
    // Check if the current month is before the system's current month
    if(currentDateClone.getMonth() == 11){
      setCurrentDate(currentDateClone);
    }
    if (currentDateClone < new Date()) {
      return;
    }
  
    setCurrentDate(currentDateClone);
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

  const displayLocalTime = (utcTime) => {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  const [selectedTime, setSelectedTime] = useState();
  const [time, setTime] = useState();

  const handleTimeSelected = (time) => {
    if (time) {
      setTime(time);
      const eventKey = `${clickedDay}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
      const day = clickedDay;
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const selectedDate = new Date(Date.UTC(year, month, day));
      setSelectedTime(
        new Date(
          selectedDate.setUTCHours(
            parseInt(time.split(":")[0]),
            parseInt(time.split(":")[1])
          )
        )
      );
    }
  };

  const handleSubmit = () => {
    const eventKey = `${clickedDay}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
    setIsTimePickerOpen(false);
    dispatch(doctorAddAvailableDate({ availableDate: selectedTime }));
    dispatch(viewDoctorDetails(id));
    setEvents((prevEvents) => {
      // Update the events based on the previous state
      const updatedEvents = { ...prevEvents };
      updatedEvents[eventKey] = [
        ...(updatedEvents[eventKey] || []),
        { time, formattedDate: selectedTime.toISOString() },
      ];
      return updatedEvents;
    });

    setShow(true);
    console.log(addSuccess);
  };
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const currentDay = currentDate.getDate(); // Get the current day
  
    const totalDays = daysInMonth(year, month);
    const startingDay = firstDayOfMonth(year, month);
  
    let days = [];
  
    // Add empty cells for the days before the 1st of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(
        <td key={`empty-${i}`} className="border p-1 w-10 h-40 text-gray-400">
          {/* Add a class to make the text gray and indicate that it's disabled */}
        </td>
      );
    }
  
    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      const eventKey = `${day}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
      const isDisabled = currentDate.getMonth() === initialCurrentDay.getMonth() && day < initialCurrentDay.getDate();

  
      days.push(
        <td
          key={day}
           className={`border p-1 h-40 w-10 overflow-auto transition cursor-pointer duration-500 ease ${
          isDisabled
            ? 'text-gray-400' // Add class to make the text gray for disabled days
            : 'hover:bg-gray-300' // Add hover effect for non-disabled days
        }`}
          onClick={() => !isDisabled && handleDayClick(day)} // Disable click for disabled days
        >
          <div className=" h-40 mx-auto w-40 mx-auto overflow-hidden">
            <div className="top h-5 w-full">
              <span className={`text-white-500 ${isDisabled && 'opacity-50'}`}>
                {day}
              </span>
            </div>
            <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
              {events[eventKey] &&
                events[eventKey]
                  .filter((event) => {
                    const eventMonth = new Date(event.formattedDate).getMonth();
                    const eventYear = new Date(event.formattedDate).getFullYear();
                    return (
                      eventMonth === currentDate.getMonth() &&
                      eventYear === currentDate.getFullYear()
                    );
                  })
                  .map((event, index) => (
                    <div
                      key={index}
                      className="bg-blue-400 text-white rounded  text-2xl mb-1"
                    >
                      <span className="event-name">
                        {displayLocalTime(event.formattedDate)}
                      </span>
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
  

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="wrapper rounded shadow w-full ">
          <div className="header flex justify-between border-b p-2">
            <span className="text-lg font-bold">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            {isTimePickerOpen && (
              <div className="ml-0 mr-2">
                <input
                  type="time"
                  onChange={(e) => handleTimeSelected(e.target.value)}
                  className="bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2 focus:outline-none focus:shadow-outline-blue"
                >
                  Add slot
                </button>
              </div>
            )}
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

export default Calendar;

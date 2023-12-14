  "use client";  
  import { viewALLPrescriptions } from '@/app/redux/actions/prescriptionsActions';
  import { BottomCallout } from "@/components/BottomCallout";
  import PrescriptionCard from "@/components/PrescriptionCard";
  import TableComponent from "@/components/Table";
  import React, { useEffect, useMemo, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { formatDateToDDMMYYYY } from "../../redux/validators";
  import { DatePicker, DateRangePicker } from "@tremor/react";
  import {
    Select,
    SelectItem,
    TextInput,
    Button,
  } from "@tremor/react";


  const Prescriptions = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState();
    const onViewFiles = (pharmId) => {
    //   dispatch(downloadPharmacistDocs(pharmId));
    };
    const initialDate = null;
    const initialName = '';
    const initialStatus = null;
    const [selectedDate, setSelectedDate] = useState(null);
    const [name, setName] = useState(initialName);
    const [selectedStatus, setSelectedStatus] = useState(initialStatus);  
    const { prescription, loading } = useSelector(
      (state) => state.viewAllPrescriptionsReducer
    );
    
    const formatDateToISOString = (date) => {
        if (!date) return ''; // Return an empty string if date is falsy
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
       
          prescriptionDate: formatDateToISOString(selectedDate),
          name,
          filled_unfilled: selectedStatus,
        };

        const filteredQueryObj = Object.keys(queryObj).reduce((acc, key) => {
            if (queryObj[key] !== '') {
              acc[key] = queryObj[key];
            }
            return acc;
          }, {});

          console.log(filteredQueryObj);
      dispatch(viewALLPrescriptions(filteredQueryObj));
    }

    const [freeze, setFreeze] = useState(false);

    const handleSelect = (id) => {
      setSelected(prescriptionList.find((item) => item._id === id));
      setFreeze(true);
    };

    const prescriptionList = useMemo(() => {
        return prescription?.data
            ?.map(({ _id, prescriptionDate, doctorId, medicines, instructions, filled_unfilled }) => ({
              _id,
              prescriptionDate: formatDateToDDMMYYYY(prescriptionDate),
              doctorName: doctorId.name,
              medicines,
              instructions,
              filled_unfilled: filled_unfilled ? 'Filled' : 'Unfilled',
            }))
        }, [prescription]);

      useEffect(() => {
        fetchData();
    }, [selectedDate, name, selectedStatus]);


    const buttons = {
      right: {
        label: "Download",
        size: "xs",
        variant: "secondary",
        color: "rose",
        className: "mx-2",
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
        onClick: (e) => dispatch(),
      },
      left: {
        label: "Accept",
        size: "xs",
        variant: "secondary",
        color: "green",
        className: "mx-2",
        icon: () => (
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
        ),
        onClick: (e) => dispatch(adminAcceptPharmacist(selected.pharmacistID)),
      },
    
    };

    return (
      <>
        <>
        <div className="flex flex-row gap-4 mb-4">
        <TextInput
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
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
              placeholder="Search For Prescriptions By Doctor Name"
            ></TextInput>
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
              <SelectItem value="true">Filled</SelectItem>
              <SelectItem value="false">Unfilled</SelectItem>
            </Select>
            <div className="flex-[1]">
            <DatePicker
                selected={selectedDate}
                onValueChange={(date) => {
                  setSelectedDate(date); // This should be a Date object or null
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="Prescription Date"
                className="w-full"
              />
   
              </div>
        </div>
        <div className="w-full flex flex-row gap-4">
          </div>
          <div className="flex overflow-hidden gap-x-4 gap-y-8">
            <div className="prof h-400 overflow-hidden w-4/6 rounded-xl p-10">
              <TableComponent
              setSelected={setSelected}
                rows={prescriptionList}
                columns={["Doctor Name","Prescription Date" ,"Filled/Unfilled"]}
                fields={["doctorName","prescriptionDate","filled_unfilled"]}
                freeze={freeze}
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
                    function: (id) => handleSelect(id),
                  },
                  {
                    size: "xs",
                    variant: "secondary",
                    label: "Documents",
                    className: "mx-2",
                    icon: () => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 mx-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                        />
                      </svg>
                    ),
                    function: (id) => onViewFiles(id),
                  },
                ]}
                badgeColumns={[]}
                title={"View Prescriptions"}
              />
            </div>

            <div className="prof h-400 overflow-hidden w-2/6 rounded-xl p-10">
          <PrescriptionCard
            prescriptionDate={selected?.prescriptionDate}
            patientName={selected?.patientId}
            doctorName={selected?.doctorName}
            medicines={selected?.medicines}
            instructions={selected?.instructions}
              />
            </div>
          </div>{" "} 
        </>
      </>
    );
  };

  export default Prescriptions;

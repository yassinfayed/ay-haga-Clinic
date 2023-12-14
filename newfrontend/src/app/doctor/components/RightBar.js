"use client";
import React, { useState } from "react";
import InfoBlock from "./InfoBlock";
// import "./style.css";
import {
  downloadPatientDocs,
  uploadHealthRecords,
} from "@/app/redux/actions/patientActions";
import Image from "next/image";
import { useDispatch } from "react-redux";

const YourComponent = ({ patient, isOpen, setIsOpen }) => {
  const RecordItem = ({ title, path }) => (
    <div className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-md mb-2">
      <span className="text-white">{title}</span>
      <button
        onClick={(e) => dispatch(downloadPatientDocs(path))}
        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
      >
        View
      </button>
    </div>
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e, patientId) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({ patientId: patient.patientId, file });
    }
  };

  const dispatch = useDispatch();
  const handleFileUpload = () => {
    console.log(patient);
    if (selectedFile) {
      const { file } = selectedFile;
      const formData = new FormData();
      formData.append("image", file);

      dispatch(uploadHealthRecords(formData, patient.patientId));
    }
  };

  console.log(patient);

  return (
    <>
      {/* <div
        className={`fixed inset-0 z-50 overflow-hidden ${
          isOpen ? "animate-fadeIn" : "animate-fadeOut"
        }`}
      > */}
      {/* <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-gray-800 bg-opacity-50 transition-opacity"
        > */}

      <section
        // onBlur={() => setIsOpen(false)}
        tabIndex={0}
        id="test"
        className={` inset-y-0 right-0 pl-10 flex`}
        style={
          isOpen
            ? { transform: " translateX(0%)", position: "absolute" }
            : { transform: " translateX(100%)", position: "absolute" }
        }
      >
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col py-6 shadow-xl overflow-y-auto bg-gray-900">
            {/* Patient Info */}
            <div className="px-6">
              <img
                src="/patient.jpg"
                alt="Patient"
                className="h-24 w-24 rounded-full mx-auto border border-gray-700"
              />
              <h2 className="text-lg font-semibold text-center text-white mt-4">
                {patient?.name}
              </h2>
              <hr className="my-4 border-gray-700" />

              <InfoBlock
                Icon={() => (
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
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                )}
                title="Mobile Number"
                detail={patient?.mobileNumber}
              />
              <InfoBlock
                Icon={() => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                )}
                title="Email"
                detail={patient?.email}
              />
              <InfoBlock
                Icon={() => (
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
                      d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"
                    />
                  </svg>
                )}
                title="Date of Birth"
                detail={patient?.dateOfBirth}
              />
              <InfoBlock
                Icon={() => (
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                )}
                title="Gender"
                detail={patient?.gender}
              />

              <hr className="my-4 border-gray-700" />
              <InfoBlock
                Icon={() => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                )}
                title="Emergency Contact Number"
                detail={patient?.eMobileNumber}
              />

              <hr className="my-4 border-gray-700" />

              <div className="mt-6">
                <div className="text-white mb-4">
                  <div className="flex items-center">
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
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                      />
                    </svg>
                    <div className="text-lg opacity-75 my-3 mx-2">
                      Health Records
                    </div>
                  </div>
                </div>
                {patient?.healthRecords?.map((record) => (
                  <RecordItem title={record.substring(22)} path={record} />
                ))}
                <div>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="formFile"
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>
                <div className=" m-auto my-2">
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <Image
                      onClick={handleFileUpload}
                      src="/upload.svg"
                      height={25}
                      width={25}
                    />{" "}
                  </label>
                  <p
                    className="mt-1 text-sm text-gray-700 dark:text-gray-500"
                    id="file_input_help"
                  >
                    (PDF,JPEG,JPG,PNG)
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-white mb-4">
                  <div className="flex items-center">
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
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                      />
                    </svg>
                    <div className="text-lg opacity-75 my-3 mx-2">
                      Medical Records (View Only)
                    </div>
                  </div>
                </div>
                {patient?.medicalRecords?.map((record) => (
                  <RecordItem path={record} title={record.substring(22)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* </div>
      </div> */}

      {/* Open sidebar button */}
    </>
  );
};

export default YourComponent;

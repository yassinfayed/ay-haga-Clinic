"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewPatients } from "../../redux/actions/patientsActions";
import Image from "next/image";
import { Card, Button, Modal } from "react-bootstrap";
import FileModal from "../../../../components/FileModal";
import { uploadDocsAction } from "@/app/redux/actions/patientActions";
import ChangePassword from "../../../../components/ChangePassword";
import { Alert } from "react-bootstrap";
import Spinner from "../../../../components/Spinner";



const PatientProfile = ({ params }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalFilePath, setModalFilePath] = useState("");
  const [isPdf, setIsPdf] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileDeleted, setFileDeleted] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1.
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const role = JSON.parse(localStorage.getItem("userInfo"))?.data.user.role;
  useEffect(() => {
    dispatch(viewPatients({ _id: params.id }));
  }, [dispatch, handleFileUpload]);

  const handlePatientDataReload = () => {
    setFileDeleted(false);
    dispatch(viewPatients({ _id: params.id })).then(() => {
      setFileDeleted(true);
    });
  };

  const patients = useSelector((state) => state.patientsReducer.patients.data);
  const error = useSelector((state) => state.patientUploadDocs);

  let patient, date;

  if (patients) {
    patient = patients[0];
    date = formatDateToDDMMYYYY(patient?.dateOfBirth);
  }

  const openModal = (filePath, isPdf, fileName) => {
    setModalFilePath(filePath);
    setIsPdf(isPdf);
    setFileName(fileName);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e, patientId) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({ patientId, file });
    }
  };

  const handleFileUpload = (patientId) => {
    setUploadSuccess(false);
    if (selectedFile) {
      const { file } = selectedFile;
      const formData = new FormData();
      formData.append("documents", file);

      dispatch(uploadDocsAction(formData, patientId)).then(() => {
        setUploadSuccess(true);
        dispatch(viewPatients({ _id: params.id }));
      });
    }
  };

  console.log(error);

  const HealthRecords = () => {
    return (
      <div className="">
        {patient.healthRecords.length != 0 ? (
          patient.healthRecords?.map((filename, index) => {
            const filePath = `http://localhost:8000/${filename}`;
            const isPdf = filename.toLowerCase().endsWith(".pdf");
            const fileNameWithoutPathAndDate = filename
              .replace(/^.*[\\\/]/, "")
              .replace(/\d+-/g, "");

            return (
              <div className="container-fluid">
                <div className="row">
                  <span className="d-flex w-85">
                    <div className="mt-2">{fileNameWithoutPathAndDate}</div>
                    <div className="mx-3">
                      <Button
                        onClick={() => {openModal(filePath, isPdf, filename); setDeleting('Health');}}
                        variant="xs"
                        color="light"
                        className="rounded-circle mb-2"
                      >
                        <Image src="/show.svg" height={25} width={25} />
                      </Button>
                    </div>
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-muted fw-bold small px-2">
            No health records available...
          </div>
        )}
        <FileModal
          show={showModal}
          onHide={closeModal}
          filePath={modalFilePath}
          isPdf={isPdf}
          fileName={fileName}
        />
      </div>
    );
  };

  const MedicalRecords = () => {
    return (
      <div className="">
        {patient.medicalRecords?.map((filename, index) => {
          console.log(filename);
          const filePath = `http://localhost:8000/${filename}`;
          const isPdf = filename.toLowerCase().endsWith(".pdf");
          const fileNameWithoutPathAndDate = filename
            .replace(/^.*[\\\/]/, "")
            .replace(/\d+-/g, "");

          return (
            <div className="container-fluid" key={index}>
              <div className="row">
                <span className="d-flex w-85">
                  <div className="mt-2">{fileNameWithoutPathAndDate}</div>
                  <div className="mx-3">
                    <Button
                      onClick={() => {openModal(filePath, isPdf, filename); setDeleting('Medical')}}
                      variant="xs"
                      color="light"
                      className="rounded-circle mb-2"
                    >
                      <Image src="/show.svg" height={25} width={25} />
                    </Button>
                  </div>
                </span>
              </div>
            </div>
          );
        })}
        <FileModal
          show={showModal}
          onHide={closeModal}
          filePath={modalFilePath}
          isPdf={isPdf}
          fileName={fileName}
          onDelete={() => {
            setFileDeleted(true);
            handlePatientDataReload();
          }}
        />
      </div>
    );
  };

  console.log(error);

  return (
    <>
      {patient ? (
        <div className=" d-flex mx-auto rounded shadow col-md-9 my-3 ">
          <div className=" w-25 border-end">
            <div className="p-3 border-bottom m-3">
              <div className="image-container">
                <Image
                  src="/profile.svg"
                  alt="Profile"
                  layout="intrinsic"
                  width={200}
                  height={200}
                />
              </div>
            </div>
            {role === "patient" && (
              <div className="ps-4 py-2 d-flex  text-center border-bottom mx-auto">
                <span className="fw-bold w-25">
                  <Image src="/dollar.svg" height={30} width={30} />
                </span>
                <span className="w-50 fs-4">{patient?.user?.wallet}</span>
              </div>
            )}
            <div className="mx-auto">
              {role === "patient" && <ChangePassword className="h-100 " />}
            </div>
          </div>
          <div className="p-3 w-75 my-3">
            <div className="border-bottom d-flex ">
              <div className="w-75">
                <h1 className=" ms-2 text-primary fw-bold text-capitalize">
                  {patient.name}
                </h1>
              </div>
            </div>

            <div className="p-2 ">
              <div className="d-flex">
                <div className="w-60 ">
                  <h2 className="text-global fw-bold small pt-3 p-1 me-3">
                    Patient Information
                  </h2>
                  <hr className="w-50" />

                  <div className="p-2 pt-0 mx-3">
                    <div className="py-2 d-flex ">
                      <span className="fw-bold w-25">
                        <Image src="/person.svg" height={25} width={25} />
                      </span>
                      <span className="w-50">{patient.gender}</span>
                    </div>
                    <div className="py-2 d-flex ">
                      <span className="fw-bold w-25 ">
                        <Image src="/birthday.svg" height={25} width={25} />
                      </span>
                      <span>{date}</span>
                    </div>
                    <div className="py-2 d-flex">
                      <span className="fw-bold w-25">
                        <Image src="/phone-dark.svg" height={25} width={25} />{" "}
                      </span>
                      <span>{patient.mobileNumber}</span>
                    </div>
                    <div className="py-2 d-flex">
                      <span className="fw-bold w-25">
                        <Image src="/mail-dark.svg" height={25} width={25} />
                      </span>
                      <span className="w-50">{patient.email}</span>
                    </div>
                  </div>
                </div>
                <div className="ms-5 w-50">
                  {role === "patient" && (
                    <div>
                      <h2 className="text-global fw-bold small p-1 pt-3">
                        Health Package
                      </h2>
                      <hr className="w-50" />
                      {JSON.parse(localStorage.getItem("userInfo")).data.user
                        .role === "patient" && (
                        <div className="pb-2 d-flex">
                          <span className="px-3 fw-bold text-muted">
                            {patient.package ? patient.package.name : "none"}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="w-100">
                    <h2 className="text-global fw-bold small pt-3 p-1">
                      Emergency Contact
                    </h2>
                    <hr className="w-50" />
                    <div className="col-md-9">
                      <div className="card global-text shadow border-0">
                        <div className="card-body">
                          <h5
                            className="text-primary"
                            style={{ fontWeight: "bold", fontSize: "20px" }}
                          >
                            {patient.emergencyContact?.fullName}
                          </h5>
                          <h6 className="card-subtitle mb-2 text-muted">
                            {patient.emergencyContact?.mobileNumber}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div>
                <div className="text-global fw-bold small pt-3 p-1">
                  Health Records
                </div>
                <hr className="w-50" />
                {fileDeleted && deleting==='Health' && (
                  <Alert
                    variant="success"
                    dismissible
                    onDismiss={() => {}}
                    className="px-2"
                  >
                    <strong>Success! </strong> File deleted successfully.
                  </Alert>
                )}
                <HealthRecords />
              </div>
              <div>
                <div className="text-global fw-bold small pt-3 p-1 mt-3">
                  Medical Records <hr className="w-50" />
                  {role === "patient" && (
                    <>
                      <div className="row text-muted px-3  mb-4">
                        Note that all uploaded files should be in following
                        formats: PDF, JPEG, JPG, PNG.
                      </div>
                      {uploadSuccess && !error && (
                        <Alert variant="success" dismissible className="px-2">
                          <strong>Success! </strong> File uploaded successfully.
                        </Alert>
                      )}
                      {error.error && (
                        <Alert variant="danger" dismissible className="px-2">
                          <strong>Error! </strong> File was not uploaded, try
                          again later.
                        </Alert>
                      )}
                      {fileDeleted && deleting==='Medical' && (
                        <Alert
                          variant="success"
                          dismissible
                          onDismiss={() => {}}
                          className="px-2"
                        >
                          <strong>Success! </strong> File deleted successfully.
                        </Alert>
                      )}
                      <div className="row my-4">
                        <div className="col-md-6">
                          <input
                            className="col-md-3 form-control"
                            type="file"
                            onChange={(e) => handleFileChange(e, patient._id)}
                            id="formFile"
                          />{" "}
                        </div>
                        <div className="col-md-4">
                          <Button
                            onClick={handleFileUpload}
                            className="ms-3"
                            size="md"
                          >
                            Upload
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <MedicalRecords></MedicalRecords>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PatientProfile;

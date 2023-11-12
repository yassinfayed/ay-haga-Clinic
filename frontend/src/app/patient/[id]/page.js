'use client'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewPatients } from "../../redux/actions/patientsActions";
import Image from "next/image";
import { Card, Button, Modal } from "react-bootstrap";
import FileModal from "../../../../components/FileModal";
import { uploadDocsAction } from "@/app/redux/actions/patientActions";
import ChangePassword from '../../../../components/ChangePassword';

const PatientProfile = ({ params }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalFilePath, setModalFilePath] = useState('');
  const [isPdf, setIsPdf] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
 

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1.
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    dispatch(viewPatients({ _id: params.id }));
  }, [dispatch]);

  const patients = useSelector((state) => state.patientsReducer.patients.data);
  let patient, date;

  if (patients) {
    patient = patients[0];
    date = formatDateToDDMMYYYY(patient.dateOfBirth);
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
  if (selectedFile) {
    const { file } = selectedFile;
    const formData = new FormData();
    formData.append('documents', file);
    dispatch(uploadDocsAction(formData, patientId)).then(() => {
      setUploadedFile(file);
    });
  }
};

  const HealthRecords = () => {
    return (
      <div className="">
        {patient.healthRecords?.map((filename, index) => {
          const filePath = `http://localhost:8000/${filename}`;
          const isPdf = filename.toLowerCase().endsWith('.pdf');
          const fileNameWithoutPathAndDate = filename.replace(/^.*[\\\/]/, '').replace(/\d+-/g, '');

          return (
          
            
              
             <div className="container-fluid" >
              <div className="row">
            <span className="d-flex w-85">
              <div className="mt-2">
            {fileNameWithoutPathAndDate}
            </div>
            <div className="mx-3">
            <Button onClick={() => openModal(filePath, isPdf,filename)} variant='xs' color='light' className="rounded-circle mb-2" ><Image src="/show.svg" height={25} width={25} /></Button>
            </div>
            </span>
            </div>
            </div>  
        );
        })}
        <FileModal show={showModal} onHide={closeModal} filePath={modalFilePath} isPdf={isPdf} fileName={fileName} />
      </div>
    );
  };

  const MedicalRecords = () => {
    return (
      <div className="">
        {patient.medicalRecords?.map((filename, index) => {
          console.log(filename);
          const filePath = `http://localhost:8000/${filename}`;
          const isPdf = filename.toLowerCase().endsWith('.pdf');
          const fileNameWithoutPathAndDate = filename.replace(/^.*[\\\/]/, '').replace(/\d+-/g, '');

          return (
            <div className="container-fluid" key={index}>
              <div className="row">
                <span className="d-flex w-85">
                  <div className="mt-2">{fileNameWithoutPathAndDate}</div>
                  <div className="mx-3">
                    <Button
                      onClick={() => openModal(filePath, isPdf, filename)}
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
        <FileModal show={showModal} onHide={closeModal} filePath={modalFilePath} isPdf={isPdf} fileName={fileName} />
      </div>
    );
  };

  return (
    <>
      {patient ? (
        <div className="p-5 d-flex mx-auto rounded shadow col-md-9 my-3 ">
          <div className=" w-25 border-end">
            <div className="border-bottom m-3">
              <div className="d-flex justify-content-center ">
                <Image src="/profile.svg" height={200} width={200} />
              </div>
            </div>
            <div className="mx-auto">
              <ChangePassword/>
            </div>
          </div>
          <div className="p-5 w-75">
            <div className="border-bottom d-flex ">
              <div className="w-75">
                <h1 className=" ms-2 text-primary fw-bold text-capitalize">{patient.name}</h1>
              </div>
            </div>

            <div className="p-2 ">
              <div className="d-flex">

                <div className="w-50">
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
                    <div className="py-3 d-flex">
                      <span className="fw-bold w-25">
                        <Image src="/mail-dark.svg" height={25} width={25} />
                      </span>
                      <span className="w-50">{patient.email}</span>
                    </div>
                  </div>
                </div>
                <div className="ms-5 w-50">
                  <div>
                    <h2 className="text-global fw-bold small p-1 pt-3">Health Package</h2>
                    <hr className="w-50" />
                    {JSON.parse(localStorage.getItem("userInfo")).data.user.role === "patient" && (
                      <div className="pb-2 d-flex">
                        <span className="px-3">{patient.package ? patient.package.name : 'none'}</span>
                      </div>
                    )}
                  </div>
                  <div className="w-100">
                    <h2 className="text-global fw-bold small pt-3 p-1">Emergency Contact</h2>
                    <hr className="w-50" />
                    <div className="w-100 p-3">
                      <div className="card global-text shadow border-0">
                        <div className="card-body">
                          <h5 className="text-primary" style={{ fontWeight: "bold", fontSize: "20px" }}>
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
              <div>
                <div className="text-global fw-bold small pt-3 p-1">Health Records</div>
                <hr className="w-50" />
                <HealthRecords />
              </div>
              <div>
                <div className="text-global fw-bold small pt-3 p-1 mt-3">Medical Records <input className=" mx-4 mt-1 col-lg-3" type="file" onChange={(e) => handleFileChange(e, patient._id)} id="formFile"/> <Button onClick={handleFileUpload}>Upload</Button></div>
                <hr className="w-50" />
                <MedicalRecords></MedicalRecords>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>Loading...</div>
        </>
      )}
    </>
  );
};

export default PatientProfile;

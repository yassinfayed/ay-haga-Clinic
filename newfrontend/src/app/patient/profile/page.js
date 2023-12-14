"use client";
import React from "react";
import TableComponent from "@/components/Table";
import ProfilePicture from "@/components/ProfilePicture";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "@/components/ChangePassword";
import { Button, Card, Grid } from "@tremor/react";
import { BottomCallout } from "@/components/BottomCallout";
import { Modal } from "@/components/Modal";
import { translateDate } from "@/util";
import { patientViewMyDetailsReducer } from "@/app/redux/reducers/patientReducer";
import { viewPatientDetails } from "@/app/redux/actions/patientActions";
import { FileUpload } from "@/components/FileUpload";
import { uploadDocsAction } from "@/app/redux/actions/patientActions";
import { patientUploadDocs } from "@/app/redux/reducers/patientReducer";
import { downloadPatientDocs } from "@/app/redux/actions/patientActions";
import { downloadDoctorDocsReducer } from "@/app/redux/reducers/doctorReducer";
import { removeDocsAction } from "@/app/redux/actions/patientActions";
import { patientRemoveRecordReducer } from "@/app/redux/reducers/patientReducer";




// EXAMPLE USAGE

const columns = ["File Name",""];
const fields = ["Name","detailsButton"];
const badgeColumns = ["status"];



function Profile() {



  const {
    loading: uploadLoading,
    error: uploadError,
    success: uploadSuccess
  } = useSelector((state) => state.patientUploadDocs);

  const {
    loading: removeLoading,
    error: removeError,
    success: removeSuccess
  } = useSelector((state) => state.patientRemoveRecordReducer);

  const {
    error: downloadError,
  } = useSelector((state) => state.downloadDoctorDocsReducer);

  const [visibleFeedback, setVisibleFeedback] = useState(false);
  const [showUpload,setShowUpload] = useState(false);
  const [showRemove,setShowRemove] = useState(false);
  const [showDownload,setShowDownload] = useState(false);


  useEffect(() => {
    dispatch(viewPatientDetails());
  }, [dispatch,uploadLoading,removeLoading]);

  const patient = useSelector((state) => state.patientViewMyDetailsReducer.patient);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileChange =(e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      console.log(selectedFile);
    }
  }

  const handleDownload = (fileName) => {
    dispatch(downloadPatientDocs(fileName));
    setShowDownload(true);
    setTimeout(() => {
      setShowDownload(false);
    }, 3000);
  }

  const handleRemove = (fileName) => {
    console.log(removeError);
    console.log(removeSuccess);
    dispatch(removeDocsAction(fileName));
    setShowRemove(true);
    console.log(removeError);
    console.log(removeSuccess);
    setTimeout(() => {
      setShowRemove(false);
    }, 3000);
  }

  
  

  const dispatch = useDispatch();

  const role = JSON.parse(localStorage.getItem("userInfo"))?.data.user.role;
  
  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("documents", selectedFile);
      console.log(formData);
      dispatch(uploadDocsAction(formData));
      setShowUpload(true);
    setTimeout(() => {
      setShowUpload(false);
    }, 3000);
    }
  }



  return (
    <div className="h-full overflow-hidden pl-10">
      <main
        id="dashboard-main"
        className=" overflow-auto px-4 py-10"
      >
        <div className="flex flex-wrap gap-x-4 gap-y-8">
          <div>
            <ProfilePicture
              src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?w=826&t=st=1701985608~exp=1701986208~hmac=a251fffe7681073919cbd4f67698f31bfb8d2eab7041e13e952e15e751e4c535"
              size="90"
            ></ProfilePicture>
          </div>
          <div>
            <br />
            <h1 className="text-2xl font-black text-white-800 slide-in-right">
              Welcome Back {patient?.patient.name}!
            </h1>
          </div>
        </div>
        <br />

        <div numItems={3} className="flex flex-row gap-2">
          <Card>
            <h1 className="text-xl font-bold text-white-200">Personal Information</h1>
            <div className="flex mt-[2rem]">
              <Image src="/user.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.patient.name}</p>
            </div>
            <div className="flex mt-5">
              <Image src="/email.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.patient.email}</p>
            </div>
            <div className="flex mt-5">
              <Image src="/birthday.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{translateDate(new Date(patient?.patient.dateOfBirth))[0]}</p>
            </div>
            <div className="flex mt-5">
              <Image src="/mobile.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">0{patient?.patient.mobileNumber}</p>
            </div>
            <div className="flex mt-5">
              <Image src="/health.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.patient.package?.name}</p>
            </div>
            <div className="flex mt-5">
              <Image src="/wallet.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.user.wallet} USD</p>
            </div>
          </Card>
          <Card>
            <h1 className="text-xl font-bold text-white-200">Emergency Contact</h1>
            <div className="flex mt-5">
              <Image src="/user.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.patient.emergencyContact.fullName}</p>
            </div>
            <div className="flex mt-5">
              <Image src="/mobile.svg" height={25} width={25} />
              <p className="ml-3 text-lg">0{patient?.patient.emergencyContact.mobileNumber}
              </p>
            </div>
          </Card>
          <div className="">
            {role === "patient" ?(
                <ChangePassword />
            ) : {}
            }
            
          </div>
        </div>


        <Grid className="mt-2">
          <div className="flex flex-row gap-2">
          
          
              <TableComponent
              title="Health Records"
              columns={columns}
              fields={fields}
              rows={patient?.patient.healthRecords.map((healthRecord) => {
                const filename = healthRecord;
                const filePath = `http://localhost:8000/${filename}`;
                const isPdf = filename.toLowerCase().endsWith(".pdf");
                const fileNameWithoutPathAndDate = filename
                .replace(/^.*[\\\/]/, "")
                .replace(/\d+-/g, "");

                return{
                  Name:fileNameWithoutPathAndDate,
                  detailsButton :
                  <>
                    <Button
                      onClick={() => handleDownload(filename)}
                      className=" hover:underline focus:outline-none"
                      size="xs"
                      variant="secondary"
                      color="gray"
                    >
                      Download
                    </Button>
                    {role === "patient" && (
                      <Button
                        onClick={() => handleRemove(filename)}
                        className="ml-3 text-red-500 hover:underline focus:outline-none"
                        size="xs"
                        variant="secondary"
                        color="red"
                      >
                        Remove
                      </Button>
                    )}
                  </>
                }
                
              })}
              badgeColumns={badgeColumns}

            >

            </TableComponent> 
            <TableComponent
              title="Medical Records"
            
              columns={columns}
              fields={fields}
              rows={patient?.patient.medicalRecords.map((medicalRecord) => {
                const filename = medicalRecord;
                const filePath = `http://localhost:8000/${filename}`;
                const isPdf = filename.toLowerCase().endsWith(".pdf");
                const fileNameWithoutPathAndDate = filename
                .replace(/^.*[\\\/]/, "")
                .replace(/\d+-/g, "");

                return{
                  Name:fileNameWithoutPathAndDate,
                  detailsButton: <>
                  <Button
                    onClick={() => handleDownload(filename)}
                    className=" hover:underline focus:outline-none"
                    size="xs"
                    variant="secondary"
                    color="gray"
                  >
                    Download
                  </Button>
                  {role === "patient" && (
                      <Button
                        onClick={() => handleRemove(filename)}
                        className="ml-3 text-red-500 hover:underline focus:outline-none"
                        size="xs"
                        variant="secondary"
                        color="red"
                      >
                        Remove
                      </Button>
                    )}
                </>
                }
                
              })}
              badgeColumns={badgeColumns}
              
            >
              <div></div>
              
              <div>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="formFile"
        type="file"
        onChange={(e) => handleFileChange(e)}
      />

    </div>
              
              <div className=" ml-[2rem]">
                {role === "patient" ? (
                     <label htmlFor="fileInput" className="cursor-pointer">
                     <Image onClick={handleFileUpload} src="/upload.svg" height={25} width={25} />
                     
                     
                   </label> )
                     : (
                      null
                )}
             
              </div>
              <div>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-500" id="file_input_help">
         (PDF,JPEG,JPG,PNG)
          </p>
              </div>

            </TableComponent> 
        
          </div>
          {uploadError && showUpload && (
            <BottomCallout
              message="There was an error uploading your file"
              variant="error"
              visible={true}
              setVisible={setVisibleFeedback}
            />
          )}

          {removeError && showRemove && (
            <BottomCallout
              message="There was an error removing your file"
              variant="error"
              visible={true}
              setVisible={setVisibleFeedback}
            />
          )}

          {removeSuccess && showRemove && (
            <BottomCallout
              message="You have successfully removed your file"
              variant="success"
              visible={true}
              setVisible={setVisibleFeedback}
            />
          )}

          {uploadSuccess && showUpload && (
            <BottomCallout
              message="You have successfully uploaded your file"
              variant="success"
              visible={true}
              setVisible={setVisibleFeedback}
            />
          )}

          {downloadError && showDownload && (
            <BottomCallout
              message="There was an error downloading your file"
              variant="error"
              visible={true}
              setVisible={setVisibleFeedback}
            />
          )}
        </Grid>
      </main>
    </div>
  );
}

export default Profile;
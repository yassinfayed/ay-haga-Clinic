"use client"
import React from "react"
import ChangePassword from "@/components/ChangePassword";
import { Card } from "@tremor/react";
import Image from "next/image";
import ProfilePicture from "@/components/ProfilePicture";
import { translateDate } from "@/util";
import { Button } from "@tremor/react";
import { useDispatch } from "react-redux";
import { viewDoctorDetails } from "@/app/redux/actions/doctorActions";
import { useState,useEffect } from "react";
import { doctorReducer } from "@/app/redux/reducers/doctorReducers";
import { useSelector } from "react-redux";
import { doctorAddAvailableDate } from "@/app/redux/actions/doctorActions";
import { updateDoctor } from "@/app/redux/actions/doctorActions";
import { Grid } from "@tremor/react";
import Calendar from "@/components/Calendar";
import { TextInput } from "@tremor/react";
import { updateDoctorsReducer } from "@/app/redux/reducers/doctorReducer";
import { BottomCallout } from "@/components/BottomCallout";




function DoctorProfile () {


  const id = JSON.parse(localStorage.getItem("userInfo"))?.data.user.doctor?._id
  const doctor = useSelector((state) => state.doctorReducer.doctor);
  const role = JSON.parse(localStorage.getItem("userInfo"))?.data.user.role;

  const docStatus = doctor?.employmentContract?.status;

    const dispatch = useDispatch();

    const {
      loading: updateLoading,
      error: updateError,
      doctor: updateSuccess
    } = useSelector((state) => state.updateDoctorsReducer);

    useEffect(() => {
        dispatch(viewDoctorDetails(id));
      }, [dispatch,updateLoading]);

      const [isEditEmail, setIsEditEmail] = useState(false);
      const [newHourlyRate, setNewHourlyRate] = useState(doctor?.HourlyRate);
      const [newAffiliation, setNewAffiliation] = useState(doctor?.affiliation);
      const [editedEmail, setEditedEmail] = useState(doctor?.email);
      const [isEditEmployment, setIsEditEmployment] = useState (false);
      const [newdoctor, setNewDoctor] = useState({});
      const[show,setShow]=useState(false);

    
    
      const handleEditEmail = () => {
        setIsEditEmail(true);
      };

      const handleEditEmployment = () => {
        setIsEditEmployment(true);
      }


      const handleCancelEditEmployment = () => {
        setIsEditEmployment(false);
      }
    
      const handleCancelEditEmail = () => {
        setIsEditEmail(false);
        setEditedEmail(doctor?.email || "");
      };
    
      const handleEmailChange = (e) => {
        setEditedEmail(e.target.value);
      };

      const handleHourlyRateChange = (e) => {
        setNewHourlyRate(e.target.value);
      };
    
      const handleAffiliationChange = (e) => {
        setNewAffiliation(e.target.value);
      };


      const handleSubmitEmployment = () => {
        setIsEditEmployment(false);
    
        let updatedDoctor = { ...newdoctor };
    
        if (newHourlyRate) {
          updatedDoctor.HourlyRate = newHourlyRate;
        }
    
        if (newAffiliation) {
          updatedDoctor.affiliation = newAffiliation;
        }
        setNewDoctor(updatedDoctor);
        dispatch(updateDoctor(updatedDoctor));
        setShow(true);
        setNewHourlyRate("");
        setNewAffiliation("");
      };

      const handleSubmitEmail = () => {
        setIsEditEmail(false);
    
        let updatedDoctor = { ...newdoctor };
    
        if (editedEmail) {
          updatedDoctor.email = editedEmail;
        }
    
        setNewDoctor(updatedDoctor);
        dispatch(updateDoctor(updatedDoctor));
        setShow(true);
        setEditedEmail("");
      };

   



    return(
        <div className="h-full overflow-hidden pl-10">
      <main
        id="dashboard-main"
        className=" overflow-auto px-4 py-10"
      >
        {docStatus==="accepted" && doctor ? ( 
            <>
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
                Welcome Back {doctor?.name}!
              </h1>
            </div>
          </div>
          <br />
  
          <div numItems={3} className="flex flex-row gap-2">
            <Card>
              <div className="flex">
              <h1 className="text-xl font-bold text-white-200">Personal Information</h1>
              {!isEditEmail ? (
                  <div className="ml-5" role="button" onClick={handleEditEmail}>
                  <span className="">
                  <Image src="/edit.svg" height={25} width={25}></Image>
                  </span>
                </div>
              ) : (
                <>
                <div className="ml-5" role="button" onClick={handleSubmitEmail}>
                <span className="">
                <Image src="/tick.svg" height={25} width={25}></Image>
                </span>
              </div>
               <div className="ml-5" role="button" onClick={handleCancelEditEmail}>
               <span className="">
               <Image src="/cross.svg" height={25} width={25}></Image>
               </span>
             </div>
             </>
              )}
                  
              </div>

          {updateError && (
            <BottomCallout
              message="There was an error updating your information"
              variant="error"
              visible={show}
              setVisible={setShow}
            />
          )}

            {updateSuccess && (
            <BottomCallout
              message="You have successfully updated your information"
              variant="success"
              visible={show}
              setVisible={setShow}
            />
          )}

              <div className="flex mt-[2rem]">
                <Image src="/user.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{doctor?.name}</p>
              </div>
              <div className="flex mt-5">
                <Image src="/email.svg" height={25} width={25}></Image>
                {!isEditEmail ? (
                <>
                  <p className="ml-3 text-lg">{doctor?.email}</p>
                </>
              ) : (
                <>
                  <TextInput
                    type="email"
                    value={editedEmail}
                    onChange={handleEmailChange}
                    className="ml-3 form-control"
                  />
                </>
              )}
              </div>
              <div className="flex mt-5">
                <Image src="/birthday.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{translateDate(new Date(doctor?.DateOfbirth))[0]}</p>
              </div>
              <div className="flex mt-5">
                <Image src="/wallet.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{doctor?.user.wallet} USD</p>
              </div>
            </Card>
            <Card>
              
              <div className="flex">
              <div className="flex">
              <h1 className="text-xl font-bold text-white-200">Employment</h1>
              {!isEditEmployment ? (
                  <div className="ml-5" role="button" onClick={handleEditEmployment}>
                  <span className="">
                  <Image src="/edit.svg" height={25} width={25}></Image>
                  </span>
                </div>
              ) : (
                <>
                <div className="ml-5" role="button" onClick={handleSubmitEmployment}>
                <span className="">
                <Image src="/tick.svg" height={25} width={25}></Image>
                </span>
              </div>
               <div className="ml-5" role="button" onClick={handleCancelEditEmployment}>
               <span className="">
               <Image src="/cross.svg" height={25} width={25}></Image>
               </span>
             </div>
             </>
              )}
                  
              </div>
              </div>
              <div className="flex mt-[2rem]">
                <Image src="/speciality.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{doctor?.speciality}</p>
              </div>
              <div className="flex mt-5">
                <Image src="/hospital.svg" height={25} width={25}></Image>
                {!isEditEmployment ? (
                <>
                  <p className="ml-3 text-lg">{doctor?.affiliation}</p>
                </>
              ) : (
                <>
                  <TextInput
                    type="text"
                    value={newAffiliation}
                    onChange={handleAffiliationChange}
                    className="ml-3 form-control"
                  />
                </>
              )}
              </div>
              <div className="flex mt-5">
                <Image src="/book.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{doctor?.educationalbackground}</p>
              </div>
              <div className="flex mt-5">
                <Image src="/hourly.svg" height={25} width={25}></Image>
                {!isEditEmployment ? (
                <>
                  <p className="ml-3 text-lg">{doctor?.HourlyRate}</p>
                </>
              ) : (
                <>
                  <TextInput
                    type="text"
                    value={newHourlyRate}
                    onChange={handleHourlyRateChange}
                    className="ml-3 form-control"
                  />
                </>
              )}
              </div>
            </Card>
            <div className="">
              {role === "doctor" ? (
                   <ChangePassword />
              ):(
                  {}
              )}
                 
            </div>
            
          </div>
          <Grid className="mt-2">
            <div>
                <br />
            <hr />
            <br />
            <h1 className="text-3xl font-bold text-white-200">My Available Slots</h1>
            </div>
          <div className="flex flex-row gap-2">
            <Calendar availableSlots={doctor?.availableDates}></Calendar>
          </div>
        </Grid>
          </>
        ) : (
            null
        )}

        { docStatus!=='accepted' ? (
                null
            ) : (
                null
            )}
        

      </main>
    </div>
    )

}

export default DoctorProfile;
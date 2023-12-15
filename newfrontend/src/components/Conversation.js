'use client'
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { viewDoctorDetails } from "@/app/redux/actions/doctorActions";
import { viewPatients } from "@/app/redux/actions/patientsActions";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Conversation({ conversation, currentUser }) {
  const role = JSON.parse(localStorage.getItem('userInfo'))?.data.user.role;

  const dispatch = useDispatch();
  const doctor = useSelector((state) => state.doctorReducer.doctor);
  const patients = useSelector((state) => state.patientsReducer.patients?.data);
  const [pat,setPat] = useState("");
  useEffect(() => {
    
    console.log("patient is",patients);
    if(patients){
      setPat(patients[0]);
      console.log("single",pat);
    }
  }, [patients]);


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
        if(role==='patient'){
        dispatch(viewDoctorDetails(friendId))
    }
    else{
      const queryObj = {

          id: friendId

      };
          dispatch(viewPatients(queryObj));
    }

  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <span className="conversationName flex group">
      <Image src="/blackuser.svg" className="mt-2 ml-1 group-hover:filter group-hover:brightness-125" height={25} width={25}></Image>
      <p className="text-xl text-black mt-2 ml-2 group-hover:text-blue-500 transition-all">{role === "patient" ? `Dr. ${doctor?.name}` : pat?.name}</p>
      <hr />
      </span>
    </div>
  );
}
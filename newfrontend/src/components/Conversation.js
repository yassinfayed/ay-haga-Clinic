"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { viewDoctorDetails } from "@/app/redux/actions/doctorActions";
import { viewPatients } from "@/app/redux/actions/patientsActions";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Conversation({ conversation, currentUser }) {
  const role = JSON.parse(localStorage.getItem("userInfo"))?.data.user.role;

  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");
  const [pat, setPat] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const getDoctors = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/doctor?_id=${id}`,
        config
      );
      console.log(res.data.data.data[0]);
      setDoctor(res.data.data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const getPatients = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/patient/view-Patients?_id=${id}`,
        config
      );
      setPatient(res.data.data.data[0]);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    if (role === "patient") {
      getDoctors(friendId);
    } else {
      getPatients(friendId);
    }
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <span className="conversationName flex group">
        <Image
          src="/blackuser.svg"
          className="mt-2 ml-1 group-hover:filter group-hover:brightness-125"
          height={25}
          width={25}
        ></Image>
        <p className="text-xl text-black mt-2 ml-2 group-hover:text-blue-500 transition-all">
          {role === "patient" ? `Dr. ${doctor?.name}` : patient?.name}
        </p>
        <hr />
      </span>
    </div>
  );
}

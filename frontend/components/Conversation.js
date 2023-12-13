'use client'
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const role = JSON.parse(localStorage.getItem('userInfo'))?.data.user.role;


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
        let res;
      try {
        if(role==='patient'){
             res = await axios.get("/doctor/" + friendId);
        }
        else{
             res = await axios.get("/patients/" + friendId);
        }
        
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
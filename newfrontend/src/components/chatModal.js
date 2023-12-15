"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaComment, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import ChatComponent from "./ChatBubble";
import Conversation from "./Conversation";

// ChatPanel component
const ChatPanel = ({ isOpen, handleClose }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const role = JSON.parse(localStorage.getItem("userInfo"))?.data.user.role;
  let user;
  if (role === "patient") {
    user = JSON.parse(localStorage.getItem("userInfo"))?.data.user.patient;
  } else {
    user = JSON.parse(localStorage.getItem("userInfo"))?.data.user.doctor;
  }
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/chats/getChats/" + user._id,
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        console.log("chatid", currentChat._id);
        const res = await axios.get(
          "http://localhost:8000/api/v1/messages/getMessages/" +
            currentChat?._id,
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id,
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/messages/createMessage",
        message,
      );
      console.log("new message is ", res.data);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const dispatch = useDispatch();

  return (
    <div className={`chat-panel ${isOpen ? "open" : ""}`}>
      <div className="chat-header">
        <div className="close-button" onClick={handleClose}>
          <FaTimes />
        </div>
      </div>
      <div style={{ height: isOpen ? "400px" : "0px" }} className="flex">
        <div className="conversation-list">
          {conversations.map((c) => (
            <div key={c._id} onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
        <div className="divider" /> {/* Vertical divider */}
        <div className="chat-body">
          <div className="message-area">
            {currentChat ? (
              <>
                {messages.map((m) => (
                  <div key={m._id} ref={scrollRef}>
                    <ChatComponent message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </>
            ) : null}
          </div>
          <div className="flex">
            <input
              className="w-[20rem] px-2 py-1 border border-gray-700 chatBorder rounded text-black"
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="send-button ml-3" onClick={handleSubmit}>
              <div className="flex items-center justify-center">
                <FaPaperPlane width={25} height={25} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;

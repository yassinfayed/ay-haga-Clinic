import React from "react";
import { format } from "timeago.js";
import Image from "next/image";

const ChatComponent = ({ message, own }) => {
  const messageStyle = own ? "user" : "agent";
  const alignStyle = own ? "flex-end" : "flex-start";
  const timestampColor = own ? "#363636" : "#777"; // Adjust the color as needed


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      // Add any success message or state update here
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Add any error message or state update here
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: alignStyle,
      }}
    >
      <div className={`message ${messageStyle}`}>
        <div className="flex">
        {message.text}
        <Image onClick={handleCopy} src="/copy.svg" height={20} width={20}></Image>
        </div>
        <div className="" style={{ color: timestampColor, marginTop: "5px" }}>
          {format(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;

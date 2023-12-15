import React from "react";
import { format } from "timeago.js";

const ChatComponent = ({ message, own }) => {
  const messageStyle = own ? "user" : "agent";
  const alignStyle = own ? "flex-end" : "flex-start";
  const timestampColor = own ? "#363636" : "#777"; // Adjust the color as needed

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: alignStyle,
      }}
    >
      <div className={`message ${messageStyle}`}>
        {message.text}
        <div className="" style={{ color: timestampColor, marginTop: "5px" }}>
          {format(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;

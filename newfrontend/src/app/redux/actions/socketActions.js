// socketActions.js
import {
    CROSS_NEW_MESSAGE,
    CROSS_SOCKET_CONNECT,
    CROSS_SOCKET_DISCONNECT
  } from "../constants/socketConstants";
  import crossSocketService from "../crossSocketServices";
  import axios from "axios";
  
  
  export const connectSocket2 = () => ({
    type: CROSS_SOCKET_CONNECT,
  });
  
  export const disconnectSocket2 = () => ({
    type: CROSS_SOCKET_DISCONNECT,
  });
  
  export const receiveMessage2 = (message) => ({
    type: CROSS_NEW_MESSAGE,
    payload: message,
  });
  
  export const CrossinitSocket = () => {
    return (dispatch) => {
        console.log("crossinitsockettttttttttttttttt")
      dispatch(connectSocket2());
  
      crossSocketService.init(
        JSON.parse(localStorage.getItem("userInfo")).data.user._id
      );
      crossSocketService.on("crossnewMessage", (message) => {
        console.log("we will dispatch receive");
        dispatch(receiveMessage2(message));
      });
  
      // Add more event listeners as needed
    };
  };
  
  export const CrossSendMessage = (messageData) => {
    return async (dispatch) => {
      try {
        // Assuming you have a proper API endpoint for sending messages
        console.log("message data:", messageData);
        const response = await axios.post(
          `http://localhost:8080/api/v1/chat/sendCross`,
          messageData
        );
  
        if (response.status === 201) {
          // Message sent successfully, no need to do anything here
        } else {
          console.error("Failed to send message:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };
  };
  
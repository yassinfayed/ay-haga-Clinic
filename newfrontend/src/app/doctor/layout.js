"use client";
import Sidebar from "@/components/Sidebar";
import DrawerNavigation from "./components/RightBar";
import ChatPanel from "@/components/chatModal";
import { useState } from "react";
import { FaComment, FaPaperPlane, FaTimes } from "react-icons/fa";
import { CrossinitSocket } from "../redux/actions/socketActions";
import { useDispatch } from "react-redux";

export default function DashboardLayout({ children }) {
  const [showChatPanel, setShowChatPanel] = useState(false);


  const dispatch = useDispatch();
  const handleChatIconClick = () => {
    setShowChatPanel(true);
    dispatch(CrossinitSocket());
  };

  const handleCloseChatPanel = () => {
    setShowChatPanel(false);
  };

  return (
    <>
      <Sidebar />

      <div className="p-[32px] grow flex-1 sm:ml-64 flex flex-col">
        {children}
        {/* <Footer /> */}
        <div
          className="chat-icon"
          onClick={handleChatIconClick}
          data-tip="Get Help from one of our pharmacists"
        >
          <FaComment />
        </div>
        <ChatPanel
          isOpen={showChatPanel}
          handleClose={handleCloseChatPanel}
        ></ChatPanel>
      </div>
    </>
  );
}

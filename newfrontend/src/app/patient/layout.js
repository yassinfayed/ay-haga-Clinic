"use client";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import ChatPanel from "@/components/chatModal";
import { useState } from "react";
import { FaComment, FaPaperPlane, FaTimes } from "react-icons/fa";
// import { fetchData } from "../redux/getMe";

export default function DashboardLayout({ children }) {

  const [showChatPanel, setShowChatPanel] = useState(false);
  const handleChatIconClick = () => {
    setShowChatPanel(true);

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
        <ChatPanel isOpen={showChatPanel} handleClose={handleCloseChatPanel}></ChatPanel>
      </div>
    </>
  );
}

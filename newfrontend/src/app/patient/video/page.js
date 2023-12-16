"use client";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io, { Socket } from "socket.io-client";
import { Card } from "@tremor/react";
import Image from "next/image";
import { TextInput } from "@tremor/react";
import { Button } from "@tremor/react";
import { Grid } from "@tremor/react";

function Video() {
  const myVideoRef = useRef(); // useRef for the video element
  const myVideo = myVideoRef.current; // Use .current to get the ref

  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const userVideoRef = useRef();
  const userVideo = userVideoRef.current;
  const connectionRef = useRef();
  const [selectedTexts, setSelectedTexts] = useState([]);
  const socketRef = useRef();
  const [originalStream, setOriginalStream] = useState(null);

  const username = JSON.parse(localStorage.getItem("userInfo")).data.user
    .username;
  const [name, setName] = useState(username);

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8000");
    socketRef.current.on("me", (id) => {
      console.log(me);
      setMe(id);
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        setOriginalStream(stream);
        if (myVideo) {
          myVideo.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    socketRef.current.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, [myVideo]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socketRef.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideoRef.current.srcObject = stream;
    });
    socketRef.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  const [isMicOn, setIsMicOn] = useState(true);

  const toggleMic = () => {
    if (isMicOn) {
      stream.getAudioTracks()[0].enabled = false;
    } else {
      stream.getAudioTracks()[0].enabled = true;
    }

    setIsMicOn((prev) => !prev);
  };

  const [isCameraOn, setIsCameraOn] = useState(true);

  const toggleCamera = async () => {
    try {
      if (!isCameraOn) {
        stream.getVideoTracks()[0].enabled = true;
      } else {
        stream.getVideoTracks()[0].enabled = false;
      }
    } catch (error) {
      console.error("Error toggling camera:", error);
    }

    console.log(myVideo);
    setIsCameraOn((prev) => !prev);
  };

  return (
    <div className="h-full overflow-hidden pl-10">
      <main id="dashboard-main" className=" overflow-auto px-4 py-10">
        <div className="flex flex-row gap-2 ml-[3rem]">
          <video
            playsInline
            muted
            className=""
            ref={myVideoRef}
            style={{ width: "35vw" }}
            autoPlay
          />
          {!callAccepted ? (
            <Card>
              <h1 className="text-5xl mt-[3rem] font-bold text-center text-white-200">
                Lobby
              </h1>
              <div>
                <p className="mt-4 text-muted text-center text-xl text-gray-400">
                  Please wait for your doctor to share the room ID with you on
                  chat when your appointment begins.
                </p>
              </div>
              <div className=" mt-[4rem] flex justify-center items-center">
                <TextInput
                  placeholder="Room Id"
                  type="text"
                  className="w-[12rem] h-[2rem]"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                />
              </div>
              <div className="mt-[2rem] flex justify-center items-center">
                <Button
                  className="w-[12rem] h-[2rem] hover:underline focus:outline-none"
                  size="xs"
                  variant="secondary"
                  color="green"
                  onClick={() => callUser(idToCall)}
                >
                  Join
                </Button>
              </div>
            </Card>
          ) : null}
          {callAccepted && !callEnded ? (
            <video
              playsInline
              ref={userVideoRef}
              muted
              autoPlay
              style={{ width: "35vw" }}
            />
          ) : null}
        </div>
        {callAccepted && !callEnded ? (
          <div className="mt-[4rem] flex justify-center items-center">
            <div>
              <div className="ml-5" role="button" onClick={toggleMic}>
                <span className="">
                  <Image
                    src={isMicOn ? "/mic.svg" : "/muted.svg"}
                    height={25}
                    width={25}
                  ></Image>
                </span>
              </div>
            </div>
            <div>
              <div className="ml-5" role="button" onClick={leaveCall}>
                <span className="">
                  <Image src="/leave.svg" height={25} width={25}></Image>
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default Video;

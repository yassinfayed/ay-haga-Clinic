"use client";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io, { Socket } from "socket.io-client";
import { Button } from "../../../../components/Button";
import Image from "next/image";

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

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socketRef.current.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideoRef.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  const coptText = () => {
    const textToCopy = me;
    const dummyElement = document.createElement("textarea");
    document.body.appendChild(dummyElement);
    dummyElement.value = textToCopy;
    dummyElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyElement);
    setSelectedTexts([...selectedTexts, textToCopy]);
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

   const requestFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  
   const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('fullscreen-container');
    const videoContainer = document.getElementById('video-container');

    if (document.fullscreenElement) {
      exitFullscreen();
      videoContainer.style.marginTop = "";
    } else {
      requestFullscreen(container);
      videoContainer.style.marginTop = "12rem"; 
    }
  };

  

  return (
    <>
      <div
        id="fullscreen-container"
        className="container-fluid"
        style={{
          backgroundColor: callAccepted && !callEnded ? "black" : "white",
        }}
      >
        
        <div id="video-container" className="video-container container-fluid d-flex">
          <div
            className={`video ${
              callAccepted && !callEnded ? "offset-lg-1" : "offset-lg-2"
            } my-5`}
          >
            {stream && isCameraOn ? (
              <>
              <div>
              <video
                playsInline
                muted
                ref={myVideoRef}
                autoPlay
                style={{ width: "35vw" }}
              />
              </div>
              
              </>
            ) : (
              <img
                src="/cameraBackground.svg"
                alt="Camera Off"
                className="img-fluid"
                style={{ width: "35vw", height: "50vh" }}
              />
            )}
          </div>
          <div className="">
                {!callAccepted ? (
                  
                  
                    <div className="container-fluid offset-lg-4 offset-md-4">
                      <h4 className=" my-lg-4 mt-0 text-center text-title">Lobby</h4>
                      <div className="underline-Bold mx-auto mb-lg-5"></div>
                      
                    <span className="col-lg-6" style={{ color: "black" }}><h5 style={{ fontWeight: 'bold' }}>My Room ID: </h5>{me}</span>
    
                    <br />
                    <br />
    
                    <Button
                      text="Copy My Room ID"
                      onClick={coptText}
                      variant="contained"
                      color="primary"
                      className="col-lg-9 col-md-9"
                    ></Button>
    
                    <br/>
                    <br />

                    <h5 style={{ fontWeight: 'bold' }}>Join A Room</h5>

                    <input
                      id="filled-basic"
                      label="ID to call"
                      placeholder="Room ID"
                      variant="filled"
                      value={idToCall}
                      onChange={(e) => setIdToCall(e.target.value)}
                    />
                    <br />
                    <br />
                    <div className=" mb-3 call-button">
                      <Button
                        text="Join"
                        color="primary"
                        aria-label="call"
                        variant="contained"
                        className="col-lg-7 col-md-3"
                        onClick={() => callUser(idToCall)}
                      ></Button>
                    </div>
                    <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button
                text="Answer"
                variant="contained"
                color="success"
                onClick={answerCall}
                className="col-lg-4"
              ></Button>
              <Button
                text="Decline"
                variant="contained"
                color="danger"
                className="col-lg-4 mx-3"
              ></Button>
            </div>
          ) : null}
        </div>
                  </div> 
                  
                  
                  ) : (
                    null
                )}
              </div>
          <div className=" offset-lg-1 offset-md-2 video my-5 ">
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
        </div>
        <div className="myId">
          <>
            {callAccepted && !callEnded ? (
              <div className=" container-fluid d-flex">
                <div className="container-fluid offset-lg-1 d-flex justify-content-center align-items-center">
                  <Button
                    text={
                      <Image
                        src={isMicOn ? "/mic.svg" : "/muted.svg"}
                        height={30}
                        width={30}
                      />
                    }
                    variant="xs"
                    color="dark"
                    onClick={toggleMic}
                    className="mx-lg-3 mx-md-3"
                  />
                  <Button
                    text={<Image src="/leave.svg" height={30} width={30} />}
                    variant="xs"
                    color="dark"
                    className="mx-lg-3 mx-md-3"
                    onClick={leaveCall}
                  />
                  <Button
                    text={
                      <Image
                        src={isCameraOn ? "/cameraOn.svg" : "/cameraOff.svg"}
                        height={30}
                        width={30}
                      />
                    }
                    className="mx-lg-3 mx-md-3"
                    variant="xs"
                    color="dark"
                    onClick={toggleCamera}
                  />
                </div>

                <div className=" justify-content-end">
                  <Button
                    text={
                      <Image src="/fullscreen.svg" height={30} width={30} />
                    }
                    className="mx-lg-4"
                    variant="xs"
                    color="dark"
                    onClick={toggleFullscreen}
                  />
                </div>
              </div>
            ) : (
              null
            )}
          </>
        </div>
        <br />
      </div>
    </>
  );
}

export default Video;

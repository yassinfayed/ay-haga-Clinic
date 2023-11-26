'use client'
import React, { useEffect, useRef, useState } from "react"
import Peer from "simple-peer"
import io from "socket.io-client"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Button } from "../../../../components/Button"

const socket = io.connect('http://localhost:8000')


function Video() {
	const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()

	useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setStream(stream);
            myVideo.current.srcObject = stream;
          })
          .catch((error) => {
            console.error('Error accessing media devices:', error);
          });
    
        const socket = io.connect('http://localhost:8000');
    
        socket.on("me", (id) => {
          console.log("Socket connected. My ID:", id);
          setMe(id);
        });
    
        socket.on("callUser", (data) => {
          console.log("Received call from", data.from, "with name", data.name);
          setReceivingCall(true);
          setCaller(data.from);
          setName(data.name);
          setCallerSignal(data.signal);
        });
      }, []);
    
      const callUser = (id) => {
        console.log("Calling user with ID", id);
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream
        });
    
        peer.on("signal", (data) => {
          console.log("Generated signal data for calling user", id, data);
          socket.emit("callUser", {
            userToCall: id,
            signalData: data,
            from: me,
            name: name
          });
        });
    
        peer.on("stream", (stream) => {
          console.log("Received stream from user", id);
          userVideo.current.srcObject = stream;
        });
    
        socket.on("callAccepted", (signal) => {
          console.log("Call accepted by user", id);
          setCallAccepted(true);
          peer.signal(signal);
        });
    
        connectionRef.current = peer;
      }
    
      const answerCall = () => {
        console.log("Answering call from user", caller);
        setCallAccepted(true);
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream
        });
    
        peer.on("signal", (data) => {
          console.log("Generated signal data for answering call", data);
          socket.emit("answerCall", { signal: data, to: caller });
        });
    
        peer.on("stream", (stream) => {
          console.log("Received stream from user", caller);
          userVideo.current.srcObject = stream;
        });
    
        peer.signal(callerSignal);
        connectionRef.current = peer;
      }
    
      const leaveCall = () => {
        console.log("Leaving call");
        setCallEnded(true);
        connectionRef.current.destroy();
      }

	return (
		<>
			<h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
		<div className="container-fluid">
			<div className="container-fluid d-flex">
            <div className="row">
          <div >
            <div className="video">
              {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "130%" }} />}
            </div>
          </div>
          <div>
            <div className="video">
              {callAccepted && !callEnded ?
                <video playsInline ref={userVideo} autoPlay style={{ width: "130%" }} /> :
                null}
            </div>
          </div>
        </div>
			</div>
			<div className="myId">
				<input
					id="filled-basic"
					label="Name"
                    placeholder="My Caller Name"
					variant="filled"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ marginBottom: "20px" }}
				/>

                <br />
				
				<CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
					<Button text="Copy My Room ID"variant="contained" color="primary">
					</Button>
				</CopyToClipboard>

                <br />
                <br />

				<input
					id="filled-basic"
					label="ID to call"
                    placeholder="Room ID to join"
					variant="filled"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
                <br />
                <br />
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<Button text ="End Call" variant="contained" color="secondary" onClick={leaveCall}>
							End Call
						</Button>
					) : (
						<Button text="Join" color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
							
						</Button>
					)}
					{idToCall}
				</div>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<Button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div>
		</>
	)
}

export default Video
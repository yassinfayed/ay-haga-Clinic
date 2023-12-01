'use client'
import React, { useEffect, useRef, useState } from "react"
import Peer from "simple-peer"
import io, { Socket } from "socket.io-client"
import { Button } from "../../../../components/Button"




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
	const [selectedTexts, setSelectedTexts] = useState([]);
	const socketRef = useRef();


	const role = JSON.parse(localStorage.getItem('userInfo')).data.user.role;

	useEffect(() => {

		socketRef.current = io.connect("http://localhost:8000");

		socketRef.current.on("me", (id) => {
			setMe(id);
			console.log("my socket id : ", id);
			
		})


		navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
                myVideo.current.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
            });

		

		socketRef.current.on("callUser", (data) => {
			console.log("Received a call:", data);
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})




	}, [])

	const callUser = (id) => {
		console.log("calling");
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socketRef.current.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			
				userVideo.current.srcObject = stream
			
		})
		socketRef.current.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socketRef.current.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

	const coptText = () => {
		const textToCopy = me;
		const dummyElement = document.createElement('textarea');
		document.body.appendChild(dummyElement);
		dummyElement.value = textToCopy;
		dummyElement.select();
		document.execCommand('copy');
		document.body.removeChild(dummyElement);
		setSelectedTexts([...selectedTexts, textToCopy]);
	  };
	  

	return (
		<>
		<div className="container">
    <div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
				{me}
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
				
					<Button text="Copy My Room ID" onClick={coptText} variant="contained" color="primary">
					</Button>
				

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
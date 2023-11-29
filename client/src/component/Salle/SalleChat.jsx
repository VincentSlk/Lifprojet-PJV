import { useEffect, useState } from "react"
import io from "socket.io-client"
import {} from "react"

const socket = io.connect("http://localhost:5174")

function SalleChat() {

//Room
const [room, setRoom] = useState("");

//Message
const [message , setMessage] = useState("");
const [messageReceived, setMessageReceived] = useState("")


const joinRoom = () =>{
    if (room!==""){
        socket.emit("join_room", room)
    }
}


const sendMessage = () => {
    socket.emit("send_message" , {message , room})
};

useEffect(() =>{
    socket.on("receive_message" , (data) =>{
        setMessageReceived(data.message)
    });
    
}, [socket] );

  return (
    <>
    <div> 
        <input placeholder="Salon number" onChange={(event)=>{
            setRoom(event.target.value)
        }}/>
        <button onClick={joinRoom}>CAKKKK</button>
    <input placeholder="Message..." onChange={(event)=>{
        setMessage(event.target.value);
    }} />
    <button onClick={sendMessage}>Envoyer</button>
    <h1>Message : </h1>
    {messageReceived}
    </div>
    </>
  )
}

export default SalleChat
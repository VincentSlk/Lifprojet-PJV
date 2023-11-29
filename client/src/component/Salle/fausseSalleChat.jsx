import io from 'socket.io-client'
import "./../../index.css"
const socket = io.connect("http://localhost:5174")




export default function SalleChat() {

  let infoMessage = document.getElementById('message-container')
  let contenuMessage = document.getElementById('send-container')
  let envoyerMessage = document.getElementById('message-input')
  
socket.on('chat-message' , data =>{
  AjouterMessage(data)
})

contenuMessage.addEventListener('submit' , e => {
  e.preventDefault()
  const message = envoyerMessage.value
  socket.emit('send-chat-message' , message)
  envoyerMessage.value = ''
})//bug


function AjouterMessage(message){
  const messageElement = document.createElement('div')
    messageElement.innerText = message
    infoMessage.append(messageElement)

}

  return (
<>


    <div id="chatbox">
    <div id="message-container">
      
    </div>
    <form id="send-container">
      <input type="text" id="message-input" className="border-black bg-gray-300"/>
      <button type="submit" id="send-buton">Envoyer</button>
    </form>

    </div>


</>
  );
}
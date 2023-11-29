/*
import io from 'socket.io-client'
import "./../../index.css"
const socket = io.connect("http://localhost:5174")
const infoMessage = document.getElementById('message-container')
const contenuMessage = document.getElementById('send-container')
const envoyerMessage = document.getElementById('message-input')

export default function SalleChat() {
/*
//const Pseudo = prompt('Entrer votre pseudo');
appendMessage('Tu as rejoin');
socket.emit('nouveau-joueur' , Pseudo)
contenuMessage.addEventListener('submit' , e => {
  e.preventDefault()
  const message = envoyerMessage.value
  socket.emit('send-chat-message' , message)
  envoyerMessage.value = ''
})//bug

socket.on('chat-message' , data =>{
  AjouterMessage(data)
})



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
*/
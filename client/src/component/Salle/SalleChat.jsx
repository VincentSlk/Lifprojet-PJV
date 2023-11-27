import io from 'socket.io-client'
const socket = io.connect("http://localhost:5174")

socket.on('chat-message' , data =>{
  console.log(data)
} )



export default function SalleChat() {
  return (
<>





    <div id="message-container">
      
    </div>
    <form id="send-container">
      <input type="text" id="message-input" className="border-black bg-gray-300"/>
      <button type="submit" id="send-buton">Envoyer</button>
    </form>


  








</>
  );
}

//import React from "react";
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5174")
function Body() {

const sendMessage = () => {
  socket.emit()
};

  return (
    <div className="containerMain h-[95%]">
      <div className="flex flex-col ">
        {/* Button creer qui amene sur une page vers un nouveau jeu */}

        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black rounded-lg">Créer</button>
       
        <br/>

        {/* Button REJOINDRE qui amene sur la page avec l'id correspondant
              SI L' ID N ' EST PAS BON ENVOIE UNE ERREUR EN ALERT */}

        <button onClick={sendMessage} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black rounded-lg">Rejoindre</button>
        <input placeholder="Entrer l'identifiant de la partie" className="bg-gray-10 font-bold py-1 px-4 border border-black rounded-lg"></input>
      </div>
    </div>
  );
}

export default Body;

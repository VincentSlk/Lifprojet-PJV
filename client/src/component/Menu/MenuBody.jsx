//import React from "react";
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5174")

function MenuBody() {

/*
  const sendIdSalon = () => {
    var IdSalon = document.getElementById("CodeSalon")
    socket.emit("send_Id_Salon",IdSalon );
  };
*/

const sendIdSalon = () => {
  var IdSalon = document.getElementById("CodeSalon")
  socket.emit("send_Id_Salon", {message:"IdSalon"});
};

  return (
    
    <div className="containerMain h-[95%]">
      <div className="flex flex-col ">
        {/* Button creer qui amene sur une page vers un nouveau jeu */}

        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black rounded-lg">Créer</button>
       
        <br/>

        {/* Button REJOINDRE qui amene sur la page avec l'id correspondant
              SI L' ID N ' EST PAS BON ENVOIE UNE ERREUR EN ALERT */}

        <button onClick={sendIdSalon} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black rounded-lg">Rejoindre</button>
        <input type="text" id="CodeSalon" placeholder="Entrer l'identifiant de la partie" className="bg-gray-10 font-bold py-1 px-4 border border-black rounded-lg"></input>
      </div>
    </div>
    
  );
}

export default MenuBody;

//JE DOIS CHOPPER LE TEXTE DANS LE TEXT AREA 
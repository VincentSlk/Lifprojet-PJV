import Body from "../component/Principale/MenuBody.jsx";
import Footer from "../component/Principale/MenuFooter.jsx";

export default function Menu() {
  return (
    <div className="h-[100vh] overflow-hidden">
      <Body />
      <Footer />
    </div>
  )
}

// CODE BON PLUS BESOIN DE TOUCHER

/*
<div className="flex flex-col ">
        {/* Button creer qui amene sur une page vers un nouveau jeu */

      //   <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black rounded-lg">Créer</button>
       
      //   <br/>

      //   {/* Button REJOINDRE qui amene sur la page avec l'id correspondant
      //         SI L' ID N ' EST PAS BON ENVOIE UNE ERREUR EN ALERT */}

      //   <button /*onClick={sendIdSalon}*/ className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black rounded-lg">Rejoindre</button>
      //   <input type="text" id="CodeSalon" placeholder="Entrer l'identifiant de la partie" className="bg-gray-10 font-bold py-1 px-4 border border-black rounded-lg"></input>
      // </div>
      // */
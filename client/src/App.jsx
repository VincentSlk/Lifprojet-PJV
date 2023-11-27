import Menu from "./component/Menu/Menu.jsx"
import Salon from "./component/Salon/Jeu1.jsx"
import {Routes , Route} from "react-router-dom"

import Erreur from "./component/Erreur.jsx"

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Menu/>}/>
    <Route path="/Salon/:Numero" element={<Salon/>} />
    <Route path="/Salon/*" element={<Erreur/>} />
    </Routes>
    </>
  );
}

export default App;


{/* 

  button 1 2 et 3 


*/}
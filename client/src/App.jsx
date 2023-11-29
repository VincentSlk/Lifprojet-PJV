import Erreur from "./component/Erreur.jsx"
import Menu from "./component/Menu/Menu.jsx"
import Salle from "./component/Salle/Salle.jsx"

import {Routes , Route} from "react-router-dom"

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Menu/>}/>
    <Route path="/Salle/:Numero" element={<Salle/>} />
    <Route path="*" element={<Erreur/>} />
    </Routes>
    </>
  );
}

export default App;


{/* 

  button 1 2 et 3 


*/}

import Erreur from "./component/Erreur.jsx"
import Principale from "./Pages/Principale.jsx"
import Jeux from "./Pages/Jeux.jsx"

import {Routes , Route} from "react-router-dom"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Principale/>}/>
      <Route path="/chat" element={<Jeux/>} />
      <Route path="*" element={<Erreur/>} />
    </Routes>
    </>
  );
}

export default App;

// CODE BON PLUS BESOIN DE TOUCHER 
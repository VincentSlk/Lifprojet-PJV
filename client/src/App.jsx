import Menu from "./component/Menu/Menu.jsx"
import Salon from "./component/Salon/Jeu1.jsx"
import {Routes , Route} from "react-router-dom"


function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Menu/>}/>
    <Route path="/Salon/:JeuX" element={<Salon/>} />
    </Routes>
    </>
  );
}

export default App;


{/* 

  button 1 2 et 3 


*/}
import Menu from "./component/Menu/Menu.jsx"
import {Routes , Route} from "react-router-dom"


function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Menu/>}/>
    {/*<Route path="Salon" element={<Salon/>} />*/}
    </Routes>
    </>
  );
}

export default App;


{/* 

  button 1 2 et 3 


*/}
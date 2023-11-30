import Chat from "../component/Jeux/Chat"
import Phaser from "../component/Jeux/Phaser"
import "../index.css"


const Jeux = () => {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 ">
        <Phaser />
      </div>
      <div className="bg-black">
        <Chat />
      </div>
    </div>
  )
}

export default Jeux

// CODE BON PLUS BESOIN DE TOUCHER 

//tile bg-amber-500 row-start-2 row-end-5 col-span-1 md:col-span-2 lg:col-span-3">
 
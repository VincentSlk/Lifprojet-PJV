import Chat from "../component/Jeux/Chat"
import Phaser from "../component/Jeux/Phaser"
import "../index.css"


const Jeux = () => {
  return (
    <>
      <div className="col-span-2 w-2/3 absolute left-0 bottom-0">
        <Phaser />
      </div>
      <div className="bg-black border-black absolute right-0 bottom-0 w-1/3">
        <Chat />
      </div>
    </>
  )
}

export default Jeux

// CODE BON PLUS BESOIN DE TOUCHER 

//tile bg-amber-500 row-start-2 row-end-5 col-span-1 md:col-span-2 lg:col-span-3">
 
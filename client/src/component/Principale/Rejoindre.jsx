import { Link } from "react-router-dom";
import { useState } from "react";

const CreateRoom = () => {
  const [room, setRoom] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <div className="bg-gray-700 text-white font-bold py-3 px-4 border border-black rounded-lg">
      <div className="container-inputs">
        <div className="side-create-room">
          <h3>Pseudo</h3>
          <input
            className="create_room_input"
            type="text"
            placeholder="Entrer votre pseudo"
            name="text"
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
          />
        </div>

        <div className="side-join-room">
          <h3>Rejoindre un salon</h3>
          <div className="input-pseudo">
            <input
              type="text"
              placeholder="Code du salon"
              name="text"
              className="input small create_room_input"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <Link to={`/chat?room=${room}&author=${author}`}>
              <button className="create_room_button text-white">Join</button>
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CreateRoom;
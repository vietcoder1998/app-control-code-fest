import React, { useEffect, useState } from "react";
import "./driver.css";
import VirtualView from "../virtual-view/VirtualView";

function Driver({ default_player_id = "", control_id = "", socket }) {
  const [player_id, setPlayerId] = useState(default_player_id);
  const [game_id, setGameId] = useState("");

  // Function to handle sending the movement action
  const sendAction = (action) => {
    socket.emit("drive-action", { action, player_id });
  };

  const switchWeapon = (action) => {
    socket.emit("switchWeapon", { player_id });
  };

  const terminateService = (action) => {
    socket.emit("terminateService", { player_id });
  };

  const startService = (action) => {
    socket.emit("restartService", { player_id, game_id });
  };

  const marryWife = (action) => {
    socket.emit("marryWife", { player_id, player_id });
  };

  const [moveType, setMoveType] = useState("");

  useEffect(() => {
    const driveZone = document.getElementById(control_id);

    if (driveZone) {
      driveZone.addEventListener(
        "keydown",
        (event) => {
          console.log(event.key);
          switch (event.key) {
            case "w":
              sendAction("up");
              break;

            case "s":
              sendAction("down");

              break;

            case "a":
              sendAction("left");

              break;

            case "d":
              sendAction("right");

              break;
            case " ":
              sendAction("fire");

              break;
            case "b":
              sendAction("stop");

              break;

            default:
              break;
          }
        },
        []
      );
    }

    return () => {
      if (driveZone) {
        driveZone.removeEventListener("keydown", () => {
          console.log("remove");
        });
      }
    };
  }, [control_id]);

  const onRegister = () => {
    socket.emit("register", { game_id, player_id });
  };
  return (
    <div className="App" id={control_id}>
      <h2>Driver Control Panel {player_id}</h2>
      <div>
        <input
          value={player_id}
          onChange={(e) => setPlayerId(e.target.value)}
        />
        <input value={game_id} onChange={(e) => setGameId(e.target.value)} />
        <button onClick={onRegister}>Register</button>
      </div>
      <div className="controls">
        <select
          name="use child"
          id="cars"
          onChange={(e) => {
            setMoveType(e.target.value);
          }}
        >
          <option value="child">Children</option>
          <option value="parent">parent</option>
        </select>
        <button onClick={() => sendAction("up")}>Up</button>
        <button onClick={() => sendAction("down")}>Down</button>
        <button onClick={() => sendAction("left")}>Left</button>
        <button onClick={() => sendAction("right")}>Right</button>
        <button onClick={() => sendAction("stop")}>Stop</button>
        <button onClick={() => sendAction("fire")}>Fire</button>
        <button onClick={() => sendAction("fire")}>Fire</button>
        <button onClick={() => switchWeapon()}>Switch Weapon</button>
        <button onClick={() => marryWife()}>Marry wife</button>
        <button style={{ color: "red" }} onClick={() => terminateService()}>
          Terminate
        </button>
        <button onClick={() => startService()}>Start Service</button>
      </div>
      <div>
        <VirtualView socket={socket} />
      </div>
    </div>
  );
}

export default Driver;

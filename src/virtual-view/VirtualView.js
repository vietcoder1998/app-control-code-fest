import React from "react";
import "./App.css";
import { GameObject, OBJECT_VALUE } from "./data/object-name";
import { socketEvent } from "./event";

// "undefined" means the URL will be computed from the `window.location` object
function GameData(gamePlay) {
  return {
    gameMap: gamePlay.gameMap,
  };
}

let MapView = <></>;

function VirtualView({ socket }) {
  const [gameData, setGameData] = React.useState();

  React.useEffect(() => {
    socket.on("error", (error) => {
      console.error(error);
    });

    socket.on(socketEvent.refresh, (gameData) => {
      if (gameData) {
        MapView = (
          <>
            {gameData.gameMap.data.map((block, y) => (
              <div style={{ display: "flex" }}>
                {block.map((type, x) =>
                  GameObject(
                    type,
                    [...gameData.gameObjs, ...gameData.characters],
                    x,
                    y
                  )
                )}
              </div>
            ))}
          </>
        );

        setGameData(() => socket.id);
      } else {
        console.log("No gameplay founded");
      }
    });

    socket.on(socketEvent.endGame, (playerId) => {
      console.error("Game end the loser is" + playerId);
    });

    return () => {
      // socket.disconnect()
      // socket.close()
    };
  }, []);

  return (
    <div className="App">
      {gameData}
      <div>
        There are{" "}
        {gameData?.data?.filter((value) => value === OBJECT_VALUE.boom)?.length}{" "}
        in screen
      </div>
      <div>This is socket connected</div>
      <>{MapView}</>
    </div>
  );
}

export default VirtualView;

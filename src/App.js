import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Driver from "./component/Drive";
import { useParams} from 'react-router-dom'

const socket = io("http://localhost:5000");

function App() {

  return (
    <div className="App" style={{ width: "100%" }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <Driver
            default_player_id="player1-xxx"
            control_id="player_1"
            socket={socket}
          ></Driver>
        </div>
        <div style={{ width: "50%" }}>
          <Driver
            default_player_id="player2-xxx"
            control_id="player_2"
            socket={socket}
          ></Driver>
        </div>
      </div>
    </div>
  );
}

export default App;

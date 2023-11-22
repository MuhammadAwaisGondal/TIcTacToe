import { useState, useEffect } from "react"
import "./App.css";
import Game from "./Game/Game";
import Player from "./Game/Player";

function App() {

  const [firstPlayerTitle, setFirstPlayerTitle] = useState("Player 1")
  const [secondPlayerTitle, setSecondPlayerTitle] = useState("Player 2")
  const [players, setPlayers] = useState([firstPlayerTitle, secondPlayerTitle]);

  useEffect(() => {
    let updatedPlayers = [firstPlayerTitle, secondPlayerTitle]
    setPlayers(updatedPlayers)
  }, [firstPlayerTitle, secondPlayerTitle])

  const handlePlayerTitleChange = (id, value) => {
    //  updatedPlayers = []
    if(id == "player1"){
      setFirstPlayerTitle(value)
    } else {
      setSecondPlayerTitle(value)
    }
}

  let wel = "Welcome to TicTacToe!";
  return (
    <>
    <div className="wel">{wel}</div>
    <ol id="players">
        <Player id="player1" name={firstPlayerTitle} updatePlayerTitle={handlePlayerTitleChange} symbol="X"/>
        <Player id="player2" name={secondPlayerTitle} updatePlayerTitle={handlePlayerTitleChange} symbol="O"/>
    </ol>
    <Game players={players}/>
    </>
    );
}

export default App;

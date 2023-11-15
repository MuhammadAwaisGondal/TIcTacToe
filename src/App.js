import "./App.css";
import "./Mode.css";
import Game from "./Game/Game";
import { useState } from "react";

function App() {
  let wel = "Welcome to TicTacToe!";
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="container">
        <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
        <div className="switch-checkbox">
          <label className="switch">
            <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
            <span className="slider round"> </span>
          </label>
        </div>
        <span style={{ color: darkMode ? "#c96dfd" : "grey" }}>☽</span>
      </div>
      <div>
        <h1 className="welcome">{wel}</h1>
        <Game />
      </div>
    </div>
    );
}

export default App;

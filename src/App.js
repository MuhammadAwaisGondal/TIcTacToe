import "./App.css";
import "./Mode.css";
import Game from "./Game/Game";
import { useState } from "react";


function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="container">
        <span className={`sun ${darkMode ? 'dark-mode' : ''}`}>☀︎</span>
        <div className="switch-checkbox">
          <label className="switch">
            <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
            <span className="slider round"> </span>
          </label>
        </div>
        <span className={`moon ${darkMode ? 'dark-mode' : ''}`}>☽</span>
      </div>
      <div>
        <h1 className="welcome">"Welcome to TicTacToe!"</h1>
        <Game />
      </div>
    </div>
    );
}

export default App;

import "./Games.css";
import "./Player.css";
import "../Mode.css";
import React, { useState, useEffect } from "react";
import Player from "./Player";


function Square({ value, onSquareClick }) {
  return(
    <button data-testid="square" className={`square ${value === 'O' ? "pink" : "green"}`} onClick={onSquareClick}>
    {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, players, playAgainstComputer }) {
  
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  debugger
  let winnerName = (winner === 'X') ? players[0] : players[1]
  if(playAgainstComputer && winner === "O") { winnerName = "Computer"}
  if (winner) {
    status = "Winner of this round is: " + winnerName;
  } else {
    status = "Next player is: " + (xIsNext ? players[0] : players[1]);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [firstPlayerTitle, setFirstPlayerTitle] = useState("Player 1");
  const [secondPlayerTitle, setSecondPlayerTitle] = useState("Player 2");
  const [players, setPlayers] = useState([firstPlayerTitle, secondPlayerTitle]);

  useEffect(() => {
    let updatedPlayers = [firstPlayerTitle, secondPlayerTitle]
    setPlayers(updatedPlayers)
  }, [firstPlayerTitle, secondPlayerTitle])

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playAgainstComputer, setPlayAgainstComputer] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlayerTitleChange = (id, value) => {
    if (id === "player1") {
      setFirstPlayerTitle(value);
    } else {
      setSecondPlayerTitle(value);
    }
  };

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1);
    const newCurrentMove = nextHistory.length;
    const newHistory = [...nextHistory, nextSquares];

    if (playAgainstComputer && !calculateWinner(nextSquares) && xIsNext) {
      const computerMove = findBestMove(nextSquares);
      nextSquares[computerMove] = "O";
      setHistory([...newHistory, nextSquares]);
      setCurrentMove(newCurrentMove + 1);
    } else {
      setHistory(newHistory);
      setCurrentMove(newCurrentMove);
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li className="lis" key={move}>
        <button className="scrollhistory" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const handleTogglePlayer = () => {
    setPlayAgainstComputer(!playAgainstComputer);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  return (
    <>
      <ol id="players">
        <Player id="player1" name={firstPlayerTitle} updatePlayerTitle={handlePlayerTitleChange} symbol="X"/>
        { !playAgainstComputer && <Player id="player2" name={secondPlayerTitle} updatePlayerTitle={handlePlayerTitleChange} symbol="O"/> }
      </ol>
      <div className="game">
        <div className="game-top">
          <button data-testid="go-to-start" id="toggleplayer" onClick={handleTogglePlayer}>
            {playAgainstComputer
              ? "Play against other player"
              : "Play against computer"}
          </button>
        </div>
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} players={players} playAgainstComputer={playAgainstComputer} />
        </div>
        <div className="game-info">
          <ol data-testid="history-move">{moves}</ol>
        </div>
        <div id="confetti-container"></div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Trigger multi-color confetti effect on winning
      const confettiContainer = document.getElementById("confetti-container");

      const colors = ["confetti-red", "confetti-green", "confetti-blue", "confetti-yellow", "confetti-purple"];

      for (let j = 0; j < 50; j++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti " + colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 2 + 1 + "s";
        confettiContainer.appendChild(confetti);
      }

      return squares[a];
    }
  }
  return null;
}

function findBestMove(squares) {
  const emptySquares = [];
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const tempSquares = squares.slice();
      tempSquares[i] = "X";
      if (calculateWinner(tempSquares)) {
        return i;
      }
      emptySquares.push(i);
    }
  }

  if (emptySquares.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  }

  return -1;
}

import { useState } from "react"
import "./Player.css";

export default function Player({id, name, symbol, updatePlayerTitle}) {

  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    if (name === '') {
      alert('Name cannot be empty');
    } else {
      setIsEditing((editing) => !editing);
    }
  }

  const handlePlayerNameChange = (value) => {
    updatePlayerTitle(id, value)
  }

  return (
    <li>
      <span className="player">
        <input
          disabled={isEditing ? false : true}
          className="player-name"
          value={name}
          onChange={(e) => handlePlayerNameChange(e.target.value)}
        >
        </input>
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}> {isEditing ? 'Save' : 'Edit'} </button>
    </li>
  )
}
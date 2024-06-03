import React, { useState } from 'react';
import { useNumberOfPlayers } from '../NumberOfPlayersContext';

const NumberOfPlayersContext = React.createContext({});

function TeamsForm() {
  const { numberOfPlayers } = useNumberOfPlayers();
  const [players, setPlayers] = useState<{ name: string }[]>([]);
  const [playerName, setPlayerName] = useState('');
  const isMaxPlayersReached = players.length >= numberOfPlayers;

  const handleAddPlayer = () => {
    const newPlayer = {
      name: playerName,
    };
    setPlayers([...players, newPlayer]);
    setPlayerName('');
  };

  const handleSubmit = () => {
    console.log(players);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <br></br>
      <button onClick={handleAddPlayer} disabled={isMaxPlayersReached}>Add Player</button> <button onClick={handleSubmit}>Submit</button>
      {players.length > 0 && (
        <>
          <h2>Player List</h2>
          <ul>
            {players.map((player: { name: string }, index: number) => (
              <li key={index}>
                {player.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TeamsForm;

import React, { useState } from 'react';
import { useNumberOfPlayers } from '../NumberOfPlayersContext';

const NumberOfPlayersContext = React.createContext({});

// Replace Squads with Squads

function SquadsForm({ onSubmit }: { onSubmit: () => void }) {
  const { numPlayers, numPlayersPerSquad } = useNumberOfPlayers();
  const [players, setPlayers] = useState<{ name: string }[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [squads, setSquads] = useState<{ [teamName: string]: string[] } | null>(null);
  const [showSquads, setShowSquads] = useState(false);
  const isMaxPlayersReached = players.length >= numPlayers;

  const handleAddPlayer = () => {
    const newPlayer = {
      name: playerName,
    };
    setPlayers([...players, newPlayer]);
    setPlayerName('');
  };

  const isPlayerNameEmpty = playerName.trim() === '';

  const randomizeSquads = () => {
    const newSquads: { [teamName: string]: string[] } = {};
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const numberOfSquads = Math.ceil(numPlayers / numPlayersPerSquad);

    for (let i = 0; i < numberOfSquads; i++) {
      newSquads[`Team ${i + 1}`] = [];
    }

    shuffledPlayers.forEach((player, index) => {
      const teamIndex = index % numberOfSquads;
      newSquads[`Team ${teamIndex + 1}`].push(player.name);
    });

    setSquads(newSquads);
  }

  const handleSubmit = () => {
    console.log(players);
    randomizeSquads();
    setShowSquads(true);
  };

  if (showSquads && squads) {
    return (
      <div>
        <h1>Squads</h1>
        {Object.keys(squads).map((teamName) => (
          <div key={teamName}>
            <h2>{teamName}</h2>
            <ul>
              {squads[teamName].map((playerName, index) => (
                <li key={index}>{playerName}</li>
              ))}
            </ul>
          </div>
        ))}
        <br></br>
        <button onClick={randomizeSquads}>Randomize Squads</button> <button onClick={onSubmit}>Submit</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Input Players</h1>
      <input
        type="text"
        placeholder="Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <br></br>
      <button onClick={handleAddPlayer} disabled={isMaxPlayersReached || isPlayerNameEmpty}>Add Player</button> <button onClick={handleSubmit} disabled={!isMaxPlayersReached}>Submit</button>
      
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

export default SquadsForm;

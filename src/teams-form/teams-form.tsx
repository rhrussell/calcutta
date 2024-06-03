import React, { useState } from 'react';
import { useNumberOfPlayers } from '../NumberOfPlayersContext';

const NumberOfPlayersContext = React.createContext({});

// Replace Teams with Squads

function TeamsForm() {
  const { numPlayers, numPlayersPerTeam } = useNumberOfPlayers();
  const [players, setPlayers] = useState<{ name: string }[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [teams, setTeams] = useState<{ [teamName: string]: string[] } | null>(null);
  const [showTeams, setShowTeams] = useState(false);
  const isMaxPlayersReached = players.length >= numPlayers;

  const handleAddPlayer = () => {
    const newPlayer = {
      name: playerName,
    };
    setPlayers([...players, newPlayer]);
    setPlayerName('');
  };

  const isPlayerNameEmpty = playerName.trim() === '';

  const randomizeTeams = () => {
    const newTeams: { [teamName: string]: string[] } = {};
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const numberOfTeams = Math.ceil(numPlayers / numPlayersPerTeam);

    for (let i = 0; i < numberOfTeams; i++) {
      newTeams[`Team ${i + 1}`] = [];
    }

    shuffledPlayers.forEach((player, index) => {
      const teamIndex = index % numberOfTeams;
      newTeams[`Team ${teamIndex + 1}`].push(player.name);
    });

    setTeams(newTeams);
  }

  const handleSubmit = () => {
    console.log(players);
    randomizeTeams();
    setShowTeams(true);
  };

  if (showTeams && teams) {
    return (
      <div>
        <h1>Teams</h1>
        {Object.keys(teams).map((teamName) => (
          <div key={teamName}>
            <h2>{teamName}</h2>
            <ul>
              {teams[teamName].map((playerName, index) => (
                <li key={index}>{playerName}</li>
              ))}
            </ul>
          </div>
        ))}
        <br></br>
        <button onClick={randomizeTeams}>Randomize Teams</button> <button onClick={handleSubmit}>Submit</button>
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

export default TeamsForm;

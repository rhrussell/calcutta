import React, { useState } from "react";
import { useNumberOfPlayers } from "../NumberOfPlayersContext";
import { Squad } from "../types";

interface SquadsFormProps {
  onSubmit: (squads: Squad[]) => void;
  salaryCap: number;
}

const NumberOfPlayersContext = React.createContext({});

const SquadsForm: React.FC<SquadsFormProps> = ({ onSubmit, salaryCap }) => {
  const { numPlayers, numPlayersPerSquad } = useNumberOfPlayers();
  const [players, setPlayers] = useState<{ name: string }[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [squads, setSquads] = useState<Squad[]>([]);
  const [showSquads, setShowSquads] = useState(false);
  const isMaxPlayersReached = players.length >= numPlayers;

  const handleAddPlayer = () => {
    const newPlayer = {
      name: playerName,
    };
    setPlayers([...players, newPlayer]);
    setPlayerName("");
  };

  const isPlayerNameEmpty = playerName.trim() === "";

  const randomizeSquads = () => {
    const newSquads: Squad[] = [];
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const numberOfSquads = Math.ceil(numPlayers / numPlayersPerSquad);

    for (let i = 0; i < numberOfSquads; i++) {
      newSquads.push({
        name: `Squad ${i + 1}`,
        players: [],
        teams: [],
        salaryCap: salaryCap,
      });
    }

    shuffledPlayers.forEach((player, index) => {
      const squadIndex = index % numberOfSquads;
      newSquads[squadIndex].players.push(player.name);
    });

    setSquads(newSquads);
  };

  const handleSubmit = () => {
    console.log(players);
    randomizeSquads();
    setShowSquads(true);
  };

  if (showSquads) {
    return (
      <div>
        <h1>Squads</h1>
        {squads.map((squad) => (
          <div key={squad.name}>
            <h2>{squad.name}</h2>
            <ul>
              {squad.players.map((playerName, index) => (
                <li key={index}>{playerName}</li>
              ))}
            </ul>
          </div>
        ))}
        <br></br>
        <button onClick={randomizeSquads}>Randomize Squads</button>{" "}
        <button onClick={() => onSubmit(squads)}>Submit</button>
      </div>
    );
  }

  return (
    <div>
      {!showSquads ? (
        <div>
          <h1>Input Players</h1>
          <input
            type="text"
            placeholder="Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <br />
          <button
            onClick={handleAddPlayer}
            disabled={isMaxPlayersReached || isPlayerNameEmpty}
          >
            Add Player
          </button>{" "}
          <button onClick={handleSubmit} disabled={!isMaxPlayersReached}>
            Submit
          </button>
          {players.length > 0 && (
            <>
              <h2>Player List</h2>
              <ul>
                {players.map((player: { name: string }, index: number) => (
                  <li key={index}>{player.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : (
        <div>
          <h1>Squads</h1>
          {squads.map((squad) => (
            <div key={squad.name}>
              <h2>{squad.name}</h2>
              <ul>
                {squad.players.map((playerName, index) => (
                  <li key={index}>{playerName}</li>
                ))}
              </ul>
            </div>
          ))}
          <br />
          <button onClick={randomizeSquads}>Randomize Squads</button>{" "}
          <button onClick={() => onSubmit(squads)}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default SquadsForm;

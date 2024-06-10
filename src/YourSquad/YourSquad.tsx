import React from "react";

interface Team {
  seed: string;
  name: string;
  record: string;
  region: string;
  opponent?: string;
  price?: number;
}

interface Squad {
  name: string;
  players: string[];
  teams: Team[];
  salaryCap: number;
}

interface YourSquadProps {
  squad: Squad;
}

const YourSquad: React.FC<YourSquadProps> = ({
  squad,
}) => {
  return (
    <div>
      <h3>Your Squad: {squad.name}</h3>
      <div>Remaining Salary Cap: ${squad.salaryCap}</div>
      <h4>Players</h4>
      <ul>
        {squad.players.map((playerName, index) => (
          <li key={index}>{playerName}</li>
        ))}
      </ul>
      <h4>Teams</h4>
      <ul>
        {squad.teams.map((team, index) => (
          <li key={index}>
            {`${team.seed} ${team.name} ${team.record} ${team.region} vs ${team.opponent} - $${team.price}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourSquad;

import React from "react";
import { Team, Squad } from "../types";

interface YourSquadProps {
  squad: Squad;
}

const YourSquad: React.FC<YourSquadProps> = ({ squad }) => {
  return (
    <div>
      <h2>Your Squad: {squad.name}</h2>
      <div>Remaining Salary Cap: ${squad.salaryCap}</div>
      <h3>Players</h3>
      <ul>
        {squad.players.map((playerName, index) => (
          <li key={index}>{playerName}</li>
        ))}
      </ul>
      <h3>Teams</h3>
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

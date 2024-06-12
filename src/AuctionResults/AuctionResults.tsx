import React from "react";
import { Squad, Team } from "../types";
import "./AuctionResults.css";

interface AuctionResultsProps {
  squads: Squad[];
}

const AuctionResults: React.FC<AuctionResultsProps> = ({ squads }) => {
  return (
    <div className="auction-results">
      {squads.map((squad, index) => (
        <div key={index} className="squad">
          <h2>{squad.name}</h2>
          <h3>Players:</h3>
          <ul>
            {squad.players.map((player, playerIndex) => (
              <li key={playerIndex}>{player}</li>
            ))}
          </ul>
          <h3>Teams:</h3>
          <ul>
            {squad.teams.map((team: Team, teamIndex) => (
              <li key={teamIndex}>
                {`${team.seed} ${team.name} ${team.record} ${team.region} vs ${team.opponent} - $${team.price}`}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AuctionResults;

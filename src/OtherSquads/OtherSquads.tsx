import React, { useState } from "react";
import { Squad, Team } from "../types"; // Import Squad and Team types from your types file

interface OtherSquadsProps {
  squads: Squad[];
}

const OtherSquads: React.FC<OtherSquadsProps> = ({ squads }) => {
  const [currentSquadIndex, setCurrentSquadIndex] = useState<number>(0);

  const handlePreviousSquad = () => {
    setCurrentSquadIndex((prevIndex) => (prevIndex === 0 ? squads.length - 1 : prevIndex - 1));
  };

  const handleNextSquad = () => {
    setCurrentSquadIndex((prevIndex) => (prevIndex === squads.length - 1 ? 0 : prevIndex + 1));
  };

  const currentSquad = squads[currentSquadIndex];

  return (
    <div>
      <h2>Other Squads</h2>
      <div>
        <h3>
            <button onClick={handlePreviousSquad}>&#8592;</button>
            {currentSquad.name}
            <button onClick={handleNextSquad}>&#8594;</button>
        </h3>
      </div>
      <div>Remaining Salary: {currentSquad.salaryCap}</div>
      <div>
        <h3>Players</h3>
        <ul>
          {currentSquad.players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Teams</h3>
        <ul>
          {currentSquad.teams.map((team: Team, index: number) => (
            <li key={index}>
              {team.seed} {team.name} - {team.region}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OtherSquads;

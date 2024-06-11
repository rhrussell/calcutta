import React, { useEffect, useState } from "react";
import { Squad, Team } from "../types";

interface OtherSquadsProps {
  squads: Squad[];
  yourSquad: Squad;
}

const OtherSquads: React.FC<OtherSquadsProps> = ({ squads, yourSquad }) => {
  const [currentSquadIndex, setCurrentSquadIndex] = useState<number>(0);
  const [updatedSquads, setUpdatedSquads] = useState<Squad[]>(squads);

  const removeYourSquad = (yourSquad: Squad) => {
    const filterSquads = updatedSquads.filter(
      (squad) => squad.name !== yourSquad.name,
    );
    setUpdatedSquads(filterSquads);
  };

  const handlePreviousSquad = () => {
    setCurrentSquadIndex((prevIndex) =>
      prevIndex === 0 ? updatedSquads.length - 1 : prevIndex - 1,
    );
  };

  const handleNextSquad = () => {
    setCurrentSquadIndex((prevIndex) =>
      prevIndex === updatedSquads.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const currentSquad = updatedSquads[currentSquadIndex];

  useEffect(() => {
    removeYourSquad(yourSquad);
  }, []);

  return (
    <div>
      <h2>Other Squads</h2>
      <div>
        <h3>
          {updatedSquads.length > 1 && (
            <button onClick={handlePreviousSquad}>&#8592;</button>
          )}
          {currentSquad.name}
          {updatedSquads.length > 1 && (
            <button onClick={handleNextSquad}>&#8594;</button>
          )}
        </h3>
      </div>
      <div>Remaining Salary: ${currentSquad.salaryCap}</div>
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
              {`${team.seed} ${team.name} ${team.record} ${team.region} vs ${team.opponent} - $${team.price}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OtherSquads;

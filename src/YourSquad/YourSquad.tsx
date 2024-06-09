import React from "react";

interface Team {
  seed: string;
  name: string;
  record: string;
  region: string;
  opponent?: string;
  price?: number;
}

interface YourSquadProps {
  squadTeams: Team[];
  squadSalaryCap: number;
}

const YourSquad: React.FC<YourSquadProps> = ({
  squadTeams,
  squadSalaryCap,
}) => {
  return (
    <div>
      <h3>Your Squad</h3>
      <div>Remaining Salary Cap: ${squadSalaryCap}</div>
      <ul>
        {squadTeams.map((team, index) => (
          <li key={index}>
            {`${team.seed} ${team.name} ${team.record} ${team.region} vs ${team.opponent} - $${team.price}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourSquad;

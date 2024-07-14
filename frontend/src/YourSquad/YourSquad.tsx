// Importing necessary parts from React
import React from "react";
// Importing types from another file
import { Squad } from "../types";

// Defining the types for the properties that the YourSquad component will receive
interface YourSquadProps {
  squad: Squad; // The squad object that contains information about the squad
}

// The main YourSquad component
const YourSquad: React.FC<YourSquadProps> = ({ squad }) => {
  return (
    <div>
      {/* Display the name of the squad */}
      <h2>Your Squad: {squad.name}</h2>
      {/* Display the remaining salary cap for the squad */}
      <div>Remaining Salary Cap: ${squad.salaryCap}</div>
      {/* Header for the list of players */}
      <h3>Players</h3>
      {/* List of player names in the squad */}
      <ul>
        {squad.players.map((playerName, index) => (
          // Display each player's name in a list item
          <li key={index}>{playerName}</li>
        ))}
      </ul>
      {/* Header for the list of teams */}
      <h3>Teams</h3>
      {/* List of teams in the squad */}
      <ul>
        {squad.teams.map((team, index) => (
          // Display each team's details in a list item
          <li key={index}>
            {`${team.seed} ${team.name} ${team.record} ${team.region} vs ${team.opponent} - $${team.price}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

// This exports the YourSquad component so it can be used in other parts of the application.
// This component will display the details of the user's squad, including player names and team details.
// The component receives a squad object as a prop and uses that to display the squad information.
// The component is used in the App component to display the user's squad details.
// The component is also used in the OtherSquads component to display the details of other squads.
// The component is also used in the AuctionResults component to display the details of all squads.
export default YourSquad;

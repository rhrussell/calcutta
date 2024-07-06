// Importing necessary parts from React
import React from "react";
// Importing the Squad and Team types from another file
import { Squad, Team } from "../types";
// Importing the CSS file for this component
import "./AuctionResults.css";

// Defining the types for the properties that the AuctionResults component will receive
interface AuctionResultsProps {
  // Array of squads
  squads: Squad[];
}

// The main AuctionResults component
const AuctionResults: React.FC<AuctionResultsProps> = ({ squads }) => {
  return (
    <div className="auction-results">
      {/* Loop through each squad in the squads array */}
      {squads.map((squad, index) => (
        // Each squad is displayed in a separate div
        <div key={index} className="squad">
          {/* Display the name of the squad */}
          <h2>{squad.name}</h2>
          {/* Display a header for the players */}
          <h3>Players:</h3>
          {/* Unordered list to display the names of the players in the squad */}
          <ul>
            {squad.players.map((player, playerIndex) => (
              // Display each player's name in a list item
              <li key={playerIndex}>{player}</li>
            ))}
          </ul>
          {/* Display a header for the teams */}
          <h3>Teams:</h3>
          {/* Unordered list to display the details of the teams in the squad */}
          <ul>
            {squad.teams.map((team: Team, teamIndex) => (
              // Display each team's details in a list item
              <li key={teamIndex}>
                {`${team.seed} ${team.name} ${team.record} - $${team.price}`}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// This exports the AuctionResults component so it can be used in other parts of the application.
// This component will display the results of the auction.
// The component receives an array of squads as a prop.
// The component displays the name of each squad.
// The component displays the players and teams in each squad.
// The component displays the details of each team in a squad.
// The component displays the seed, name, record, region, opponent, and price of each team.
export default AuctionResults;

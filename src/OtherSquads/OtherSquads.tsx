// Importing necessary parts from React
import React, { useEffect, useState } from "react";
// Importing types from another file
import { Squad, Team } from "../types";

// Defining the types for the properties that the OtherSquads component will receive
interface OtherSquadsProps {
  squads: Squad[]; // Array of all squads
  yourSquad: Squad; // Your own squad
}

// The main OtherSquads component
const OtherSquads: React.FC<OtherSquadsProps> = ({ squads, yourSquad }) => {
  // State to track the current squad being viewed
  const [currentSquadIndex, setCurrentSquadIndex] = useState<number>(0);
  // State to hold the updated list of squads after removing your own squad
  const [updatedSquads, setUpdatedSquads] = useState<Squad[]>(squads);

  // Function to remove your own squad from the list of squads
  // This function is called when the component loads
  // It filters out your squad from the list of squads and updates the state with the new list of squads without your squad
  const removeYourSquad = (yourSquad: Squad) => {
    const filterSquads = updatedSquads.filter(
      (squad) => squad.name !== yourSquad.name,
    );
    setUpdatedSquads(filterSquads);
  };

  // Function to go to the previous squad in the list
  // This function updates the current squad index to the previous squad in the list of squads
  // If the current squad is the first squad, it loops back to the last squad in the list
  // This function is called when the user clicks the previous squad button
  const handlePreviousSquad = () => {
    setCurrentSquadIndex((prevIndex) =>
      prevIndex === 0 ? updatedSquads.length - 1 : prevIndex - 1,
    );
  };

  // Function to go to the next squad in the list
  // This function updates the current squad index to the next squad in the list of squads
  // If the current squad is the last squad, it loops back to the first squad in the list
  // This function is called when the user clicks the next squad button
  const handleNextSquad = () => {
    setCurrentSquadIndex((prevIndex) =>
      prevIndex === updatedSquads.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Get the current squad being viewed
  // This is based on the current squad index in the list of squads
  // This is used to display the details of the current squad
  // This is called whenever the current squad index or the list of squads changes
  const currentSquad = updatedSquads[currentSquadIndex];

  // useEffect hook to remove your squad from the list when the component loads
  useEffect(() => {
    removeYourSquad(yourSquad);
  }, []);

  return (
    <div>
      <h2>Other Squads</h2>
      <div>
        <h3>
          {/* Display the previous squad button only if there is more than one squad */}
          {updatedSquads.length > 1 && (
            <button onClick={handlePreviousSquad}>&#8592;</button>
          )}
          {/* Display the name of the current squad */}
          {currentSquad.name}
          {/* Display the next squad button only if there is more than one squad */}
          {updatedSquads.length > 1 && (
            <button onClick={handleNextSquad}>&#8594;</button>
          )}
        </h3>
      </div>
      {/* Display the remaining salary for the current squad */}
      <div>Remaining Salary: ${currentSquad.salaryCap}</div>
      <div>
        {/* Header for the list of players */}
        <h3>Players</h3>
        {/* List of player names in the current squad */}
        <ul>
          {currentSquad.players.map((player, index) => (
            // Display each player's name in a list item
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
      <div>
        {/* Header for the list of teams */}
        <h3>Teams</h3>
        {/* List of teams in the current squad */}
        <ul>
          {currentSquad.teams.map((team: Team, index: number) => (
            // Display each team's details in a list item
            // The details include seed, name, record, region, opponent, and price
            // The details are displayed in a formatted string
            // The details are displayed in a list item
            // The list item has a unique key based on the index
            // The list item is displayed in an unordered list
            <li key={index}>
              {`${team.seed} ${team.name} ${team.record} ${team.region} vs ${team.opponent} - $${team.price}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// This exports the OtherSquads component so it can be used in other parts of the application.
// This component will display the details of other squads in the auction, excluding the user's own squad.
// The component receives an array of all squads and the user's own squad as props.
// The component allows the user to view the details of other squads one by one.
// The component includes buttons to navigate between squads.
export default OtherSquads;

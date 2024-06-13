// This file defines a React component named SquadsForm which manages the creation and randomization of player squads.
// The component receives the salary cap as a prop and uses a context to get the number of players and players per squad.
// It maintains state for player names, player list, squads, and whether to show the squads or input form.
// The component provides input fields for player names and buttons to add players and submit the form.
// It also displays the list of players entered by the user and allows randomization of squads.
// The component renders the squads once they are randomized and provides buttons to randomize again or submit the squads.
// The SquadsForm component is used to create and randomize squads for an auction-based game.

import React, { useState } from "react"; // Importing React and useState hook.
import { useNumberOfPlayers } from "../NumberOfPlayersContext"; // Importing a custom hook to get the number of players context.
import { Squad } from "../types"; // Importing the Squad type to ensure consistent squad object structure.

// Props interface to define what props the SquadsForm component expects.
// The onSubmit function is a callback that takes an array of squads as an argument.
// This interface helps define the type of props that the SquadsForm component expects.
interface SquadsFormProps {
  onSubmit: (squads: Squad[]) => void; // Function to handle form submission.
  salaryCap: number; // Number representing the salary cap for each squad.
}

// Creating a context for the number of players.
// This context will be used to share the number of players and players per squad across components.
// The context provides a way to pass data through the component tree without having to pass props down manually at every level.
// The context is used to set and get the number of players and players per squad globally.
const NumberOfPlayersContext = React.createContext({});

// Defining the SquadsForm component.
const SquadsForm: React.FC<SquadsFormProps> = ({ onSubmit, salaryCap }) => {
  const { numPlayers, numPlayersPerSquad } = useNumberOfPlayers(); // Getting the number of players and players per squad from context.
  const [players, setPlayers] = useState<{ name: string }[]>([]); // State to keep track of the list of players.
  const [playerName, setPlayerName] = useState(""); // State to keep track of the current player name input.
  const [squads, setSquads] = useState<Squad[]>([]); // State to keep track of the squads.
  const [showSquads, setShowSquads] = useState(false); // State to manage whether to show squads or input form.
  const isMaxPlayersReached = players.length >= numPlayers; // Boolean to check if the maximum number of players has been reached.

  // Function to handle adding a new player to the list.
  // This function is called when the "Add Player" button is clicked.
  const handleAddPlayer = () => {
    const newPlayer = {
      name: playerName, // Creating a new player object with the current player name.
    };
    setPlayers([...players, newPlayer]); // Adding the new player to the players state.
    setPlayerName(""); // Resetting the player name input field.
  };

  // Boolean to check if the player name input is empty.
  // This is used to disable the "Add Player" button when the input is empty.
  // The trim() method removes whitespace from both ends of a string.
  // If the trimmed player name is an empty string, the input is considered empty.
  // This is used to prevent adding empty player names to the list.
  const isPlayerNameEmpty = playerName.trim() === "";

  // Function to randomize and assign players to squads.
  const randomizeSquads = () => {
    const newSquads: Squad[] = [];
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5); // Shuffling players randomly.
    const numberOfSquads = Math.ceil(numPlayers / numPlayersPerSquad); // Calculating the number of squads needed.

    // Initializing each squad with an empty list of players and teams, and setting the salary cap.
    // The name of each squad is set as "Squad 1", "Squad 2", etc.
    // The salary cap for each squad is set to the value provided as a prop.
    // This loop creates the required number of squads based on the number of players and players per squad.
    // The squads are initialized with the appropriate name, salary cap, and empty lists for players and teams.
    for (let i = 0; i < numberOfSquads; i++) {
      newSquads.push({
        name: `Squad ${i + 1}`,
        players: [],
        teams: [],
        salaryCap: salaryCap,
      });
    }

    // Distributing players among the squads.
    shuffledPlayers.forEach((player, index) => {
      const squadIndex = index % numberOfSquads; // Ensuring players are evenly distributed.
      newSquads[squadIndex].players.push(player.name); // Adding the player to the appropriate squad.
    });

    setSquads(newSquads); // Updating the squads state with the new squads.
  };

  // Function to handle form submission.
  // This function is called when the "Submit" button is clicked after the maximum number of players is reached.
  const handleSubmit = () => {
    console.log(players); // Logging the list of players (for debugging purposes).
    randomizeSquads(); // Randomizing the squads.
    setShowSquads(true); // Setting the state to show the squads.
  };

  // If squads are to be shown, render the squads.
  // This block of code renders the squads once they are randomized.
  // It displays the name of each squad and the list of players in each squad.
  // It also provides buttons to randomize squads again or submit the squads.
  // The onSubmit function is called when the "Submit" button is clicked.
  // The squads state is passed as an argument to the onSubmit function.
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

  // Otherwise, render the form to input player names.
  // This block of code renders the input form to add player names.
  // It provides an input field for the player name and buttons to add players and submit the form.
  // The form is displayed until the maximum number of players is reached.
  // Once the maximum number of players is reached, the form is replaced with the squads.
  return (
    <div>
      {!showSquads ? (
        <div>
          <h1>Input Players</h1>
          <input
            type="text"
            placeholder="Name" // Placeholder text for the input field.
            value={playerName} // Value of the input field bound to the playerName state.
            onChange={(e) => setPlayerName(e.target.value)} // Updating the playerName state on input change.
          />
          <br />
          <button
            onClick={handleAddPlayer} // Adding a player on button click.
            disabled={isMaxPlayersReached || isPlayerNameEmpty} // Disabling the button if max players are reached or input is empty.
          >
            Add Player
          </button>{" "}
          <button onClick={handleSubmit} disabled={!isMaxPlayersReached}>
            {" "}
            // Submitting the form on button click if max players are reached.
            Submit
          </button>
          {players.length > 0 && (
            <>
              <h2>Player List</h2>
              <ul>
                {players.map((player: { name: string }, index: number) => (
                  <li key={index}>{player.name}</li> // Rendering each player's name.
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

// This exports the SquadsForm component so it can be used in other parts of the application.
// The component manages the creation and randomization of player squads.
// It receives the salary cap as a prop and uses a context to get the number of players and players per squad.
// The component maintains state for player names, player list, squads, and whether to show the squads or input form.
// The component provides input fields for player names and buttons to add players and submit the form.
// It also displays the list of players entered by the user and allows randomization of squads.
// The component renders the squads once they are randomized and provides buttons to randomize again or submit the squads.
export default SquadsForm;

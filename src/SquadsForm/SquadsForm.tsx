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
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
} from "@mui/material"; // Importing Material-UI components for the form.
import EditIcon from "@mui/icons-material/Edit"; // Importing Material-UI icons for the form.
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [error, setError] = useState(""); // State to manage error messages.
  const [editingPlayer, setEditingPlayer] = useState<number | null>(null); // State to manage editing player index.
  const isMaxPlayersReached = players.length >= numPlayers; // Boolean to check if the maximum number of players has been reached.

  // Function to validate the player name input.
  // This function is called when the player name input changes.
  // It checks if the player name contains only letters and sets an error message if it doesn't.
  // The error message is displayed to the user if the player name contains characters other than letters.
  // The function returns true if the player name is valid and false if it is not.
  // This is used to prevent adding player names with invalid characters to the list.
  const validatePlayerName = (name: string) => {
    // Checking if the player name contains only letters.
    // The test() method tests for a match in a string and returns true if the pattern is found, and false otherwise.
    // The regular expression /[a-zA-Z]/ matches any letter from a to z (uppercase and lowercase).
    // If the player name contains only letters, the test() method returns true.
    if (!/[a-zA-Z]/.test(name)) {
      setError("A Player's Name needs to have letters in it");
      return false;
    }
    setError("");
    return true;
  };

  // Function to handle adding a new player to the list.
  // This function is called when the "Add Player" button is clicked.
  const handleAddPlayer = () => {
    // Checking if the player name is valid before adding it to the list.
    if (validatePlayerName(playerName)) {
      const newPlayer = {
        name: playerName, // Creating a new player object with the current player name.
      };
      setPlayers([...players, newPlayer]); // Adding the new player to the players state.
      setPlayerName(""); // Resetting the player name input field.
    }
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
    if (players.length === numPlayers) {
      console.log(players); // Logging the list of players (for debugging purposes).
      randomizeSquads(); // Randomizing the squads.
      setShowSquads(true); // Setting the state to show the squads.
    } else {
      setError(`You need to add exactly ${numPlayers} players.`); // Setting an error message if the number of players is incorrect.
    }
  };

  // Function to handle editing a player.
  // This function is called when the "Edit" button is clicked next to a player.
  // It sets the player name input field to the name of the player being edited.
  // The player name is updated when the user changes the input field.
  // The player name is saved when the "Save" button is clicked.
  // The editingPlayer state is used to keep track of the index of the player being edited.
  // The editingPlayer state is set to null when the player name is saved.
  const handleEditPlayer = (index: number) => {
    setEditingPlayer(index); // Setting the editing player index.
    setPlayerName(players[index].name); // Setting the player name to be edited.
  };

  // Function to handle saving the edited player name.
  // This function is called when the "Save" button is clicked after editing a player name.
  // It updates the player name in the players list with the new name.
  // The player name input field is reset after saving the edited name.
  // The editingPlayer state is reset to null after saving the edited name.
  const handleSavePlayer = () => {
    if (validatePlayerName(playerName) && editingPlayer !== null) {
      const updatedPlayers = [...players]; // Creating a copy of the players array.
      updatedPlayers[editingPlayer].name = playerName; // Updating the player name.
      setPlayers(updatedPlayers); // Updating the players state with the edited player name.
      setPlayerName(""); // Resetting the player name input field.
      setEditingPlayer(null); // Resetting the editing player index.
    }
  };

  // Function to handle deleting a player.
  // This function is called when the "Delete" button is clicked next to a player.
  // It removes the player from the list of players based on the index.
  const handleDeletePlayer = (index: number) => {
    const updatedPlayers = players.filter((_, i) => i !== index); // Filtering out the player to be deleted.
    setPlayers(updatedPlayers); // Updating the players state with the filtered list.
  };

  // If squads are to be shown, render the squads.
  // This block of code renders the squads once they are randomized.
  // It displays the name of each squad and the list of players in each squad.
  // It also provides buttons to randomize squads again or submit the squads.
  // The onSubmit function is called when the "Submit" button is clicked.
  // The squads state is passed as an argument to the onSubmit function.
  if (showSquads) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Squads
        </Typography>
        {squads.map((squad) => (
          <Box key={squad.name} mb={2}>
            <Typography variant="h5">{squad.name}</Typography>
            <List>
              {squad.players.map((playerName, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={playerName}
                    primaryTypographyProps={{ align: "center" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
        <Button
          variant="contained"
          onClick={randomizeSquads}
          style={{ marginRight: "8px" }}
        >
          Randomize Squads
        </Button>
        <Button variant="contained" onClick={() => onSubmit(squads)}>
          Submit
        </Button>
      </Box>
    );
  }

  // Otherwise, render the form to input player names.
  // This block of code renders the input form to add player names.
  // It provides an input field for the player name and buttons to add players and submit the form.
  // The form is displayed until the maximum number of players is reached.
  // Once the maximum number of players is reached, the form is replaced with the squads.
  return (
    <Box>
      {!showSquads ? (
        <Box>
          <Typography variant="h4" gutterBottom>
            Input Players
          </Typography>
          <TextField
            label="Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            margin="normal"
            variant="filled"
            required
            disabled={isMaxPlayersReached}
            error={!!error}
            helperText={error}
          />
          <Box mb={2}>
            {editingPlayer !== null ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSavePlayer}
                style={{ marginRight: "8px" }}
                disabled={isPlayerNameEmpty}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPlayer}
                disabled={isMaxPlayersReached || isPlayerNameEmpty}
                style={{ marginRight: "8px" }}
              >
                Add Player
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={!isMaxPlayersReached}
            >
              Submit
            </Button>
          </Box>
          {players.length > 0 && (
            <>
              <Typography variant="h5">Player List</Typography>
              <List>
                {players.map((player, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={player.name}
                      primaryTypographyProps={{ align: "center" }}
                    />
                    <IconButton onClick={() => handleEditPlayer(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePlayer(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" gutterBottom>
            Squads
          </Typography>
          {squads.map((squad) => (
            <Box key={squad.name} mb={2}>
              <Typography variant="h5">{squad.name}</Typography>
              <List>
                {squad.players.map((playerName, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={playerName}
                      primaryTypographyProps={{ align: "center" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
          <Button
            variant="contained"
            onClick={randomizeSquads}
            style={{ marginRight: "8px" }}
          >
            Randomize Squads
          </Button>
          <Button variant="contained" onClick={() => onSubmit(squads)}>
            Submit
          </Button>
        </Box>
      )}
    </Box>
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

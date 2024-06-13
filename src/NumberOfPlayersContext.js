// This file creates a context for managing the number of players and the number of players per squad in a React application.
// It exports a provider component that wraps around parts of the app that need access to the number of players context.
// It also exports a custom hook to easily access the context values in other components.
// The context stores the number of players and the number of players per squad, and provides functions to update these values.
import React, { createContext, useState, useContext } from "react"; // Importing necessary functions and hooks from React.

// Creating a context to hold the number of players information.
const NumberOfPlayersContext = createContext();

// Defining a provider component that will wrap around parts of the app that need access to the number of players context.
// This component will provide the context values and functions to its children components.
// The provider component takes in the children components as props.
export const NumberOfPlayersProvider = ({ children }) => {
  const [numPlayers, setNumPlayers] = useState(0); // State to keep track of the total number of players.
  const [numPlayersPerSquad, setNumPlayersPerSquad] = useState(0); // State to keep track of the number of players per squad.

  // The provider component that supplies the context values to its children.
  // It provides the number of players, number of players per squad, and functions to update these values.
  // The context value is an object with the number of players, number of players per squad, and the functions to update these values.
  // The children components can access these values and functions using the NumberOfPlayersContext.
  // The children components are rendered inside the provider component.
  return (
    <NumberOfPlayersContext.Provider
      value={{
        numPlayers, // Current number of players.
        numPlayersPerSquad, // Current number of players per squad.
        setNumPlayers, // Function to update the number of players.
        setNumPlayersPerSquad, // Function to update the number of players per squad.
      }}
    >
      {children}{" "}
      {/* Rendering any children components that need access to this context */}
    </NumberOfPlayersContext.Provider>
  );
};

// Custom hook to easily access the NumberOfPlayersContext in other components.
export const useNumberOfPlayers = () => {
  return useContext(NumberOfPlayersContext); // Returning the context value.
};

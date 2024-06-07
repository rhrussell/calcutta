import React, { createContext, useState, useContext } from 'react';

const NumberOfPlayersContext = createContext();

export const NumberOfPlayersProvider = ({ children }) => {
  const [numPlayers, setNumPlayers] = useState(0);
  const [numPlayersPerSquad, setNumPlayersPerSquad] = useState(0);

  return (
    <NumberOfPlayersContext.Provider value={{ numPlayers, numPlayersPerSquad, setNumPlayers, setNumPlayersPerSquad }}>
      {children}
    </NumberOfPlayersContext.Provider>
  );
};

export const useNumberOfPlayers = () => {
  return useContext(NumberOfPlayersContext);
};

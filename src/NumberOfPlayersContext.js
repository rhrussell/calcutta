import React, { createContext, useState, useContext } from 'react';

const NumberOfPlayersContext = createContext();

export const NumberOfPlayersProvider = ({ children }) => {
  const [numPlayers, setNumPlayers] = useState(0);
  const [numPlayersPerTeam, setNumPlayersPerTeam] = useState(0);

  return (
    <NumberOfPlayersContext.Provider value={{ numPlayers, numPlayersPerTeam, setNumPlayers, setNumPlayersPerTeam }}>
      {children}
    </NumberOfPlayersContext.Provider>
  );
};

export const useNumberOfPlayers = () => {
  return useContext(NumberOfPlayersContext);
};

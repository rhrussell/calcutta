import React, { createContext, useState, useContext } from 'react';

const NumberOfPlayersContext = createContext();

export const NumberOfPlayersProvider = ({ children }) => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  return (
    <NumberOfPlayersContext.Provider value={{ numberOfPlayers, setNumberOfPlayers }}>
      {children}
    </NumberOfPlayersContext.Provider>
  );
};

export const useNumberOfPlayers = () => {
  return useContext(NumberOfPlayersContext);
};

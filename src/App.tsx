import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { NumberOfPlayersProvider } from './NumberOfPlayersContext';
import LeagueForm from './league-form/league-form';
import SquadsForm from './squads-form/squads-form';
import TournamentBracket from './tournament-bracket/tournament-bracket';

function App() {
  const [showSquadsForm, setShowSquadsForm] = useState(false);
  const [showTournamentBracket, setShowTournamentBracket] = useState(false);

  const handleLeagueFormSubmit = () => {
    setShowSquadsForm(true);
  };

  const handleSquadsFormSubmit = () => {
    setShowSquadsForm(false);
    setShowTournamentBracket(true);
  };

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <NumberOfPlayersProvider>
      <div className="App">
        {!showSquadsForm && (
          <div>
            <h1>Add League</h1>
            <LeagueForm onSubmit={handleLeagueFormSubmit} />
          </div>
        )}

        {showSquadsForm && (
          <div>
            <SquadsForm onSubmit={handleSquadsFormSubmit}/>
          </div>
        )}

        {showTournamentBracket && !showSquadsForm && (
          <div>
            <TournamentBracket />
          </div>
        )}
      </div>
    </NumberOfPlayersProvider>
  );
}

export default App;

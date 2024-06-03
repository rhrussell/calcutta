import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { NumberOfPlayersProvider } from './NumberOfPlayersContext';
import LeagueForm from './league-form/league-form';
import TeamsForm from './teams-form/teams-form';

function App() {
  const [showTeamsForm, setShowTeamsForm] = useState(false);

  const handleLeagueFormSubmit = () => {
    setShowTeamsForm(true);
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
        {!showTeamsForm && (
          <div>
            <h1>Add League</h1>
            <LeagueForm onSubmit={handleLeagueFormSubmit} />
          </div>
        )}

        {showTeamsForm && (
          <div>
            <TeamsForm />
          </div>
        )}
      </div>
    </NumberOfPlayersProvider>
  );
}

export default App;

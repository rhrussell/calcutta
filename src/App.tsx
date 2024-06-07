import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { NumberOfPlayersProvider } from './NumberOfPlayersContext';
import LeagueForm from './league-form/league-form';
import SquadsForm from './squads-form/squads-form';
import TournamentBracket from './tournament-bracket/tournament-bracket';
import Timer from './timer/timer';

function App() {
  const [showSquadsForm, setShowSquadsForm] = useState(false);
  const [showTournamentBracket, setShowTournamentBracket] = useState(false);
  const [minutesPerItem, setMinutesPerItem] = useState<number>(0);

  const handleLeagueFormSubmit = (minutes: number) => {
    setMinutesPerItem(minutes);
    setShowSquadsForm(true);
  };

  const handleSquadsFormSubmit = () => {
    setShowSquadsForm(false);
    setShowTournamentBracket(true);
  };

  return (
    <NumberOfPlayersProvider>
      <div className="App">
        {(!showSquadsForm && !showTournamentBracket) && (
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

        {(showTournamentBracket && !showSquadsForm) && (
          <div>
            <TournamentBracket />
            <br></br>
            <Timer minutesPerItem={minutesPerItem} />
          </div>
        )}
      </div>
    </NumberOfPlayersProvider>
  );
}

export default App;

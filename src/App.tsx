import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { NumberOfPlayersProvider } from './NumberOfPlayersContext';
import LeagueForm from './league-form/league-form';
import SquadsForm from './squads-form/squads-form';
import TournamentBracket from './tournament-bracket/tournament-bracket';
import Timer from './timer/timer';
import AuctionTeam from './auction-team/auction-team';

const allMatchups = [
  {
    top: { seed: '1', name: 'UConn', record: '(31-3)', region: 'East'},
    bottom: { seed: '16', name: 'Stetson', record: '(22-12)', region: 'East'},
    position: 1,
  }, 
  {
    top: { seed: '8', name: 'Florida Atlantic', record: '(25-8)', region: 'East'},
    bottom: { seed: '9', name: 'Northwestern', record: '(21-11)', region: 'East'},
    position: 2,
  }, 
  {
    top: { seed: '5', name: 'San Diego', record: '(24-10)', region: 'East'},
    bottom: { seed: '12', name: 'UAB', record: '(23-11)', region: 'East'},
    position: 3,
  }, 
  {
    top: { seed: '4', name: 'Auburn', record: '(27-7)', region: 'East'},
    bottom: { seed: '13', name: 'Yale', record: '(22-9)', region: 'East'},
    position: 4,
  }, 
  {
    top: { seed: '6', name: 'BYU', record: '(23-10)', region: 'East'},
    bottom: { seed: '11', name: 'Duquesne', record: '(24-11)', region: 'East'},
    position: 5,
  }, 
  {
    top: { seed: '3', name: 'Illinois', record: '(26-8)', region: 'East'},
    bottom: { seed: '14', name: 'Morehead St.', record: '(26-8)', region: 'East'},
    position: 6,
  }, 
  {
    top: { seed: '7', name: 'Washington St.', record: '(24-9)', region: 'East'},
    bottom: { seed: '10', name: 'Drake', record: '(28-6)', region: 'East'},
    position: 7,
  }, 
  {
    top: { seed: '2', name: 'Iowa St.', record: '(27-7)', region: 'East'},
    bottom: { seed: '15', name: 'S. Dakota St.', record: '(22-12)', region: 'East'},
    position: 8,
  }, 
  {
    top: { seed: '1', name: 'North Carolina', record: '(27-7)', region: 'West'},
    bottom: { seed: '', name: '', record: '', region: ""},
    position: 9,
  }, 
  {
    top: { seed: '8', name: 'Mississippi St.', record: '(21-13)', region: 'West'},
    bottom: { seed: '9', name: 'Michigan St.', record: '(19-14)', region: 'West'},
    position: 10,
  }, 
  {
    top: { seed: '5', name: 'Saint Mary\'s', record: '(26-7)', region: 'West'},
    bottom: { seed: '12', name: 'Grand Canyon', record: '(29-4)', region: 'West'},
    position: 11,
  },
  {
    top: { seed: '4', name: 'Alabama', record: '(21-11)', region: 'West'},
    bottom: { seed: '13', name: 'Charleston', record: '(27-7)', region: 'West'},
    position: 12,
  },
  {
    top: { seed: '6', name: 'Clemson', record: '(21-11)', region: 'West'},
    bottom: { seed: '11', name: 'New Mexico', record: '(26-9)', region: 'West'},
    position: 13,
  },
  {
    top: { seed: '3', name: 'Baylor', record: '(23-10)', region: 'West'},
    bottom: { seed: '14', name: 'Colgate', record: '(25-9)', region: 'West'},
    position: 14,
  },
  {
    top: { seed: '7', name: 'Dayton', record: '(24-7)', region: 'West'},
    bottom: { seed: '10', name: 'Nevada', record: '(26-7)', region: 'West'},
    position: 15,
  },
  {
    top: { seed: '2', name: 'Arizona', record: '(25-8)', region: 'West'},
    bottom: { seed: '15', name: 'Long Beach St.', record: '(21-14)', region: 'West'},
    position: 16,
  },
  {
    top: { seed: '1', name: 'Houston', record: '(30-4)', region: 'South'},
    bottom: { seed: '16', name: 'Longwood', record: '(21-13)', region: 'South'},
    position: 17,
  },
  {
    top: { seed: '8', name: 'Nebraska', record: '(23-10)', region: 'South'},
    bottom: { seed: '9', name: 'Texas A&M', record: '(20-14)', region: 'South'},
    position: 18,
  },
  {
    top: { seed: '5', name: 'Wisconsin', record: '(22-13)', region: 'South'},
    bottom: { seed: '12', name: 'James Madison', record: '(31-3)', region: 'South'},
    position: 19,
  },
  {
    top: { seed: '4', name: 'Duke', record: '(24-8)', region: 'South'},
    bottom: { seed: '13', name: 'Vermont', record: '(28-6)', region: 'South'},
    position: 20,
  },
  {
    top: { seed: '6', name: 'Texas Tech', record: '(23-10)', region: 'South'},
    bottom: { seed: '11', name: 'NC State', record: '(22-14)', region: 'South'},
    position: 21,
  },
  {
    top: { seed: '3', name: 'Kentucky', record: '(23-9)', region: 'South'},
    bottom: { seed: '14', name: 'Oakland', record: '(23-11)', region: 'South'},
    position: 22,
  },
  {
    top: { seed: '7', name: 'Florida', record: '(24-11)', region: 'South'},
    bottom: { seed: '', name: '', record: '', region: ""},
    position: 23,
  },
  {
    top: { seed: '2', name: 'Marquette', record: '(25-9)', region: 'South'},
    bottom: { seed: '15', name: 'Western Ky.', record: '(22-11)', region: 'South'},
    position: 24,
  },
  {
    top: { seed: '1', name: 'Purdue', record: '(29-4)', region: 'Midwest'},
    bottom: { seed: '', name: '', record: '', region: ""},
    position: 25,
  },
  {
    top: { seed: '8', name: 'Utah St.', record: '(27-6)', region: 'Midwest'},
    bottom: { seed: '9', name: 'TCU', record: '(21-12)', region: 'Midwest'},
    position: 26,
  },
  {
    top: { seed: '5', name: 'Gonzaga', record: '(25-7)', region: 'Midwest'},
    bottom: { seed: '12', name: 'McNeese', record: '(30-3)', region: 'Midwest'},
    position: 27,
  },
  {
    top: { seed: '4', name: 'Kansas', record: '(22-10)', region: 'Midwest'},
    bottom: { seed: '13', name: 'Samford', record: '(29-5)', region: 'Midwest'},
    position: 28,
  },
  {
    top: { seed: '6', name: 'South Carolina', record: '(26-7)', region: 'Midwest'},
    bottom: { seed: '11', name: 'Oregon', record: '(23-11)', region: 'Midwest'},
    position: 29,
  },
  {
    top: { seed: '3', name: 'Creighton', record: '(23-9)', region: 'Midwest'},
    bottom: { seed: '14', name: 'Akron', record: '(24-10)', region: 'Midwest'},
    position: 30,
  },
  {
    top: { seed: '7', name: 'Texas', record: '(20-12)', region: 'Midwest'},
    bottom: { seed: '', name: '', record: '', region: ""},
    position: 31,
  },
  {
    top: { seed: '2', name: 'Tennessee', record: '(24-8)', region: 'Midwest'},
    bottom: { seed: '15', name: 'Saint Peter\'s', record: '(19-13)', region: 'Midwest'},
    position: 32,
  }
]

function App() {
  const [showSquadsForm, setShowSquadsForm] = useState(false);
  const [showTournamentBracket, setShowTournamentBracket] = useState(false);
  const [minutesPerItem, setMinutesPerItem] = useState<number>(0);
  const [changeTeamFlag, setChangeTeamFlag] = useState<boolean>(false);

  const handleLeagueFormSubmit = (minutes: number) => {
    setMinutesPerItem(minutes);
    setShowSquadsForm(true);
  };

  const handleSquadsFormSubmit = () => {
    setShowSquadsForm(false);
    setShowTournamentBracket(true);
  };

  const handleTimerEnd = () => {
    setChangeTeamFlag((prevFlag) => !prevFlag);
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
            <div style={{ display: 'flex', flexDirection: 'row', 'justifyContent': 'space-between' }}>
              <Timer minutesPerItem={minutesPerItem} onTimerEnd={handleTimerEnd} resetFlag={changeTeamFlag} />
              <AuctionTeam matchups={allMatchups} changeTeamFlag={changeTeamFlag} />
            </div>
          </div>
        )}
      </div>
    </NumberOfPlayersProvider>
  );
}

export default App;

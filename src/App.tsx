import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { NumberOfPlayersProvider } from "./NumberOfPlayersContext";
import LeagueForm from "./LeagueForm/LeagueForm";
import SquadsForm from "./SquadsForm/SquadsForm";
import TournamentBracket from "./TournamentBracket/TournamentBracket";
import Timer from "./Timer/Timer";
import AuctionTeam from "./AuctionTeam/AuctionTeam";
import BidPanel from "./BidPanel/BidPanel";
import YourSquad from "./YourSquad/YourSquad";
import { allMatchups } from "./allMatchups";

interface Team {
  seed: string;
  name: string;
  record: string;
  region: string;
  opponent?: string;
  price?: number;
}

export interface Matchup {
  top: Team;
  bottom: Team;
  position: number;
}

function App() {
  const [showSquadsForm, setShowSquadsForm] = useState<boolean>(false);
  const [showTournamentBracket, setShowTournamentBracket] =
    useState<boolean>(false);
  const [changeTeamFlag, setChangeTeamFlag] = useState<boolean>(false);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [showNextTeamButton, setShowNextTeamButton] = useState<boolean>(false);
  const [orderOfAuction, setOrderOfAuction] = useState<boolean>(false);
  const [minutesPerItem, setMinutesPerItem] = useState<number>(0);
  const [squadSalaryCap, setSquadSalaryCap] = useState<number>(0);
  const [squadTeams, setSquadTeams] = useState<Team[]>([]);

  const handleLeagueFormSubmit = (
    minutes: number,
    salary: number,
    order: boolean,
  ) => {
    setMinutesPerItem(minutes);
    setSquadSalaryCap(salary);
    setOrderOfAuction(order);
    setShowSquadsForm(true);
  };

  const handleSquadsFormSubmit = () => {
    setShowSquadsForm(false);
    setShowTournamentBracket(true);
  };

  const handleTimerEnd = () => {
    setTimerActive(false);
    setShowNextTeamButton(true); // Show the Next Team button when the timer ends
    setChangeTeamFlag(false); // Set change team flag to true to display the next team
  };

  const handleTimerPause = (isPaused: boolean) => {
    setTimerActive(!isPaused);
    setShowNextTeamButton(false); // Hide the Next Team button when the timer is paused
    setChangeTeamFlag(false); // Reset change team flag when the timer is paused
  };

  const handleNextTeamClick = () => {
    setShowNextTeamButton(false); // Hide the Next Team button when clicked
    setChangeTeamFlag(true); // Set change team flag to true to display the next team
  };

  const handleNextTeam = () => {
    setChangeTeamFlag(!changeTeamFlag);
    setShowNextTeamButton(false);
  };

  const handleTeamSold = (soldTeam: Team) => {
    console.log("Handle Team Sold");
    setSquadTeams([...squadTeams, soldTeam]); // Add the sold team to squadTeams
    setSquadSalaryCap((prevSalaryCap) => prevSalaryCap - (soldTeam.price || 0)); // Update squad's salary capacity
  };

  return (
    <NumberOfPlayersProvider>
      <div className="App">
        {!showSquadsForm && !showTournamentBracket && (
          <div>
            <h1>Add League</h1>
            <LeagueForm onSubmit={handleLeagueFormSubmit} />
          </div>
        )}

        {showSquadsForm && (
          <div>
            <SquadsForm onSubmit={handleSquadsFormSubmit} />
          </div>
        )}

        {showTournamentBracket && !showSquadsForm && (
          <div>
            <TournamentBracket />
            <br></br>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Timer
                minutesPerItem={minutesPerItem}
                onTimerEnd={handleTimerEnd}
                onTimerPause={handleTimerPause}
                resetFlag={changeTeamFlag}
              />
              {showNextTeamButton && !timerActive && allMatchups.length > 0 && (
                <button onClick={handleNextTeamClick}>Next Team</button>
              )}
              <AuctionTeam
                matchups={allMatchups}
                changeTeamFlag={changeTeamFlag}
                squadSalaryCap={squadSalaryCap}
                timerActive={timerActive}
                onTimerEnd={handleTimerEnd}
                onTeamSold={handleTeamSold}
                onNextTeam={handleNextTeam}
              />
            </div>
            <br></br>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <YourSquad
                squadTeams={squadTeams}
                squadSalaryCap={squadSalaryCap}
              />
            </div>
          </div>
        )}
      </div>
    </NumberOfPlayersProvider>
  );
}

export default App;

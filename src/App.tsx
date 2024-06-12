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
import OtherSquads from "./OtherSquads/OtherSquads";
import OrderOfAuction from "./OrderOfAuction/OrderOfAuction";
import AuctionResults from "./AuctionResults/AuctionResults";
import { allTeams } from "./allTeams";
import { Team, Squad } from "./types";

function App() {
  const [showSquadsForm, setShowSquadsForm] = useState<boolean>(false);
  const [showTournamentBracket, setShowTournamentBracket] =
    useState<boolean>(false);
  const [changeTeamFlag, setChangeTeamFlag] = useState<boolean>(false);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerEnded, setTimerEnded] = useState<boolean>(false);
  const [showNextTeamButton, setShowNextTeamButton] = useState<boolean>(false);
  const [orderOfAuction, setOrderOfAuction] = useState<boolean>(false);
  const [auctionComplete, setAuctionComplete] = useState<boolean>(false);
  const [showAuctionResults, setShowAuctionResults] = useState<boolean>(false);
  const [minutesPerItem, setMinutesPerItem] = useState<number>(0);
  const [squadSalaryCap, setSquadSalaryCap] = useState<number>(0);
  const [squads, setSquads] = useState<Squad[]>([]);
  const [soldTeam, setSoldTeam] = useState<Team | null>(null);
  const [upcomingTeams, setUpcomingTeams] = useState<Team[]>([]);

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

  const handleSquadsFormSubmit = (squads: Squad[]) => {
    setSquads(squads);
    setShowSquadsForm(false);
    setShowTournamentBracket(true);
  };

  const handleTimerEnd = () => {
    setTimerActive(false);
    setShowNextTeamButton(true); // Show the Next Team button when the timer ends
    setChangeTeamFlag(false); // Set change team flag to true to display the next team
    setTimerEnded(true); // Set timerEnded to true
  };

  const handleTimerPause = (isPaused: boolean) => {
    setTimerActive(!isPaused);
    setShowNextTeamButton(false); // Hide the Next Team button when the timer is paused
    setChangeTeamFlag(false); // Reset change team flag when the timer is paused
  };

  const handleNextTeamClick = () => {
    if (soldTeam) {
      const updatedSquads = squads.map((squad, index) => {
        if (index === 0) {
          // Assuming you want to add the team to the first squad
          return {
            ...squad,
            teams: [...squad.teams, soldTeam],
            salaryCap: squad.salaryCap - (soldTeam.price || 0),
          };
        }
        return squad;
      });
      setSquads(updatedSquads);
      setSquadSalaryCap(squads[0].salaryCap);
    }
    setShowNextTeamButton(false); // Hide the Next Team button when clicked
    setChangeTeamFlag(true); // Set change team flag to true to display the next team
    setTimerEnded(false); // Reset timerEnded when Next Team button is clicked
  };

  const handleNextTeam = () => {
    setChangeTeamFlag(!changeTeamFlag);
    setShowNextTeamButton(false);
  };

  const handleTeamSold = (soldTeam: Team) => {
    console.log("Handle Team Sold");
    setSoldTeam(soldTeam);
  };

  const updateUpcomingTeams = (teams: Team[]) => {
    setUpcomingTeams(teams);
  };

  const handleAuctionComplete = () => {
    setAuctionComplete(true);
  };

  return (
    <NumberOfPlayersProvider>
      <div className="App">
        {!showSquadsForm && !showTournamentBracket && !showAuctionResults && (
          <div>
            <h1>Add League</h1>
            <LeagueForm onSubmit={handleLeagueFormSubmit} />
          </div>
        )}

        {showSquadsForm && !showAuctionResults && (
          <div>
            <SquadsForm
              onSubmit={handleSquadsFormSubmit}
              salaryCap={squadSalaryCap}
            />
          </div>
        )}

        {showTournamentBracket && !showSquadsForm && !showAuctionResults && (
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
              {!auctionComplete && (
                <>
                  <div className="timer-container">
                    <Timer
                      minutesPerItem={minutesPerItem}
                      onTimerEnd={handleTimerEnd}
                      onTimerPause={handleTimerPause}
                      resetFlag={changeTeamFlag}
                    />
                  </div>
                  {showNextTeamButton &&
                    !timerActive &&
                    allTeams.length > 0 && (
                      <button onClick={handleNextTeamClick}>Next Team</button>
                    )}
                  <div>
                    <AuctionTeam
                      teams={allTeams}
                      changeTeamFlag={changeTeamFlag}
                      squadSalaryCap={squadSalaryCap}
                      timerActive={timerActive}
                      onTeamSold={handleTeamSold}
                      onNextTeam={handleNextTeam}
                      timerEnded={timerEnded}
                      updateUpcomingTeams={updateUpcomingTeams}
                      onAuctionComplete={handleAuctionComplete}
                    />
                  </div>
                  <div></div>
                </>
              )}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {!auctionComplete && squads.length > 0 && (
                <YourSquad squad={squads[0]} />
              )}
              {!auctionComplete && orderOfAuction && (
                <OrderOfAuction upcomingTeams={upcomingTeams} />
              )}
              {!auctionComplete && squads.length > 1 && (
                <OtherSquads squads={squads} yourSquad={squads[0]} />
              )}
              {!auctionComplete && squads.length === 1 && (
                <div>
                  <h2>No Other Squads</h2>
                </div>
              )}
            </div>
            {auctionComplete && !showAuctionResults && (
              <button
                onClick={() => {
                  setShowAuctionResults(true);
                  setShowTournamentBracket(false);
                }}
              >
                Finalize Results
              </button>
            )}
            <br></br>
          </div>
        )}
        {showAuctionResults && <AuctionResults squads={squads} />}
      </div>
    </NumberOfPlayersProvider>
  );
}

export default App;

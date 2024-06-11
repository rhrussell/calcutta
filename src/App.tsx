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
import { allMatchups } from "./allMatchups";
import { Team, Squad, Matchup } from "./types";

function App() {
  const [showSquadsForm, setShowSquadsForm] = useState<boolean>(false);
  const [showTournamentBracket, setShowTournamentBracket] =
    useState<boolean>(false);
  const [changeTeamFlag, setChangeTeamFlag] = useState<boolean>(false);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerEnded, setTimerEnded] = useState<boolean>(false); // Add state to track timer end
  const [showNextTeamButton, setShowNextTeamButton] = useState<boolean>(false);
  const [orderOfAuction, setOrderOfAuction] = useState<boolean>(false);
  const [minutesPerItem, setMinutesPerItem] = useState<number>(0);
  const [squadSalaryCap, setSquadSalaryCap] = useState<number>(0);
  const [squads, setSquads] = useState<Squad[]>([]);
  const [soldTeam, setSoldTeam] = useState<Team | null>(null);
  const [upcomingTeams, setUpcomingTeams] = useState<Team[]>([]);
  const [nextTeamClicked, setNextTeamClicked] = useState<boolean>(false); // New state to track next team click

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
    // setChangeTeamFlag((prev) => !prev); // Toggle change team flag to display the next team
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
            <SquadsForm
              onSubmit={handleSquadsFormSubmit}
              salaryCap={squadSalaryCap}
            />
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
              <div className="timer-container">
                <Timer
                  minutesPerItem={minutesPerItem}
                  onTimerEnd={handleTimerEnd}
                  onTimerPause={handleTimerPause}
                  resetFlag={changeTeamFlag}
                />
              </div>
              {showNextTeamButton && !timerActive && allMatchups.length > 0 && (
                <button onClick={handleNextTeamClick}>Next Team</button>
              )}
              <div className="auction-container">
                <AuctionTeam
                  matchups={allMatchups}
                  changeTeamFlag={changeTeamFlag}
                  squadSalaryCap={squadSalaryCap}
                  timerActive={timerActive}
                  onTeamSold={handleTeamSold}
                  onNextTeam={handleNextTeam}
                  timerEnded={timerEnded}
                  updateUpcomingTeams={updateUpcomingTeams}
                  // nextTeamClicked={nextTeamClicked} // Pass next team clicked to AuctionTeam
                  // setNextTeamClicked={setNextTeamClicked} // Pass setter function to AuctionTeam
                />
              </div>
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
              {squads.length > 0 && <YourSquad squad={squads[0]} />}
              {orderOfAuction && <OrderOfAuction upcomingTeams={upcomingTeams} />}
              {squads.length > 1 ? (
                <OtherSquads squads={squads} yourSquad={squads[0]} />
              ) : (
                <div>
                  <h2>No Other Squads</h2>
                </div>
              )}
            </div>
            <br></br>
          </div>
        )}
      </div>
    </NumberOfPlayersProvider>
  );
}

export default App;

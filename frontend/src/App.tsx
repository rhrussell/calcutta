import React, { useState } from "react";
import "./App.css";
import { NumberOfPlayersProvider } from "./NumberOfPlayersContext";
import LeagueForm from "./LeagueForm/LeagueForm";
import SquadsForm from "./SquadsForm/SquadsForm";
import JoinLeagueForm from "./JoinLeagueForm/JoinLeagueForm";
import TournamentBracket from "./TournamentBracket/TournamentBracket";
import Timer from "./Timer/Timer";
import AuctionTeam from "./AuctionTeam/AuctionTeam";
import YourSquad from "./YourSquad/YourSquad";
import OtherSquads from "./OtherSquads/OtherSquads";
import OrderOfAuction from "./OrderOfAuction/OrderOfAuction";
import AuctionResults from "./AuctionResults/AuctionResults";
import { allTeams } from "./allTeams";
import { Team, Squad, League } from "./types";
import { Button } from "@mui/material";
import { createLeague } from "./api/leagueApi";

function App() {
  // Manage whether the home page is shown
  const [showHomePage, setShowHomePage] = useState<boolean>(true);
  // Manage whether the league form is shown
  const [showLeagueForm, setShowLeagueForm] = useState<boolean>(false);
  // Manage whether the squads form is shown
  const [showSquadsForm, setShowSquadsForm] = useState<boolean>(false);
  // Manage whether the join league form is shown
  const [showJoinLeagueForm, setShowJoinLeagueForm] = useState<boolean>(false);
  // Manage whether the tournament bracket is shown
  const [showTournamentBracket, setShowTournamentBracket] =
    useState<boolean>(false);
  // Manage the change team flag
  const [changeTeamFlag, setChangeTeamFlag] = useState<boolean>(false);
  // Manage whether the timer is active
  const [timerActive, setTimerActive] = useState<boolean>(false);
  // Manage whether the timer has ended
  const [timerEnded, setTimerEnded] = useState<boolean>(false);
  // Manage whether the "Next Team" button is shown
  const [showNextTeamButton, setShowNextTeamButton] = useState<boolean>(false);
  // Manage the order of auction flag
  const [orderOfAuction, setOrderOfAuction] = useState<boolean>(false);
  // Manage whether the auction is complete
  const [auctionComplete, setAuctionComplete] = useState<boolean>(false);
  // Manage whether the auction results are shown
  const [showAuctionResults, setShowAuctionResults] = useState<boolean>(false);
  // Manage the number of minutes per item in the auction
  const [minutesPerItem, setMinutesPerItem] = useState<number>(0);
  // Manage the squad salary cap
  const [squadSalaryCap, setSquadSalaryCap] = useState<number>(0);
  const [league, setLeague] = useState<League>();
  // Manage the list of squads
  const [squads, setSquads] = useState<Squad[]>([]);
  // Manage the team that was sold
  const [soldTeam, setSoldTeam] = useState<Team | null>(null);
  // Manage the list of upcoming teams
  const [upcomingTeams, setUpcomingTeams] = useState<Team[]>([]);
  const [previousTeamInfo, setPreviousTeamInfo] = useState<string | null>(null);

  const handleCreateLeagueClick = () => {
    setShowLeagueForm(true);
    setShowHomePage(false);
  };

  const handleJoinLeagueClick = () => {
    setShowJoinLeagueForm(true);
    setShowHomePage(false);
  };

  // Handle the submission of the league form
  const handleLeagueFormSubmit = (
    league: League,
    minutes: number,
    salary: number,
    order: boolean,
  ) => {
    setLeague(league);
    setMinutesPerItem(minutes);
    setSquadSalaryCap(salary);
    setOrderOfAuction(order);
    setShowLeagueForm(false);
    setShowSquadsForm(true);
  };

  // Handle the submission of the squads form
  const handleSquadsFormSubmit = async (squads: Squad[]) => {
    setSquads(squads);
    console.log(squads);
    try {
      if (league) {
        await createLeague(league, squads); // Pass league and squads separately
        alert("League created successfully");
      } else {
        alert("No league information available");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the league");
    }
    setShowSquadsForm(false);
    setShowTournamentBracket(true);
  };

  const handleJoinLeagueFormSubmit = (leagueName: string, password: string) => {
    console.log("League Name: ", leagueName);
    console.log("Password: ", password);
    //setShowJoinLeagueForm(false);
  };

  // Handle the end of the timer
  const handleTimerEnd = () => {
    setTimerActive(false); // Set the timer to inactive when the timer ends
    setShowNextTeamButton(true); // Show the Next Team button when the timer ends
    setChangeTeamFlag(false); // Set change team flag to true to display the next team
    setTimerEnded(true); // Set timerEnded to true
  };

  // Handle the pause of the timer
  const handleTimerPause = (isPaused: boolean) => {
    setTimerActive(!isPaused); // Set the timer to active when the timer is paused
    setShowNextTeamButton(false); // Hide the Next Team button when the timer is paused
    setChangeTeamFlag(false); // Reset change team flag when the timer is paused
  };

  // Handle the click of the Next Team button
  const handleNextTeamClick = () => {
    if (soldTeam !== null) {
      // THIS IS A TEMPORARY SOLUTION FOR TEAMS NOT BEING BID ON
      const updatedSquads = squads.map((squad, index) => {
        if (index === 0) {
          // Add the team to the first squad
          return {
            ...squad,
            teams: [...squad.teams, soldTeam],
            salaryCap: squad.salaryCap - (soldTeam.price || 0),
          };
        }
        return squad;
      });
      setSquads(updatedSquads); // Update the squads with the sold team
      setSquadSalaryCap(squads[0].salaryCap); // Update the salary cap
      setPreviousTeamInfo(
        `${soldTeam.seed} ${soldTeam.name} ${soldTeam.record} was sold to Squad 1 for $${soldTeam.price}`,
      );
    }
    setShowNextTeamButton(false); // Hide the Next Team button when clicked
    setChangeTeamFlag(true); // Set change team flag to true to display the next team
    setTimerEnded(false); // Reset timerEnded when Next Team button is clicked
    setSoldTeam(null); // Reset the sold team
  };

  // Handle changing to the next team
  const handleNextTeam = () => {
    setChangeTeamFlag(!changeTeamFlag); // Change the team flag to display the next team
    setShowNextTeamButton(false); // Hide the Next Team button when changing to the next team
  };

  // Handle when a team is sold
  const handleTeamSold = (soldTeam: Team | null) => {
    if (soldTeam !== null && soldTeam.price !== 0) {
      console.log("Handle Team Sold");
      setSoldTeam(soldTeam); // Set the sold team
    }
  };

  const handlePlay = () => {
    setPreviousTeamInfo(null);
  };

  // Update the list of upcoming teams
  const updateUpcomingTeams = (teams: Team[]) => {
    setUpcomingTeams(teams); // Update the list of upcoming teams
  };

  // Handle when the auction is complete
  const handleAuctionComplete = () => {
    setAuctionComplete(true); // Set the auction to complete
  };

  return (
    <NumberOfPlayersProvider>
      <div className="App">
        {showHomePage && (
          <div>
            <h1>Welcome to Calcutta Leagues!</h1>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateLeagueClick}
              >
                Create League
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleJoinLeagueClick}
              >
                Join League
              </Button>
            </div>
          </div>
        )}

        {showLeagueForm && !showAuctionResults && (
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

        {showJoinLeagueForm && !showAuctionResults && (
          <div>
            <JoinLeagueForm onSubmit={handleJoinLeagueFormSubmit} />
          </div>
        )}

        {!showHomePage &&
          !showLeagueForm &&
          !showSquadsForm &&
          !showJoinLeagueForm &&
          !showAuctionResults && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowTournamentBracket(!showTournamentBracket);
              }}
            >
              {showTournamentBracket ? "Hide Bracket" : "Display Bracket"}
            </Button>
          )}

        {showTournamentBracket && (
          <div>
            <TournamentBracket />
          </div>
        )}

        <br></br>

        {!showHomePage &&
          !showLeagueForm &&
          !showSquadsForm &&
          !showJoinLeagueForm &&
          !showAuctionResults && (
            <div>
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
                        showNextTeamButton={showNextTeamButton}
                        onPlay={handlePlay}
                      />
                    </div>
                    {showNextTeamButton &&
                      !timerActive &&
                      allTeams.length > 0 && (
                        <button onClick={handleNextTeamClick}>Next Team</button>
                      )}
                    <div>
                      {previousTeamInfo !== null && <p>{previousTeamInfo}</p>}
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

// This exports the App component so it can be used in other parts of the application.
// This component is the main component of the application.
// The component manages the state of the application.
export default App;

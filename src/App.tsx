import { useState } from "react";
import "./App.css";
import { NumberOfPlayersProvider } from "./NumberOfPlayersContext";
import LeagueForm from "./LeagueForm/LeagueForm";
import SquadsForm from "./SquadsForm/SquadsForm";
import TournamentBracket from "./TournamentBracket/TournamentBracket";
import Timer from "./Timer/Timer";
import AuctionTeam from "./AuctionTeam/AuctionTeam";
import YourSquad from "./YourSquad/YourSquad";
import OtherSquads from "./OtherSquads/OtherSquads";
import OrderOfAuction from "./OrderOfAuction/OrderOfAuction";
import AuctionResults from "./AuctionResults/AuctionResults";
import { allTeams } from "./allTeams";
import { Team, Squad } from "./types";
import { Button } from "@mui/material";

function App() {
  // Manage whether the league form is shown
  const [showLeagueForm, setShowLeagueForm] = useState<boolean>(true);
  // Manage whether the squads form is shown
  const [showSquadsForm, setShowSquadsForm] = useState<boolean>(false);
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
  // Manage the list of squads
  const [squads, setSquads] = useState<Squad[]>([]);
  // Manage the team that was sold
  const [soldTeam, setSoldTeam] = useState<Team | null>(null);
  // Manage the list of upcoming teams
  const [upcomingTeams, setUpcomingTeams] = useState<Team[]>([]);

  // Handle the submission of the league form
  const handleLeagueFormSubmit = (
    minutes: number,
    salary: number,
    order: boolean,
  ) => {
    setMinutesPerItem(minutes);
    setSquadSalaryCap(salary);
    setOrderOfAuction(order);
    setShowLeagueForm(false);
    setShowSquadsForm(true);
  };

  // Handle the submission of the squads form
  const handleSquadsFormSubmit = (squads: Squad[]) => {
    setSquads(squads);
    setShowSquadsForm(false);
    setShowTournamentBracket(true);
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
    if (soldTeam && soldTeam.price !== 0) { // THIS IS A TEMPORARY SOLUTION FOR TEAMS NOT BEING BID ON
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
    }
    setShowNextTeamButton(false); // Hide the Next Team button when clicked
    setChangeTeamFlag(true); // Set change team flag to true to display the next team
    setTimerEnded(false); // Reset timerEnded when Next Team button is clicked
  };

  // Handle changing to the next team
  const handleNextTeam = () => {
    setChangeTeamFlag(!changeTeamFlag); // Change the team flag to display the next team
    setShowNextTeamButton(false); // Hide the Next Team button when changing to the next team
  };

  // Handle when a team is sold
  const handleTeamSold = (soldTeam: Team) => {
    console.log("Handle Team Sold");
    setSoldTeam(soldTeam); // Set the sold team
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

        {!showLeagueForm && !showSquadsForm && !showAuctionResults && (
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

        {!showLeagueForm && !showSquadsForm && !showAuctionResults && (
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

// This exports the App component so it can be used in other parts of the application.
// This component is the main component of the application.
// The component manages the state of the application.
export default App;

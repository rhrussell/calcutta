import React, { useEffect, useState } from "react";
import "./App.css";
import { NumberOfPlayersProvider } from "./NumberOfPlayersContext";
import LeagueForm from "./pages/LeagueForm/LeagueForm";
import SquadsForm from "./pages/SquadsForm/SquadsForm";
import JoinLeagueForm from "./pages/JoinLeagueForm/JoinLeagueForm";
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
import {
  createLeague,
  getLeagueByName,
  joinLeague,
  finalizeResults,
} from "./api/leagueApi";
import io from "socket.io-client";
import { Route } from "@mui/icons-material";

const socket = io("http://localhost:3001"); // Adjust URL if needed

function App() {
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<App />} />
  //   </Routes>
  // </BrowserRouter>
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
  const [isCommissioner, setIsCommissioner] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  // Manage the number of minutes per item in the auction
  const [minutesPerItem, setMinutesPerItem] = useState<number>(0);
  // Manage the squad salary cap
  const [squadSalaryCap, setSquadSalaryCap] = useState<number>(0);
  const [league, setLeague] = useState<League>();
  // Manage the list of squads
  const [squads, setSquads] = useState<Squad[]>([]);
  const [yourSquad, setYourSquad] = useState<Squad | null>(null);
  // Manage the team that was sold
  const [soldTeam, setSoldTeam] = useState<Team | null>(null);
  // Manage the list of upcoming teams
  const [upcomingTeams, setUpcomingTeams] = useState<Team[]>([]);
  const [previousTeamInfo, setPreviousTeamInfo] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(minutesPerItem * 60);

  useEffect(() => {
    // WebSocket event handlers
    socket.on("startAuction", (data) => {
      console.log("Auction started:", data);
      setLeague(data.league);
      setSquads(data.squads);
      setSquadSalaryCap(data.salaryCapacity || 0);
      setMinutesPerItem(data.minutesPerItem || 0);
      setChangeTeamFlag(false);
      setShowNextTeamButton(false);
      setIsWaiting(false);
      setShowTournamentBracket(true);
    });

    socket.on("timerPaused", (data) => {
      setTimerActive(data.timerActive);
      setChangeTeamFlag(data.changeTeamFlag);
    });

    socket.on("timerEnded", (data) => {
      setTimerActive(data.timerActive);
      setChangeTeamFlag(data.changeTeamFlag);
      setTimerEnded(data.timerEnded);
    });

    socket.on("previousTeamInfoNull", (data) => {
      setPreviousTeamInfo(data.previousTeamInfo);
      setTimerActive(data.timerActive);
    });

    socket.on("updateUpcomingTeams", (data) => {
      setUpcomingTeams(data.teams);
    });

    socket.on("timerUpdate", (data) => {
      setTimeLeft(data.timeLeft);
      setTimerActive(data.timerActive);
    });

    socket.on("placeBid", (data) => {
      console.log("Bid placed:", data);
      // Handle bid logic here
    });

    return () => {
      socket.off("startAuction");
      socket.off("timerPaused");
      socket.off("timerEnded");
      socket.off("previousTeamInfoNull");
      socket.off("updateUpcomingTeams");
      socket.off("timerUpdate");
      socket.off("placeBid");
    };
  }, []);

  const handleCreateLeagueClick = () => {
    setShowLeagueForm(true);
    setShowHomePage(false);
    setIsCommissioner(true);
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
    try {
      if (league) {
        const updatedLeague: League = {
          ...league,
          squads,
        };
        setSquads(squads);
        setYourSquad(squads[0]);
        setLeague(updatedLeague);

        const createdLeague = await createLeague(updatedLeague, squads); // Pass league and squads separately

        console.log("League created:", createdLeague);

        setSquads(createdLeague.squads);
        setLeague(createdLeague);

        // console.log("League ID:", league.id);
        alert("League created successfully");
      } else {
        alert("No league information available");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the league");
    }
    setShowSquadsForm(false);
    setIsWaiting(true);
  };

  const handleJoinLeagueFormSubmit = (leagueName: string, password: string) => {
    console.log("League Name: ", leagueName);
    console.log("Password: ", password);
    handleSuccessfulJoin(leagueName, password);
    setSquads(squads);
  };

  const handleSuccessfulJoin = async (leagueName: string, password: string) => {
    try {
      const response = await joinLeague(leagueName, password);
      const testLeague = await getLeagueByName(leagueName);
      const testSquads = testLeague.squads;
      setSquads(testSquads);
      const yourSquad = testSquads.find(
        (squad) => squad.name === response.squadName,
      );
      setYourSquad(yourSquad || null); // Set the user's squad if found
      setIsWaiting(true);
      setIsCommissioner(false); // Users joining the league are not commissioners
      setShowJoinLeagueForm(false);
    } catch (error) {
      console.error("Failed to join the league:", error);
      alert("Failed to join the league");
    }
  };

  const handleContinueClick = () => {
    socket.emit("startAuction", {
      league: league,
      squads: squads,
      salaryCapacity: squadSalaryCap,
      minutesPerItem: minutesPerItem,
    }); // Notify others to start the auction
    setIsWaiting(false);
    setShowTournamentBracket(true);
  };

  // Handle the end of the timer
  const handleTimerEnd = () => {
    socket.emit("timerEnded", {
      timerActive: false,
      changeTeamFlag: true,
      timerEnded: true,
    });
    setTimerActive(false); // Set the timer to inactive when the timer ends
    setShowNextTeamButton(true); // Show the Next Team button when the timer ends
    setChangeTeamFlag(false); // Set change team flag to true to display the next team
    setTimerEnded(true); // Set timerEnded to true
  };

  // Handle the pause of the timer
  const handleTimerPause = (isPaused: boolean) => {
    socket.emit("timerPaused", {
      timerActive: !isPaused,
      changeTeamFlag: false,
    });
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
      console.log("Team Sold");
      setSoldTeam(soldTeam); // Set the sold team
      socket.emit("placeBid", { team: soldTeam }); // Notify others about the sold team
    }
  };

  const handlePlay = () => {
    socket.emit("previousTeamInfoNull", {
      previousTeamInfo: null,
      timerActive: true,
    });
    setPreviousTeamInfo(null);
    setTimerActive(true);
  };

  // Update the list of upcoming teams
  const updateUpcomingTeams = (teams: Team[]) => {
    socket.emit("updateUpcomingTeams", { teams: teams }); // Notify others about the upcoming teams
    setUpcomingTeams(teams); // Update the list of upcoming teams
  };

  // Handle when the auction is complete
  const handleAuctionComplete = () => {
    setAuctionComplete(true); // Set the auction to complete
  };

  const handleFinalizeResults = async () => {
    try {
      if (league?.id) {
        console.log("Finalizing auction results for league:", league.id);

        const updatedLeague = await finalizeResults(league.id, squads);
        setLeague(updatedLeague);

        console.log("Auction results finalized:", updatedLeague);
        alert("Calcutta auction results finalized successfully!");
      } else {
        console.error("League ID is not defined");
        alert("League ID is not defined");
      }
    } catch (error) {
      console.error("Failed to finalize auction results:", error);
    }
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

        {isWaiting && (
          <div>
            <h1>
              {isCommissioner
                ? "Waiting For Users To Join The League..."
                : "Waiting For The Commissioner To Start The League..."}
            </h1>
            {isCommissioner && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleContinueClick}
              >
                Continue
              </Button>
            )}
          </div>
        )}

        {!showHomePage &&
          !showLeagueForm &&
          !showSquadsForm &&
          !showJoinLeagueForm &&
          !showAuctionResults &&
          !isWaiting && (
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

        {!isWaiting && showTournamentBracket && (
          <div>
            <TournamentBracket />
          </div>
        )}

        <br></br>

        {!showHomePage &&
          !showLeagueForm &&
          !showSquadsForm &&
          !showJoinLeagueForm &&
          !showAuctionResults &&
          !isWaiting && (
            <>
              {isCommissioner ? (
                <div>
                  {/* Commissioner view */}
                  <Timer
                    minutesPerItem={minutesPerItem}
                    onTimerEnd={handleTimerEnd}
                    onTimerPause={handleTimerPause}
                    resetFlag={changeTeamFlag}
                    showNextTeamButton={showNextTeamButton}
                    onPlay={handlePlay}
                    isCommissioner={isCommissioner}
                  />
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
                  {auctionComplete && !showAuctionResults && (
                    <button
                      onClick={() => {
                        handleFinalizeResults();
                        setShowAuctionResults(true);
                        setShowTournamentBracket(false);
                      }}
                    >
                      Finalize Results
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  {/* Squad member view */}
                  <div>
                    <Timer
                      minutesPerItem={minutesPerItem}
                      onTimerEnd={handleTimerEnd}
                      onTimerPause={handleTimerPause}
                      resetFlag={changeTeamFlag}
                      showNextTeamButton={showNextTeamButton}
                      onPlay={handlePlay}
                      isCommissioner={!isCommissioner}
                    />
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
                  {yourSquad && (
                    <>
                      <YourSquad squad={yourSquad} salaryCap={squadSalaryCap} />
                      {squads.length > 1 && (
                        <OtherSquads squads={squads} yourSquad={yourSquad} />
                      )}
                    </>
                  )}
                  <OrderOfAuction upcomingTeams={upcomingTeams} />
                </div>
              )}
            </>
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

// Importing necessary parts from React and other components
import React, { useState, useEffect, useCallback, useRef } from "react";
import BidPanel from "../BidPanel/BidPanel";
import { Team } from "../types";
import "./AuctionTeam.css";

// Defining the types for the properties that the AuctionTeam component will receive
interface AuctionTeamProps {
  teams: Team[]; // List of teams available for auction
  changeTeamFlag: boolean; // Flag to indicate when to change the current team
  squadSalaryCap: number; // Maximum budget for the squad
  timerActive: boolean; // Flag to indicate if the timer is active
  onTeamSold: (soldTeam: Team) => void; // Function to call when a team is sold
  onNextTeam: () => void; // Function to call to move to the next team
  timerEnded: boolean; // Flag to indicate if the timer has ended
  updateUpcomingTeams: (teams: Team[]) => void; // Function to update the list of upcoming teams
  onAuctionComplete: () => void; // Function to call when the auction is complete
}

// The main AuctionTeam component that handles the auction process
const AuctionTeam: React.FC<AuctionTeamProps> = ({
  teams: initialTeams,
  changeTeamFlag,
  squadSalaryCap,
  timerActive,
  onTeamSold,
  onNextTeam,
  timerEnded,
  updateUpcomingTeams,
  onAuctionComplete,
}) => {
  // State to keep track of the list of teams
  const [teams, setTeams] = useState<Team[]>([...initialTeams]);
  // State to keep track of the current team being auctioned
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  // State to keep track of the order of teams for auction
  const [orderOfAuction, setOrderOfAuction] = useState<Team[]>([]);
  // State to keep track of the highest bid placed
  const [highestBid, setHighestBid] = useState<number>(0);
  // State to keep track of the current team's index
  const [currentTeamIndex, setCurrentTeamIndex] = useState<number>(0);
  // State to keep track if a team has been added to the auction
  const [teamAdded, setTeamAdded] = useState<boolean>(false);

  // Reference to store the salary cap for the squad
  const squadSalaryCapRef = useRef<number>(squadSalaryCap);

  // Function to shuffle the array of teams (to randomize the order)
  const shuffleArray = (array: Team[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // useEffect hook that runs when the component mounts
  useEffect(() => {
    // Shuffle the initial list of teams
    const shuffledTeams = shuffleArray([...initialTeams]);
    // Set the order of auction to the shuffled list
    setOrderOfAuction(shuffledTeams);
    // Set the current team to the first team in the shuffled list
    if (shuffledTeams.length > 0) {
      setCurrentTeam(shuffledTeams[0]);
      // Update the upcoming teams (next 10 teams)
      updateUpcomingTeams(shuffledTeams.slice(1, 11));
    }
  }, []); // Empty dependency array means this runs only once

  // useEffect hook that runs when currentTeamIndex or orderOfAuction changes
  useEffect(() => {
    // Set the current team to the team at currentTeamIndex in the order of auction
    if (currentTeamIndex < orderOfAuction.length) {
      setCurrentTeam(orderOfAuction[currentTeamIndex]);
    }
  }, [currentTeamIndex, orderOfAuction]); // Dependencies for the effect

  // Function to handle a new bid being placed
  const handleBidPlaced = (price: number) => {
    // If the new bid is higher than the current highest bid, update the highest bid
    if (price > highestBid) {
      setHighestBid(price);
    }
  };

  // Function to handle when the timer is up
  const handleTimerUp = useCallback(() => {
    // If there is a current team, a bid has been placed, and the team has not been added yet
    if (currentTeam && highestBid > 0 && !teamAdded) {
      console.log("Handle Timer Up");
      // Set the current team's price to the highest bid
      currentTeam.price = highestBid;
      // Call the onTeamSold function with the current team
      onTeamSold(currentTeam);
      // Mark the team as added
      setTeamAdded(true);
      // Reduce the squad's salary cap by the highest bid amount
      squadSalaryCapRef.current -= highestBid;
      // Reset the highest bid
      setHighestBid(0);
      // Mark the team as not added (for the next team)
      setTeamAdded(false);
    }
  }, [currentTeam, highestBid, onTeamSold, teamAdded, squadSalaryCapRef]);

  // Function to move to the next team in the auction
  const handleNextTeam = () => {
    // Update the order of auction to remove the first team
    setOrderOfAuction((prevOrder) => {
      const newOrder = prevOrder.slice(1);
      // If there are still teams left
      if (newOrder.length > 0) {
        // Set the current team to the first team in the new order
        setCurrentTeam(newOrder[0]);
        // Update the upcoming teams (next 10 teams)
        updateUpcomingTeams(newOrder.slice(1, 10));
      } else {
        // If no teams are left, set current team to null and complete the auction
        setCurrentTeam(null);
        updateUpcomingTeams([]);
        onAuctionComplete();
      }
      return newOrder;
    });
  };

  // useEffect hook that runs when timerActive or timerEnded changes
  useEffect(() => {
    // If the timer is not active and has ended, handle the timer up event
    if (!timerActive && timerEnded) {
      handleTimerUp();
    }
  }, [timerActive, timerEnded, handleTimerUp]); // Dependencies for the effect

  // useEffect hook that runs when changeTeamFlag changes
  useEffect(() => {
    // If changeTeamFlag is true, move to the next team
    if (changeTeamFlag) {
      handleNextTeam();
    }
  }, [changeTeamFlag]); // Dependency for the effect

  // If there is no current team, display a loading message
  if (!currentTeam) return <div>Loading...</div>;

  // Return the JSX to render the auction team component
  // This component displays the current team being auctioned and the bid panel
  // It also shows the remaining salary cap for the squad
  // It handles the bidding process and moving to the next team
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2>Current Team</h2>
        <div>Name: {currentTeam.name}</div>
        <div>Record: {currentTeam.record}</div>
        <div>Seed: {currentTeam.seed}</div>
        <div>Region: {currentTeam.region}</div>
        <div>First Opponent: {currentTeam.opponent}</div>
      </div>
      <div>
        <BidPanel
          squadSalaryCap={squadSalaryCapRef.current}
          changeTeamFlag={changeTeamFlag}
          timerActive={timerActive}
          onNextTeam={onNextTeam}
          onBidPlaced={handleBidPlaced}
        />
      </div>
    </div>
  );
};

// This exports the AuctionTeam component so it can be used in other parts of the application.
// This is the component that will be used to display the current team being auctioned and handle the bidding process.
// It will also handle moving to the next team in the auction.
// It will receive the list of teams, the current team, the highest bid, and other necessary information as props.
// It will also handle the timer events and update the list of upcoming teams.
// It will call the onTeamSold function when a team is sold and the onAuctionComplete function when the auction is complete.
// It will also display the bid panel component to handle the bidding process.
// It will display the current team's information and allow the user to place bids on the team.
// It will also display the remaining salary cap for the squad.
// It will handle moving to the next team in the auction when the timer is up or when the user clicks the next team button.
// It will also shuffle the list of teams at the start of the auction and update the upcoming teams.
// It will handle the change in the current team when the changeTeamFlag is set to true.
// It will display a loading message if there is no current team to auction.
export default AuctionTeam;

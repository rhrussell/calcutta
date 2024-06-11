import React, { useState, useEffect, useCallback, useRef } from "react";
import BidPanel from "../BidPanel/BidPanel";
import { Team, Squad, Matchup } from "../types";
import "./AuctionTeam.css";

interface AuctionTeamProps {
  matchups: Matchup[];
  changeTeamFlag: boolean;
  squadSalaryCap: number;
  timerActive: boolean;
  onTeamSold: (soldTeam: Team) => void;
  onNextTeam: () => void; // Add onNextTeam prop
  timerEnded: boolean; // Add timerEnded prop
  updateUpcomingTeams: (teams: Team[]) => void; // Add prop to update upcoming teams
}

const AuctionTeam: React.FC<AuctionTeamProps> = ({
  matchups,
  changeTeamFlag,
  squadSalaryCap,
  timerActive,
  onTeamSold,
  onNextTeam,
  timerEnded,
  updateUpcomingTeams, // Add this prop
}) => {
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [orderOfAuction, setOrderOfAuction] = useState<Team[]>([]);
  const [highestBid, setHighestBid] = useState<number>(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState<number>(0);
  const [teamAdded, setTeamAdded] = useState<boolean>(false); // Add state to track if team is added

  const squadSalaryCapRef = useRef<number>(squadSalaryCap); // Ref to store mutable value

  const getRandomTeam = useCallback(() => {
    const randomMatchupIndex = Math.floor(Math.random() * matchups.length);
    const selectedMatchup = matchups[randomMatchupIndex];
    // const isTopTeam = Math.random() > 0.5;

    // setCurrentTeam(isTopTeam ? selectedMatchup.top : selectedMatchup.bottom);
    // setOpponent(isTopTeam ? selectedMatchup.bottom : selectedMatchup.top);
    // setTeamAdded(false); // Reset teamAdded state
    // return isTopTeam ? selectedMatchup.top : selectedMatchup.bottom;
    return Math.random() > 0.5 ? selectedMatchup.top : selectedMatchup.bottom;
  }, [matchups]);

  useEffect(() => {
    const teams: Team[] = [];
    for (let i = 0; i < 64; i++) {
      teams.push(getRandomTeam());
    }
    setOrderOfAuction(teams);
    setCurrentTeam(teams[currentTeamIndex]);
    updateUpcomingTeams(teams.slice(currentTeamIndex + 1, currentTeamIndex + 10));
  }, []);

  useEffect(() => {
    if (currentTeamIndex < orderOfAuction.length) {
      setCurrentTeam(orderOfAuction[currentTeamIndex]);
    }
  }, [currentTeamIndex, orderOfAuction]);

  const handleBidPlaced = (price: number) => {
    if (price > highestBid) {
      setHighestBid(price);
    }
  };

  const handleTimerUp = useCallback(() => {
    if (currentTeam && highestBid > 0 && !teamAdded) {
      // Check if team is not added yet
      console.log("Handle Timer Up");
      currentTeam.price = highestBid;
      onTeamSold(currentTeam);
      setTeamAdded(true);
      squadSalaryCapRef.current -= highestBid;
      setHighestBid(0);
      setTeamAdded(false);
    }
  }, [
    currentTeam,
    highestBid,
    onTeamSold,
    teamAdded,
    squadSalaryCapRef,
  ]);

  const handleNextTeam = () => {
    if (currentTeam) {
      // onTeamSold(currentTeam);
      setCurrentTeamIndex(prevIndex => prevIndex + 1); // Move to the next team index
      updateUpcomingTeams(orderOfAuction.slice(currentTeamIndex + 2, currentTeamIndex + 11)); // Update upcoming teams
    }
  };

  useEffect(() => {
    if (!timerActive && timerEnded) {
      handleTimerUp();
    }
  }, [timerActive, timerEnded, handleTimerUp]);

  useEffect(() => {
    if (changeTeamFlag) {
      handleNextTeam();
    }
  }, [changeTeamFlag]);

  if (!currentTeam) return <div>Loading...</div>;

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
        <div>
          First Opponent: {currentTeam.opponent}
        </div>
      </div>
      <div className="bid-panel">
        <BidPanel
          squadSalaryCap={squadSalaryCapRef.current}
          changeTeamFlag={changeTeamFlag}
          timerActive={timerActive}
          onNextTeam={onNextTeam} // Pass onNextTeam function to BidPanel
          onBidPlaced={handleBidPlaced}
        />
      </div>
    </div>
  );
};

export default AuctionTeam;

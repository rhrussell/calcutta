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
}

const AuctionTeam: React.FC<AuctionTeamProps> = ({
  matchups,
  changeTeamFlag,
  squadSalaryCap,
  timerActive,
  onTeamSold,
  onNextTeam,
  timerEnded,
}) => {
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [opponent, setOpponent] = useState<Team | null>(null);
  const [highestBid, setHighestBid] = useState<number>(0);
  const [teamAdded, setTeamAdded] = useState<boolean>(false); // Add state to track if team is added

  const squadSalaryCapRef = useRef<number>(squadSalaryCap); // Ref to store mutable value

  const getRandomTeam = useCallback(() => {
    const randomMatchupIndex = Math.floor(Math.random() * matchups.length);
    const selectedMatchup = matchups[randomMatchupIndex];
    const isTopTeam = Math.random() > 0.5;

    setCurrentTeam(isTopTeam ? selectedMatchup.top : selectedMatchup.bottom);
    setOpponent(isTopTeam ? selectedMatchup.bottom : selectedMatchup.top);
    setTeamAdded(false); // Reset teamAdded state
  }, [matchups]);

  const handleBidPlaced = (price: number) => {
    if (price > highestBid) {
      setHighestBid(price);
    }
  };

  const handleTimerUp = useCallback(() => {
    if (currentTeam && opponent && highestBid > 0 && !teamAdded) {
      // Check if team is not added yet
      console.log("Handle Timer Up");
      currentTeam.price = highestBid;
      const soldTeam = {
        ...currentTeam,
        opponent: `${opponent.seed} ${opponent.name}`,
      };
      onTeamSold(soldTeam);
      setTeamAdded(true); // Set teamAdded to true
      squadSalaryCapRef.current -= highestBid; // Access the mutable value via ref
    }
  }, [currentTeam, opponent, highestBid, onTeamSold, teamAdded]);

  useEffect(() => {
    getRandomTeam();
  }, [getRandomTeam, changeTeamFlag]);

  useEffect(() => {
    if (!timerActive && timerEnded) {
      handleTimerUp();
    }
  }, [timerActive, timerEnded, handleTimerUp]);

  if (!currentTeam || !opponent) return <div>Loading...</div>;

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
          First Opponent: {opponent.seed} {opponent.name} {opponent.record}
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

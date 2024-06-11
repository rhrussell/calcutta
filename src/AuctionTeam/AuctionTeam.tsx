import React, { useState, useEffect, useCallback, useRef } from "react";
import BidPanel from "../BidPanel/BidPanel";
import { Team, Squad } from "../types";
import "./AuctionTeam.css";

interface AuctionTeamProps {
  teams: Team[];
  changeTeamFlag: boolean;
  squadSalaryCap: number;
  timerActive: boolean;
  onTeamSold: (soldTeam: Team) => void;
  onNextTeam: () => void;
  timerEnded: boolean;
  updateUpcomingTeams: (teams: Team[]) => void;
}

const AuctionTeam: React.FC<AuctionTeamProps> = ({
  teams,
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
    const randomTeamIndex = Math.floor(Math.random() * teams.length);
    const selectedTeam = teams[randomTeamIndex];
    return selectedTeam;
  }, [teams]);

  useEffect(() => {
    const orderOfAuction: Team[] = [];
    for (let i = 0; i < teams.length; i++) {
      orderOfAuction.push(getRandomTeam());
    }
    setOrderOfAuction(orderOfAuction);
    setCurrentTeam(teams[currentTeamIndex]);
    updateUpcomingTeams(
      orderOfAuction.slice(currentTeamIndex + 1, currentTeamIndex + 10),
    );
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
  }, [currentTeam, highestBid, onTeamSold, teamAdded, squadSalaryCapRef]);

  const handleNextTeam = () => {
    if (currentTeam) {
      setCurrentTeamIndex((prevIndex) => prevIndex + 1);
      updateUpcomingTeams(
        orderOfAuction.slice(currentTeamIndex + 2, currentTeamIndex + 11),
      );
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
        <div>First Opponent: {currentTeam.opponent}</div>
      </div>
      <div className="bid-panel">
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

export default AuctionTeam;

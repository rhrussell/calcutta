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
  onAuctionComplete: () => void;
}

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
  const [teams, setTeams] = useState<Team[]>([...initialTeams]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [orderOfAuction, setOrderOfAuction] = useState<Team[]>([]);
  const [highestBid, setHighestBid] = useState<number>(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState<number>(0);
  const [teamAdded, setTeamAdded] = useState<boolean>(false); // Add state to track if team is added

  const squadSalaryCapRef = useRef<number>(squadSalaryCap); // Ref to store mutable value

  const shuffleArray = (array: Team[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const shuffledTeams = shuffleArray([...initialTeams]);
    setOrderOfAuction(shuffledTeams);
    if (shuffledTeams.length > 0) {
      setCurrentTeam(shuffledTeams[0]);
      updateUpcomingTeams(shuffledTeams.slice(1, 11));
    }
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
    setOrderOfAuction((prevOrder) => {
      const newOrder = prevOrder.slice(1);
      if (newOrder.length > 0) {
        setCurrentTeam(newOrder[0]);
        updateUpcomingTeams(newOrder.slice(1, 10));
      } else {
        setCurrentTeam(null);
        updateUpcomingTeams([]);
        onAuctionComplete();
      }
      return newOrder;
    });
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

export default AuctionTeam;

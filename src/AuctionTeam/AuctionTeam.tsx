import React, { useState, useEffect, useCallback } from "react";
import BidPanel from "../BidPanel/BidPanel";

interface Team {
  seed: string;
  name: string;
  record: string;
  region: string;
  opponent?: string;
  price?: number;
}

interface Matchup {
  top: Team;
  bottom: Team;
  position: number;
}

interface AuctionTeamProps {
  matchups: Matchup[];
  changeTeamFlag: boolean;
  squadSalaryCap: number;
  timerActive: boolean;
  onTeamsSold: (soldTeam: Team) => void;
  onNextTeam: () => void; // Add onNextTeam prop
}

const AuctionTeam: React.FC<AuctionTeamProps> = ({
  matchups,
  changeTeamFlag,
  squadSalaryCap,
  timerActive,
  onTeamsSold,
  onNextTeam, // Receive onNextTeam function
}) => {
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [opponent, setOpponent] = useState<Team | null>(null);
  const [highestBid, setHighestBid] = useState<number>(0);
  const [teamAdded, setTeamAdded] = useState<boolean>(false); // Add state to track if team is added

  const getRandomTeam = useCallback(() => {
    const randomMatchupIndex = Math.floor(Math.random() * matchups.length);
    const selectedMatchup = matchups[randomMatchupIndex];
    const isTopTeam = Math.random() > 0.5;

    setCurrentTeam(isTopTeam ? selectedMatchup.top : selectedMatchup.bottom);
    setOpponent(isTopTeam ? selectedMatchup.bottom : selectedMatchup.top);
    setTeamAdded(false); // Reset teamAdded state
  }, [matchups]);

  useEffect(() => {
    getRandomTeam();
  }, [getRandomTeam, changeTeamFlag]);

  const handleBidPlaced = (price: number) => {
    if (price > highestBid) {
      setHighestBid(price);
    }
  };

  const handleTimerUp = useCallback(() => {
    if (currentTeam && opponent && highestBid > 0 && !teamAdded) { // Check if team is not added yet
      const soldTeam = { ...currentTeam, price: highestBid, opponent: `${opponent.seed} ${opponent.name}` };
      onTeamsSold(soldTeam);
      setTeamAdded(true); // Set teamAdded to true
    }
  }, [currentTeam, opponent, highestBid, onTeamsSold, teamAdded]);

  if (!currentTeam || !opponent) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <h3>Current Team</h3>
        <div>Name: {currentTeam.name}</div>
        <div>Record: {currentTeam.record}</div>
        <div>Seed: {currentTeam.seed}</div>
        <div>Region: {currentTeam.region}</div>
        <div>
          First Opponent: {opponent.seed} {opponent.name} {opponent.record}
        </div>
      </div>
      <div>
        <BidPanel
          squadSalaryCap={squadSalaryCap}
          changeTeamFlag={changeTeamFlag}
          timerActive={timerActive}
          onNextTeam={onNextTeam} // Pass onNextTeam function to BidPanel
          onBidPlaced={handleBidPlaced}
          onTimerUp={handleTimerUp} // Pass handleTimerUp function to BidPanel
        />
      </div>
    </div>
  );
};

export default AuctionTeam;
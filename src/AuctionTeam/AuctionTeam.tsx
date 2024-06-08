import React, { useState, useEffect, useCallback } from "react";
import BidPanel from "../BidPanel/BidPanel";

interface Team {
  seed: string;
  name: string;
  record: string;
  region: string;
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
}

const AuctionTeam: React.FC<AuctionTeamProps> = ({
  matchups,
  changeTeamFlag,
  squadSalaryCap,
  timerActive,
}) => {
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [opponent, setOpponent] = useState<Team | null>(null);

  const getRandomTeam = useCallback(() => {
    const randomMatchupIndex = Math.floor(Math.random() * matchups.length);
    const selectedMatchup = matchups[randomMatchupIndex];
    const isTopTeam = Math.random() > 0.5;

    setCurrentTeam(isTopTeam ? selectedMatchup.top : selectedMatchup.bottom);
    setOpponent(isTopTeam ? selectedMatchup.bottom : selectedMatchup.top);
  }, [matchups]);

  useEffect(() => {
    getRandomTeam();
  }, [getRandomTeam, changeTeamFlag]);

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
    </div>
  );
};

export default AuctionTeam;

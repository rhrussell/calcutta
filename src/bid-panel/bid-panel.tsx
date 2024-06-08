import React, { useState, useEffect } from 'react';

interface Team {
  seed: string;
  name: string;
  record: string;
  region: string;
}

interface BidPanelProps {
  squadSalaryCap: number;
  timerActive: boolean;
  onNextTeam: () => void;
  changeTeamFlag: boolean;
}

const BidPanel: React.FC<BidPanelProps> = ({ squadSalaryCap, changeTeamFlag, timerActive, onNextTeam }) => {
  const [currentBid, setCurrentBid] = useState<number>(0);
  const [highestBid, setHighestBid] = useState<number>(0);

  useEffect(() => {
    setCurrentBid(0);
    setHighestBid(0);
  }, [changeTeamFlag]);

  const handlePlaceBid = () => {
    if (currentBid > highestBid) {
      setHighestBid(currentBid);
    }
  };

  const handleIncreaseBid = () => {
    setCurrentBid((prevBid) => prevBid < squadSalaryCap ? prevBid + 1 : prevBid);
  };

  const handleDecreaseBid = () => {
    setCurrentBid((prevBid) => prevBid > 0 ? prevBid - 1 : prevBid);
  };

  const isPlaceBidDisabled = currentBid === 0 || currentBid <= highestBid || !timerActive;
  const isMinusDisabled = currentBid <= highestBid || !timerActive;
  const isPlusDisabled = currentBid === squadSalaryCap || !timerActive;

  return (
    <div>
      <div>
        <h3>Highest Bid: ${highestBid}</h3>
      </div>
      <br />
      <div>
        <h3>Your Bid: ${currentBid}</h3>
        <button onClick={handleDecreaseBid} disabled={isMinusDisabled}>-</button>
        <button onClick={handleIncreaseBid} disabled={isPlusDisabled}>+</button>
        <button onClick={handlePlaceBid} disabled={isPlaceBidDisabled}>Place Bid</button>
      </div>
    </div>
  );
};

export default BidPanel;

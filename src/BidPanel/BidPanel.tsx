// Importing necessary parts from React
import React, { useState, useEffect } from "react";

// Defining the types for the properties that the BidPanel component will receive
interface BidPanelProps {
  squadSalaryCap: number; // Maximum budget for the squad
  timerActive: boolean; // Flag to indicate if the timer is active
  changeTeamFlag: boolean; // Flag to indicate when to change the current team
  onBidPlaced: (highestBid: number) => void; // Function to call when a bid is placed
  onNextTeam: () => void; // Function to call to move to the next team
}

// The main BidPanel component
// This component handles the bidding process for a team in the auction process
// It allows the user to place a bid, increase or decrease the bid amount, and place the bid
// The component also displays the highest bid placed so far
// The component is used in the AuctionTeam component
// It receives the squad's salary cap, the timer status, the change team flag, and functions to handle the bid process
const BidPanel: React.FC<BidPanelProps> = ({
  squadSalaryCap,
  changeTeamFlag,
  timerActive,
  onBidPlaced,
}) => {
  // State to keep track of the current bid
  const [currentBid, setCurrentBid] = useState<number>(0);
  // State to keep track of the highest bid placed
  const [highestBid, setHighestBid] = useState<number>(0);

  // useEffect hook that runs when changeTeamFlag changes
  useEffect(() => {
    // Reset the current bid and highest bid to 0 when the team changes
    setCurrentBid(0);
    setHighestBid(0);
  }, [changeTeamFlag]); // Dependency for the effect

  // Function to handle placing a bid
  const handlePlaceBid = () => {
    // If the current bid is higher than the highest bid, update the highest bid
    if (currentBid > highestBid) {
      setHighestBid(currentBid);
      // Call the onBidPlaced function with the current bid
      onBidPlaced(currentBid);
    }
  };

  // Function to increase the current bid by 1
  const handleIncreaseBid = () => {
    // Increase the bid only if it is less than the squad's salary cap
    setCurrentBid((prevBid) =>
      prevBid < squadSalaryCap ? prevBid + 1 : prevBid,
    );
  };

  // Function to decrease the current bid by 1
  const handleDecreaseBid = () => {
    // Decrease the bid only if it is greater than 0
    setCurrentBid((prevBid) => (prevBid > 0 ? prevBid - 1 : prevBid));
  };

  // Determine if the Place Bid button should be disabled
  const isPlaceBidDisabled =
    currentBid === 0 || currentBid <= highestBid || !timerActive;
  // Determine if the Minus button should be disabled
  const isMinusDisabled = currentBid <= highestBid || !timerActive;
  // Determine if the Plus button should be disabled
  const isPlusDisabled = currentBid === squadSalaryCap || !timerActive;

  // Return the JSX to render the bid panel component
  return (
    <div>
      <div>
        <h2>Highest Bid: ${highestBid}</h2>
      </div>
      <br />
      <div>
        <h2>Your Bid: ${currentBid}</h2>
        <button onClick={handleDecreaseBid} disabled={isMinusDisabled}>
          -
        </button>
        <button onClick={handleIncreaseBid} disabled={isPlusDisabled}>
          +
        </button>
        <button onClick={handlePlaceBid} disabled={isPlaceBidDisabled}>
          Place Bid
        </button>
      </div>
    </div>
  );
};

// This exports the BidPanel component so it can be used in other parts of the application.
// The component is used in the AuctionTeam component to handle the bidding process for a team in the auction.
// The component receives the squad's salary cap, the timer status, the change team flag, and functions to handle the bid process.
// The component allows the user to place a bid, increase or decrease the bid amount, and place the bid.
// The component also displays the highest bid placed so far.
// The Place Bid button is disabled if the bid is 0, less than or equal to the highest bid, or the timer is not active.
// The Minus button is disabled if the bid is less than or equal to the highest bid or the timer is not active.
// The Plus button is disabled if the bid is equal to the squad's salary cap or the timer is not active.
// The Increase Bid button increases the bid amount by 1.
// The Decrease Bid button decreases the bid amount by 1.
// The Place Bid button places the bid and updates the highest bid if the bid is higher than the current highest bid.
export default BidPanel;

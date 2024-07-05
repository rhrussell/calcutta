// Importing necessary parts from React
import React from "react";
// Importing the Team type from another file
import { Team } from "../types";

// Defining the types for the properties that the OrderOfAuction component will receive
interface OrderOfAuctionProps {
  // Array of upcoming teams
  upcomingTeams: Team[];
}

// The main OrderOfAuction component
const OrderOfAuction: React.FC<OrderOfAuctionProps> = ({ upcomingTeams }) => {
  return (
    <div>
      {/* Header for the component */}
      <h2>Order of Auction</h2>
      {/* Ordered list to display the names of the upcoming teams */}
      <ol>
        {/* Loop through each team in the upcomingTeams array */}
        {upcomingTeams.map((team, index) => (
          // Display each team's name in a list item
          <li key={index}>{team.name}</li>
        ))}
      </ol>
    </div>
  );
};

// This exports the OrderOfAuction component so it can be used in other parts of the application.
// This component will display the order in which teams will be auctioned.
// The component receives an array of upcoming teams as a prop.
// The component displays the names of the upcoming teams in a list.
// The list is ordered based on the order of auction.
// Each team's name is displayed in a list item.
// The list item has a unique key based on the index.
// The list is displayed in an ordered list.
export default OrderOfAuction;

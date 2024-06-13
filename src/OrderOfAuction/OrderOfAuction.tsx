import React from "react";
import { Team } from "../types";

interface OrderOfAuctionProps {
  upcomingTeams: Team[];
}

const OrderOfAuction: React.FC<OrderOfAuctionProps> = ({ upcomingTeams }) => {
  return (
    <div>
      <h2>Order of Auction</h2>
      <ol>
        {upcomingTeams.map((team, index) => (
          <li key={index}>{team.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default OrderOfAuction;
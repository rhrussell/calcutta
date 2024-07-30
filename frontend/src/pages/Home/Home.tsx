import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { League, Squad } from "../../types";

function Home() {
  const navigate = useNavigate();

  const handleCreateLeagueClick = () => {
    navigate("/createleague");
  };

  const handleJoinLeagueClick = () => {
    navigate("/joinleague");
  };
  return (
    <div>
      <h1>Welcome to Calcutta Leagues!</h1>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateLeagueClick}
        >
          Create League
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleJoinLeagueClick}
        >
          Join League
        </Button>
      </div>
    </div>
  );
}

export default Home;

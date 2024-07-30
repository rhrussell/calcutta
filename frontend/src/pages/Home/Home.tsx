import LeagueForm from "../LeagueForm/LeagueForm";
import SquadsForm from "../SquadsForm/SquadsForm";
import JoinLeagueForm from "../JoinLeagueForm/JoinLeagueForm";
import { useState } from "react";

function Home() {
  const [showHomePage, setShowHomePage] = useState<boolean>(true);
  // Manage whether the league form is shown
  const [showLeagueForm, setShowLeagueForm] = useState<boolean>(false);
  // Manage whether the squads form is shown
  const [showSquadsForm, setShowSquadsForm] = useState<boolean>(false);
  // Manage whether the join league form is shown
  const [showJoinLeagueForm, setShowJoinLeagueForm] = useState<boolean>(false);
  return true;
  // {showHomePage && (
  //         <div>
  //         <h1>Welcome to Calcutta Leagues!</h1>
  //         <div>
  //             <Button
  //             variant="contained"
  //             color="primary"
  //             onClick={handleCreateLeagueClick}
  //             >
  //             Create League
  //             </Button>
  //             <Button
  //             variant="contained"
  //             color="primary"
  //             onClick={handleJoinLeagueClick}
  //             >
  //             Join League
  //             </Button>
  //         </div>
  //         </div>
  //     )}
}

export default Home;

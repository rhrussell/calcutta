import React, { useState,  ChangeEvent, FormEvent } from 'react';
import './tournament-bracket.css';

// const TeamSlot = (teamsTuple) => {
//   const { top, bottom } = teams;
//   return (
//     <ul className="matchup matchup-2">
//     <li className="team team-top">{top.seed} {top.name} {top.record}</li>
//     <li className="team team-bottom winner">{bottom.seed} {bottom.name} {bottom.record}</li>
//   </ul>
//   )
// }

// const allTeams = [
//   {
//     top: { seed: '', },
//     bottom: { seed: ''}
//   }, 
//   {
//     top: { seed: '', },
//     bottom: { seed: ''}
//   }, 
// ]

function TournamentBracket() {
    return (
        <>
      <header>
	<ol>
		<li>Round 1 <br/><span>Mar 15/16</span></li>
		<li>Round 2 <br/><span>Mar 17/18</span></li>
		<li>Sweet 16 <br/><span>Mar 22/23</span></li>
		<li>Elite 8 <br/><span>Mar 24/25</span></li>
		<li>Final 4 <br/><span>Mar 31/Apr 2</span></li>
		<li>Elite 8 <br/><span>Mar 24/25</span></li>
		<li>Sweet 16<br/><span>Mar 22/23</span></li>
		<li>Round 2 <br/><span>Mar 17/18</span></li>
		<li>Round 1 <br/><span>Mar 15/16</span></li>
	</ol>
</header>
<div className="bracket">
	<div className="region region-1">
    {/* {allTeams.map(teamTuple => (
      <TeamSlot teamsTuple={teamTuple} />
    ))

    } */}

	{/* <!-- Region 1 Round 1--> */}
		<ul className="matchup matchup-1">
			<li className="team team-top">1 UConn (31-3)</li>
			<li className="team team-bottom winner">16 Stetson (22-12)</li>
		</ul>

		<ul className="matchup matchup-2">
			<li className="team team-top">8 Florida Atlantic (25-8)</li>
			<li className="team team-bottom winner">9 Northwestern (21-11)</li>
		</ul>

		<ul className="matchup matchup-3">
			<li className="team team-top winner">5 San Diego (24-10)</li>
			<li className="team team-bottom">12 UAB (23-11)</li>
		</ul>

		<ul className="matchup matchup-4">
			<li className="team team-top">4 Auburn (27-7)</li>
			<li className="team team-bottom winner">13 Yale (22-9)</li>
		</ul>

		<ul className="matchup matchup-5">
			<li className="team team-top">6 BYU (23-10)</li>
			<li className="team team-bottom winner">11 Duquesne (24-11)</li>
		</ul>

		<ul className="matchup matchup-6">
			<li className="team team-top winner">3 Illinois (26-8)</li>
			<li className="team team-bottom">14 Morehead St. (26-8)</li>
		</ul>

		<ul className="matchup matchup-7">
			<li className="team team-top winner">7 Washington St. (24-9)</li>
			<li className="team team-bottom">10 Drake (28-6)</li>
		</ul>

		<ul className="matchup matchup-8">
			<li className="team team-top winner">2 Iowa St. (27-7)</li>
			<li className="team team-bottom">15 S. Dakota St. (22-12)</li>
		</ul>
	
	{/* <!-- Region 1 Round 2 --> */}
		<ul className="matchup matchup-33">
			<li className="team team-top"></li>
			<li className="team team-bottom winner"></li>
		</ul>
	
		<ul className="matchup matchup-34">
			<li className="team team-top winner"></li>
			<li className="team team-bottom"></li>
		</ul>
	
		<ul className="matchup matchup-35">
			<li className="team team-top winner"></li>
			<li className="team team-bottom"></li>
		</ul>
	
		<ul className="matchup matchup-36">
			<li className="team team-top winner"></li>
			<li className="team team-bottom"></li>
		</ul>
	
	{/* <!-- Region 1 Sweet 16 --> */}
		<ul className="matchup matchup-49">
			<li className="team team-top winner"></li>
			<li className="team team-bottom"></li>
		</ul>
		<ul className="matchup matchup-50">
			<li className="team team-top winner"></li>
			<li className="team team-bottom"></li>
		</ul>
	{/* <!-- End Region 1 Sweet 16 --> */}
	
	{/* <!-- Region 1 Final --> */}
		<ul className="matchup matchup-57">
			<li className="team team-top"></li>
			<li className="team team-bottom winner"></li>
		</ul>
		
	</div>
	<div className="region-2 region">
		{/* <!-- Region 2 Round 1 --> */}
		<ul className="matchup matchup-9">
			<li className="team team-top winner">1 North Carolina (27-7)</li>
			<li className="team team-bottom"></li>
		</ul>
	
		<ul className="matchup matchup-10">
			<li className="team team-top">8 Mississippi St. (21-13)</li>
			<li className="team team-bottom winner">9 Michigan St. (19-14)</li>
		</ul>

		<ul className="matchup matchup-11">
			<li className="team team-top winner">5 Saint Mary's (26-7)</li>
			<li className="team team-bottom">12 Grand Canyon (29-4)</li>
		</ul>

		<ul className="matchup matchup-12">
			<li className="team team-top winner">4 Alabama (21-11)</li>
			<li className="team team-bottom">13 Charleston (27-7)</li>
		</ul>

		<ul className="matchup matchup-13">
			<li className="team team-top winner">6 Clemson (21-11)</li>
			<li className="team team-bottom">11 New Mexico (26-9)</li>
		</ul>

		<ul className="matchup matchup-14">
			<li className="team team-top winner">3 Baylor (23-10)</li>
			<li className="team team-bottom">14 Colgate (25-9)</li>
		</ul>

		<ul className="matchup matchup-15">
			<li className="team team-top winner">7 Dayton (24-7)</li>
			<li className="team team-bottom">10 Nevada (26-7)</li>
		</ul>

		<ul className="matchup matchup-16">
			<li className="team team-top winner">2 Arizona (25-8)</li>
			<li className="team team-bottom">15 Long Beach St. (21-14)</li>
		</ul>
		{/* <!-- End Region 2 Round 1 --> */}
		
		{/* <!-- Region 2 Round 2 --> */}
		<ul className="matchup matchup-37">
			<li className="team team-top"></li>
			<li className="team team-bottom winner"></li>
		</ul>

		<ul className="matchup matchup-38">
			<li className="team team-top"></li>
			<li className="team team-bottom winner"></li>
		</ul>

		<ul className="matchup matchup-39">
			<li className="team team-top"></li>
			<li className="team team-bottom winner"></li>
		</ul>

		<ul className="matchup matchup-40">
			<li className="team team-top winner"></li>
			<li className="team team-bottom"></li>
		</ul>
		{/* <!-- End Region 2 Round 2 --> */}
		
		{/* <!-- Region 2 Sweet 16 --> */}
		<ul className="matchup matchup-51">
			<li className="team team-top winner"></li>
			<li className="team team-bottom"></li>
		</ul>
		<ul className="matchup matchup-52">
			<li className="team team-top winner"></li>
			<li className="team team-bottom"></li>
		</ul>
		{/* <!-- End Region 2 Sweet 16 --> */}
		
		{/* <!-- Region 2 Final --> */}
		<ul className="matchup matchup-58">
			<li className="team team-top"></li>
			<li className="team team-bottom winner"></li>
		</ul>
		
	</div>
	<div className="region-3 region">
	
		{/* <!-- Region 3 Round 1 --> */}
		<ul className="matchup matchup-17">
			<li className="team team-top winner">1 Villanova</li>
			<li className="team team-bottom">16 Radford</li>
		</ul>

		<ul className="matchup matchup-18">
			<li className="team team-top">8 Virginia Tech</li>
			<li className="team team-bottom winner">9 Alabama</li>
		</ul>

		<ul className="matchup matchup-19">
			<li className="team team-top winner">5 West Virginia</li>
			<li className="team team-bottom">12 Murray State</li>
		</ul>

		<ul className="matchup matchup-20">
			<li className="team team-top">4 Wichita State</li>
			<li className="team team-bottom winner">13 Marshall</li>
		</ul>

		<ul className="matchup matchup-21">
			<li className="team team-top winner">6 Florida</li>
			<li className="team team-bottom">11 St. Bonaventure</li>
		</ul>

		<ul className="matchup matchup-22">
			<li className="team team-top winner">3 Texas Tech</li>
			<li className="team team-bottom">14 SF Austin</li>
		</ul>

		<ul className="matchup matchup-23">
			<li className="team team-top">7 Arkansas</li>
			<li className="team team-bottom winner">10 Butler</li>
		</ul>

		<ul className="matchup matchup-24">
			<li className="team team-top winner">2 Purdue</li>
			<li className="team team-bottom">15 CSU Fullerton</li>
		</ul>
		{/* <!-- End Region 3 Round 1 --> */}
		
		{/* <!-- Region 3 Round 2 --> */}
		<ul className="matchup matchup-41">
			<li className="team team-top winner">1 Villanova</li>
			<li className="team team-bottom">9 Alabama</li>
		</ul>

		<ul className="matchup matchup-42">
			<li className="team team-top winner">5 West Virginia</li>
			<li className="team team-bottom">13 Marshall</li>
		</ul>

		<ul className="matchup matchup-43">
			<li className="team team-top">6 Florida</li>
			<li className="team team-bottom winner">3 Texas Tech</li>
		</ul>

		<ul className="matchup matchup-44">
			<li className="team team-top">10 Butler</li>
			<li className="team team-bottom winner">2 Purdue</li>
		</ul>
		{/* <!-- End Region 3 Round 2 -->
		<!-- Region 3 Sweet 16 --> */}
		<ul className="matchup matchup-53">
			<li className="team team-top winner">1 Villanova</li>
			<li className="team team-bottom">5 West Virginia</li>
		</ul>
		<ul className="matchup matchup-54">
			<li className="team team-top winner">3 Texas Tech</li>
			<li className="team team-bottom">2 Purdue</li>
		</ul>
		{/* <!-- Region 3 Final --> */}
		<ul className="matchup matchup-59">
			<li className="team team-top winner">1 Villanova</li>
			<li className="team team-bottom">3 Texas Tech</li>
		</ul>
	</div>
	
	<div className="region-4 region">
		{/* <!-- Region 4 Round 1 --> */}
		<ul className="matchup matchup-25">
			<li className="team team-top winner">1 Kansas</li>
			<li className="team team-bottom">16 Penn</li>
		</ul>

		<ul className="matchup matchup-26">
			<li className="team team-top winner">8 Seton Hall</li>
			<li className="team team-bottom">9 NC State</li>
		</ul>

		<ul className="matchup matchup-27">
			<li className="team team-top winner">5 Clemson</li>
			<li className="team team-bottom">12 Nex Mexico State</li>
		</ul>

		<ul className="matchup matchup-28">
			<li className="team team-top winner">4 Auburn</li>
			<li className="team team-bottom">13 Charleston</li>
		</ul>

		<ul className="matchup matchup-29">
			<li className="team team-top">6 TCU</li>
			<li className="team team-bottom winner">11 Syracuse</li>
		</ul>

		<ul className="matchup matchup-30">
			<li className="team team-top winner">3 Michigan State</li>
			<li className="team team-bottom">14 Bucknell</li>
		</ul>

		<ul className="matchup matchup-31">
			<li className="team team-top winner">7 Rhode Island</li>
			<li className="team team-bottom">10 Oklahoma</li>
		</ul>

		<ul className="matchup matchup-32">
			<li className="team team-top winner">2 Duke</li>
			<li className="team team-bottom">15 Iona</li>
		</ul>
		{/* <!-- End Region 4 Round 1 -->
		
		<!-- Region 4 Round 2 --> */}
		<ul className="matchup matchup-45">
			<li className="team team-top winner">1 Kansas</li>
			<li className="team team-bottom">8 Seton Hall</li>
		</ul>

		<ul className="matchup matchup-46">
			<li className="team team-top winner">5 Clemson</li>
			<li className="team team-bottom">4 Auburn</li>
		</ul>

		<ul className="matchup matchup-47">
			<li className="team team-top winner">11 Syracuse</li>
			<li className="team team-bottom">3 Michigan State</li>
		</ul>

		<ul className="matchup matchup-48">
			<li className="team team-top">7 Rhode Island</li>
			<li className="team team-bottom winner">2 Duke</li>
		</ul>
		{/* <!-- End Region 4 Round 2 -->
		<!-- Region 4 Sweet 16 --> */}
		<ul className="matchup matchup-55">
			<li className="team team-top winner">1 Kansas</li>
			<li className="team team-bottom">5 Clemson</li>
		</ul>
		<ul className="matchup matchup-56">
			<li className="team team-top">11 Syracuse</li>
			<li className="team team-bottom winner">2 Duke</li>
		</ul>
		{/* <!-- End Region 4 Sweet 16 -->
		<!-- Region 4 Final --> */}
		<ul className="matchup matchup-60">
			<li className="team team-top winner">1 Kansas</li>
			<li className="team team-bottom">2 Duke</li>
		</ul>
	</div>
	<div className="final-four">
		{/* <!-- Final Four Game 1--> */}
		<ul className="matchup matchup-61">
			<li className="team team-top">11 Loyola-Chicago</li>
			<li className="team team-bottom winner">3 Michigan</li>
		</ul>
		{/* <!-- Final Four Game 2--> */}
		<ul className="matchup matchup-62">
			<li className="team team-top winner">1 Villanova</li>
			<li className="team team-bottom ">1 Kansas</li>
		</ul>

		<ul className="matchup championship">
			<li className="team team-top">3 Michigan</li>
			<li className="team team-bottom winner">1 Villanova</li>
		</ul>
	</div>
</div>
      </>
    );
};

export default TournamentBracket;
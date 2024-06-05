import React, { useState,  ChangeEvent, FormEvent } from 'react';
import './tournament-bracket.css';

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
	{/* <!-- Region 1 Round 1--> */}
		<ul className="matchup matchup-1">
			<li className="team team-top">1 Virginia</li>
			<li className="team team-bottom winner">16 UMBC</li>
		</ul>

		<ul className="matchup matchup-2">
			<li className="team team-top">8 Creighton</li>
			<li className="team team-bottom winner">9 Kansas State</li>
		</ul>

		<ul className="matchup matchup-3">
			<li className="team team-top winner">5 Kentucky</li>
			<li className="team team-bottom">12 Davidson</li>
		</ul>

		<ul className="matchup matchup-4">
			<li className="team team-top">4 Arizona</li>
			<li className="team team-bottom winner">13 Buffalo</li>
		</ul>

		<ul className="matchup matchup-5">
			<li className="team team-top">6 Miami</li>
			<li className="team team-bottom winner">11 Loyala-Chicago</li>
		</ul>

		<ul className="matchup matchup-6">
			<li className="team team-top winner">3 Tennessee</li>
			<li className="team team-bottom">14 Wright State</li>
		</ul>

		<ul className="matchup matchup-7">
			<li className="team team-top winner">7 Nevada</li>
			<li className="team team-bottom">10 Texas</li>
		</ul>

		<ul className="matchup matchup-8">
			<li className="team team-top winner">2 Cinncinati</li>
			<li className="team team-bottom">15 Georgia State</li>
		</ul>
	
	{/* <!-- Region 1 Round 2 --> */}
		<ul className="matchup matchup-33">
			<li className="team team-top">16 UMBC</li>
			<li className="team team-bottom winner">9 Kansas State</li>
		</ul>
	
		<ul className="matchup matchup-34">
			<li className="team team-top winner">5 Kentucky</li>
			<li className="team team-bottom">13 Buffalo</li>
		</ul>
	
		<ul className="matchup matchup-35">
			<li className="team team-top winner">11 Loyala-Chicago</li>
			<li className="team team-bottom">3 Tennessee</li>
		</ul>
	
		<ul className="matchup matchup-36">
			<li className="team team-top winner">7 Nevada</li>
			<li className="team team-bottom">2 Cincinnati</li>
		</ul>
	
	{/* <!-- Region 1 Sweet 16 --> */}
		<ul className="matchup matchup-49">
			<li className="team team-top winner">9 Kansas State</li>
			<li className="team team-bottom">5 Kentucky</li>
		</ul>
		<ul className="matchup matchup-50">
			<li className="team team-top winner">11 Loyola-Chicago</li>
			<li className="team team-bottom">7 Nevada</li>
		</ul>
	{/* <!-- End Region 1 Sweet 16 --> */}
	
	{/* <!-- Region 1 Final --> */}
		<ul className="matchup matchup-57">
			<li className="team team-top">9 Kansas State</li>
			<li className="team team-bottom winner">11 Loyola-Chicago</li>
		</ul>
		
	</div>
	<div className="region-2 region">
		{/* <!-- Region 2 Round 1 --> */}
		<ul className="matchup matchup-9">
			<li className="team team-top winner">1 Xavier</li>
			<li className="team team-bottom">16 Texas Southern</li>
		</ul>
	
		<ul className="matchup matchup-10">
			<li className="team team-top">8 Missouri</li>
			<li className="team team-bottom winner">9 Florida State</li>
		</ul>

		<ul className="matchup matchup-11">
			<li className="team team-top winner">5 Ohio State</li>
			<li className="team team-bottom">12 South Dakota St</li>
		</ul>

		<ul className="matchup matchup-12">
			<li className="team team-top winner">4 Gonzaga</li>
			<li className="team team-bottom">13 UNC-Greensboro</li>
		</ul>

		<ul className="matchup matchup-13">
			<li className="team team-top winner">6 Houston</li>
			<li className="team team-bottom">11 San Diego State</li>
		</ul>

		<ul className="matchup matchup-14">
			<li className="team team-top winner">3 Michigan</li>
			<li className="team team-bottom">14 Montana</li>
		</ul>

		<ul className="matchup matchup-15">
			<li className="team team-top winner">7 Texas A&M</li>
			<li className="team team-bottom">10 Providence</li>
		</ul>

		<ul className="matchup matchup-16">
			<li className="team team-top winner">2 North Carolina</li>
			<li className="team team-bottom">15 Lipscomb</li>
		</ul>
		{/* <!-- End Region 2 Round 1 --> */}
		
		{/* <!-- Region 2 Round 2 --> */}
		<ul className="matchup matchup-37">
			<li className="team team-top">1 Xavier</li>
			<li className="team team-bottom winner">9 Florida State</li>
		</ul>

		<ul className="matchup matchup-38">
			<li className="team team-top">5 Ohio State</li>
			<li className="team team-bottom winner">4 Gonzaga</li>
		</ul>

		<ul className="matchup matchup-39">
			<li className="team team-top">6 Houston</li>
			<li className="team team-bottom winner">3 Michigan</li>
		</ul>

		<ul className="matchup matchup-40">
			<li className="team team-top winner">7 Texas A&M</li>
			<li className="team team-bottom">2 North Carolina</li>
		</ul>
		{/* <!-- End Region 2 Round 2 --> */}
		
		{/* <!-- Region 2 Sweet 16 --> */}
		<ul className="matchup matchup-51">
			<li className="team team-top winner">9 Florida State</li>
			<li className="team team-bottom">4 Gonzaga</li>
		</ul>
		<ul className="matchup matchup-52">
			<li className="team team-top winner">3 Michigan</li>
			<li className="team team-bottom">7 Texas A&M</li>
		</ul>
		{/* <!-- End Region 2 Sweet 16 --> */}
		
		{/* <!-- Region 2 Final --> */}
		<ul className="matchup matchup-58">
			<li className="team team-top">9 Florida State</li>
			<li className="team team-bottom winner">3 Michigan</li>
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
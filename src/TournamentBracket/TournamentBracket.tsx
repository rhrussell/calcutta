import React, { useState, ChangeEvent, FormEvent } from "react";
import "./tournament-bracket.css";

function TournamentBracket() {
  return (
    <>
      <header>
        <ol>
          <li>
            Round 1 <br />
            <span>Mar 15/16</span>
          </li>
          <li>
            Round 2 <br />
            <span>Mar 17/18</span>
          </li>
          <li>
            Sweet 16 <br />
            <span>Mar 22/23</span>
          </li>
          <li>
            Elite 8 <br />
            <span>Mar 24/25</span>
          </li>
          <li>
            Final 4 <br />
            <span>Mar 31/Apr 2</span>
          </li>
          <li>
            Elite 8 <br />
            <span>Mar 24/25</span>
          </li>
          <li>
            Sweet 16
            <br />
            <span>Mar 22/23</span>
          </li>
          <li>
            Round 2 <br />
            <span>Mar 17/18</span>
          </li>
          <li>
            Round 1 <br />
            <span>Mar 15/16</span>
          </li>
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
            <li className="team team-top">
              <strong>1</strong> UConn (31-3)
            </li>
            <li className="team team-bottom winner">
              <strong>16</strong> Stetson (22-12)
            </li>
          </ul>

          <ul className="matchup matchup-2">
            <li className="team team-top">
              <strong>8</strong> Florida Atlantic (25-8)
            </li>
            <li className="team team-bottom winner">
              <strong>9</strong> Northwestern (21-11)
            </li>
          </ul>

          <ul className="matchup matchup-3">
            <li className="team team-top winner">
              <strong>5</strong> San Diego (24-10)
            </li>
            <li className="team team-bottom">
              <strong>12</strong> UAB (23-11)
            </li>
          </ul>

          <ul className="matchup matchup-4">
            <li className="team team-top">
              <strong>4</strong> Auburn (27-7)
            </li>
            <li className="team team-bottom winner">
              <strong>13</strong> Yale (22-9)
            </li>
          </ul>

          <ul className="matchup matchup-5">
            <li className="team team-top">
              <strong>6</strong> BYU (23-10)
            </li>
            <li className="team team-bottom winner">
              <strong>11</strong> Duquesne (24-11)
            </li>
          </ul>

          <ul className="matchup matchup-6">
            <li className="team team-top winner">
              <strong>3</strong> Illinois (26-8)
            </li>
            <li className="team team-bottom">
              <strong>14</strong> Morehead St. (26-8)
            </li>
          </ul>

          <ul className="matchup matchup-7">
            <li className="team team-top winner">
              <strong>7</strong> Washington St. (24-9)
            </li>
            <li className="team team-bottom">
              <strong>10</strong> Drake (28-6)
            </li>
          </ul>

          <ul className="matchup matchup-8">
            <li className="team team-top winner">
              <strong>2</strong> Iowa St. (27-7)
            </li>
            <li className="team team-bottom">
              <strong>15</strong> S. Dakota St. (22-12)
            </li>
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
            <li className="team team-top winner">
              <strong>1</strong> North Carolina (27-7)
            </li>
            <li className="team team-bottom"></li>
          </ul>

          <ul className="matchup matchup-10">
            <li className="team team-top">
              <strong>8</strong> Mississippi St. (21-13)
            </li>
            <li className="team team-bottom winner">
              <strong>9</strong> Michigan St. (19-14)
            </li>
          </ul>

          <ul className="matchup matchup-11">
            <li className="team team-top winner">
              <strong>5</strong> Saint Mary's (26-7)
            </li>
            <li className="team team-bottom">
              <strong>12</strong> Grand Canyon (29-4)
            </li>
          </ul>

          <ul className="matchup matchup-12">
            <li className="team team-top winner">
              <strong>4</strong> Alabama (21-11)
            </li>
            <li className="team team-bottom">
              <strong>13</strong> Charleston (27-7)
            </li>
          </ul>

          <ul className="matchup matchup-13">
            <li className="team team-top winner">
              <strong>6</strong> Clemson (21-11)
            </li>
            <li className="team team-bottom">
              <strong>11</strong> New Mexico (26-9)
            </li>
          </ul>

          <ul className="matchup matchup-14">
            <li className="team team-top winner">
              <strong>3</strong> Baylor (23-10)
            </li>
            <li className="team team-bottom">
              <strong>14</strong> Colgate (25-9)
            </li>
          </ul>

          <ul className="matchup matchup-15">
            <li className="team team-top winner">
              <strong>7</strong> Dayton (24-7)
            </li>
            <li className="team team-bottom">
              <strong>10</strong> Nevada (26-7)
            </li>
          </ul>

          <ul className="matchup matchup-16">
            <li className="team team-top winner">
              <strong>2</strong> Arizona (25-8)
            </li>
            <li className="team team-bottom">
              <strong>15</strong> Long Beach St. (21-14)
            </li>
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
            <li className="team team-top winner">
              Houston (30-4) <strong>1</strong>
            </li>
            <li className="team team-bottom">
              Longwood (21-13) <strong>16</strong>
            </li>
          </ul>

          <ul className="matchup matchup-18">
            <li className="team team-top">
              Nebraska (23-10) <strong>8</strong>
            </li>
            <li className="team team-bottom winner">
              Texas A&M (20-14) <strong>9</strong>
            </li>
          </ul>

          <ul className="matchup matchup-19">
            <li className="team team-top winner">
              Wisconsin (22-13) <strong>5</strong>
            </li>
            <li className="team team-bottom">
              James Madison (31-3) <strong>12</strong>
            </li>
          </ul>

          <ul className="matchup matchup-20">
            <li className="team team-top">
              Duke (24-8) <strong>4</strong>
            </li>
            <li className="team team-bottom winner">
              Vermont (28-6) <strong>13</strong>
            </li>
          </ul>

          <ul className="matchup matchup-21">
            <li className="team team-top winner">
              Texas Tech (23-10) <strong>6</strong>
            </li>
            <li className="team team-bottom">
              NC State (22-14) <strong>11</strong>
            </li>
          </ul>

          <ul className="matchup matchup-22">
            <li className="team team-top winner">
              Kentucky (23-9) <strong>3</strong>
            </li>
            <li className="team team-bottom">
              Oakland (23-11) <strong>14</strong>
            </li>
          </ul>

          <ul className="matchup matchup-23">
            <li className="team team-top">
              Florida (24-11) <strong>7</strong>
            </li>
            <li className="team team-bottom winner"></li>
          </ul>

          <ul className="matchup matchup-24">
            <li className="team team-top winner">
              Marquette (25-9) <strong>2</strong>
            </li>
            <li className="team team-bottom">
              Western Ky. (22-11) <strong>15</strong>
            </li>
          </ul>
          {/* <!-- End Region 3 Round 1 --> */}

          {/* <!-- Region 3 Round 2 --> */}
          <ul className="matchup matchup-41">
            <li className="team team-top winner"></li>
            <li className="team team-bottom"></li>
          </ul>

          <ul className="matchup matchup-42">
            <li className="team team-top winner"></li>
            <li className="team team-bottom"></li>
          </ul>

          <ul className="matchup matchup-43">
            <li className="team team-top"></li>
            <li className="team team-bottom winner"></li>
          </ul>

          <ul className="matchup matchup-44">
            <li className="team team-top"></li>
            <li className="team team-bottom winner"></li>
          </ul>
          {/* <!-- End Region 3 Round 2 -->
		<!-- Region 3 Sweet 16 --> */}
          <ul className="matchup matchup-53">
            <li className="team team-top winner"></li>
            <li className="team team-bottom"></li>
          </ul>
          <ul className="matchup matchup-54">
            <li className="team team-top winner"></li>
            <li className="team team-bottom"></li>
          </ul>
          {/* <!-- Region 3 Final --> */}
          <ul className="matchup matchup-59">
            <li className="team team-top winner"></li>
            <li className="team team-bottom"></li>
          </ul>
        </div>

        <div className="region-4 region">
          {/* <!-- Region 4 Round 1 --> */}
          <ul className="matchup matchup-25">
            <li className="team team-top winner">
              Purdue (29-4) <strong>1</strong>
            </li>
            <li className="team team-bottom"></li>
          </ul>

          <ul className="matchup matchup-26">
            <li className="team team-top winner">
              Utah St. (27-6) <strong>8</strong>
            </li>
            <li className="team team-bottom">
              TCU (21-12) <strong>9</strong>
            </li>
          </ul>

          <ul className="matchup matchup-27">
            <li className="team team-top winner">
              Gonzaga (25-7) <strong>5</strong>
            </li>
            <li className="team team-bottom">
              McNeese (30-3) <strong>12</strong>
            </li>
          </ul>

          <ul className="matchup matchup-28">
            <li className="team team-top winner">
              Kansas (22-10) <strong>4</strong>
            </li>
            <li className="team team-bottom">
              Samford (29-5) <strong>13</strong>
            </li>
          </ul>

          <ul className="matchup matchup-29">
            <li className="team team-top">
              South Carolina (26-7) <strong>6</strong>
            </li>
            <li className="team team-bottom winner">
              Oregon (23-11) <strong>11</strong>
            </li>
          </ul>

          <ul className="matchup matchup-30">
            <li className="team team-top winner">
              Creighton (23-9) <strong>3</strong>
            </li>
            <li className="team team-bottom">
              Akron (24-10) <strong>14</strong>
            </li>
          </ul>

          <ul className="matchup matchup-31">
            <li className="team team-top winner">
              Texas (20-12) <strong>7</strong>
            </li>
            <li className="team team-bottom"></li>
          </ul>

          <ul className="matchup matchup-32">
            <li className="team team-top winner">
              Tennessee (24-8) <strong>2</strong>
            </li>
            <li className="team team-bottom">
              Saint Peter's (19-13) <strong>15</strong>
            </li>
          </ul>
          {/* <!-- End Region 4 Round 1 -->
		
		<!-- Region 4 Round 2 --> */}
          <ul className="matchup matchup-45">
            <li className="team team-top winner"></li>
            <li className="team team-bottom"></li>
          </ul>

          <ul className="matchup matchup-46">
            <li className="team team-top winner"></li>
            <li className="team team-bottom"></li>
          </ul>

          <ul className="matchup matchup-47">
            <li className="team team-top winner"></li>
            <li className="team team-bottom"></li>
          </ul>

          <ul className="matchup matchup-48">
            <li className="team team-top"></li>
            <li className="team team-bottom winner"></li>
          </ul>
          {/* <!-- End Region 4 Round 2 -->
		<!-- Region 4 Sweet 16 --> */}
          <ul className="matchup matchup-55">
            <li className="team team-top winner"></li>
            <li className="team team-bottom"></li>
          </ul>
          <ul className="matchup matchup-56">
            <li className="team team-top"></li>
            <li className="team team-bottom winner"></li>
          </ul>
          {/* <!-- End Region 4 Sweet 16 -->
		<!-- Region 4 Final --> */}
          <ul className="matchup matchup-60">
            <li className="team team-top winner"></li>
            <li className="team team-bottom"></li>
          </ul>
        </div>
        <div className="final-four">
          {/* <!-- Final Four Game 1--> */}
          <ul className="matchup matchup-61">
            <li className="team team-top"></li>
            <li className="team team-bottom winner"></li>
          </ul>
          {/* <!-- Final Four Game 2--> */}
          <ul className="matchup matchup-62">
            <li className="team team-top winner"></li>
            <li className="team team-bottom "></li>
          </ul>

          <ul className="matchup championship">
            <li className="team team-top"></li>
            <li className="team team-bottom winner"></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default TournamentBracket;

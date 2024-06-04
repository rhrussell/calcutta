import React, { useState,  ChangeEvent, FormEvent } from 'react';
import './tournament-bracket.css';

function TournamentBracket() {
    return (
        <>
        <h1>Tournament Bracket</h1>
        <div className="tournament-bracket br-2">
          <section aria-labelledby="round-1">
            <h2 id="round-1">Round 1</h2>
            <ol>
              <li>
                <a href="#">Player 1</a>
                <a href="#">Player 2</a>
                <span>Date: 01.01. 1pm</span>
              </li>
              <li>
                <div>
                  <a href="#">Player 3</a>
                  <a href="#">Player 4</a>
                  <span>Date: 01.01. 1.30pm</span>
                </div>
              </li>
              <li>
                <div>
                  <a href="#">Player 5</a>
                  <a href="#">Player 6</a>
                  <span>Date: 01.01. 2pm</span>
                </div>
              </li>
              <li>
                <div>
                  <a href="#">Player 7</a>
                  <a href="#">Player 8</a>
                  <span>Date: 01.01. 2.30pm</span>
                </div>
              </li>
              <li>
                <div>
                  <a href="#">Player 9</a>
                  <a href="#">Player 10</a>
                  <span>Date: 01.01. 3pm</span>
                </div>
              </li>
              <li>
                <div>
                  <a href="#">Player 11</a>
                  <a href="#">Player 12</a>
                  <span>Date: 01.01. 3.30pm</span>
                </div>
              </li>
              <li>
                <div>
                  <a href="#">Player 13</a>
                  <a href="#">Player 14</a>
                  <span>Date: 01.01. 4pm</span>
                </div>
              </li>
              <li>
                <div>
                  <a href="#">Player 15</a>
                  <a href="#">Player 16</a>
                  <span>Date: 01.01. 4.30pm</span>
                </div>
              </li>
            </ol>
        </section>
        <section aria-labelledby="round-2">
            <h2 id="round-2">Round 2</h2>
            <ol>
              <li>
                <div>
                  <a href="#">Player 1</a>
                  <a href="#">Player 3</a>
                  <span>Date: 05.01. 1pm</span>
                </div>
              </li>
              <li>
                <div>
                  <a href="#">Player 5</a>
                  <a href="#">Player 7</a>
                  <span>Date: 05.01. 1.30pm</span>
                </div>
              </li>
              <li>
                <div>
                  <a href="#">Player 9</a>
                  <a href="#">Player 11</a>
                  <span>Date: 05.01. 2pm</span>
                </div>
              </li>
              <li>
                <div>
                  <a href="#">Player 13</a>
                  <a href="#">Player 15</a>
                  <span>Date: 05.01. 2.30pm</span>
                </div>
              </li>
            </ol>
        </section>
        <section aria-labelledby="round-3">
          <h2 id="round-3">Round 3</h2>
          <ol>
            <li>
              <div>
                <a href="#">Player 1</a>
                <a href="#">Player 5</a>
                <span>Date: 07.01. 1pm</span>
              </div>
            </li>
            <li>
              <div>
                <a href="#">Player 9</a>
                <a href="#">Player 13</a>
                <span>Date: 07.01. 1.30pm</span>
              </div>
            </li>
          </ol>
        </section>
        <section aria-labelledby="round-4">
          <h2 id="round-4">Round 4</h2>
          <ol>
            <li>
              <div>
                <a href="#">Player 1</a>
                <a href="#">Player 9</a>
                <span>Date: 10.01. 1pm</span>
              </div>
            </li>
          </ol>
        </section>
        <section aria-labelledby="winner">
          <h2 id="winner">Winner</h2>
          <ol>
            <li>
              <div>
                <a href="#">Player 1</a>
              </div>
            </li>
          </ol>
        </section>
      </div>
      </>
    );
};

export default TournamentBracket;
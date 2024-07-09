import { Request, Response } from "express";
import pool from "../config/db";

interface PlayerRow {
  name: string;
}

interface TeamRow {
  name: string;
}

// Create a new league
export const createLeague = async (req: Request, res: Response) => {
  try {
    const { league, squads } = req.body;

    // Insert league information into the database
    const leagueResult = await pool.query(
      `INSERT INTO leagues (name, minutesPerItem, salaryCapacity, numberOfPlayers, numberOfPlayersPerSquad) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [
        league.name,
        league.minutesPerItem,
        league.salaryCapacity,
        league.numberOfPlayers,
        league.numberOfPlayersPerSquad,
      ],
    );

    const leagueId = leagueResult.rows[0].id;

    // Insert squads into the database
    for (const squad of squads) {
      const squadResult = await pool.query(
        `INSERT INTO squads (leagueId, name, salaryCapacity, password) 
         VALUES ($1, $2, $3, $4) RETURNING id`,
        [leagueId, squad.name, league.salaryCapacity, squad.password],
      );

      const squadId = squadResult.rows[0].id;

      // Insert players into the database
      for (const player of squad.players) {
        const playerResult = await pool.query(
          `INSERT INTO players (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id`,
          [player],
        );

        const playerId = playerResult.rows[0]?.id;

        if (playerId) {
          await pool.query(
            `INSERT INTO squad_players (squadId, playerId) VALUES ($1, $2)`,
            [squadId, playerId],
          );
        }

        // Insert teams into the database
        for (const team of squad.teams) {
          await pool.query(
            `INSERT INTO teams (squadId, name) VALUES ($1, $2)`,
            [squadId, team.name],
          );
        }
      }
    }

    res.status(201).json({ message: "League created successfully", leagueId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create league" });
  }
};

export const getLeagueById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leagueResult = await pool.query(
      "SELECT * FROM leagues WHERE id = $1",
      [id],
    );
    const squadsResult = await pool.query(
      "SELECT * FROM squads WHERE leagueId = $1",
      [id],
    );

    if (leagueResult.rows.length === 0) {
      return res.status(404).json({ message: "League not found" });
    }

    const league = leagueResult.rows[0];
    const squads = squadsResult.rows;

    // Fetch players for each squad
    for (const squad of squads) {
      const playersResult = await pool.query(
        "SELECT p.name FROM players p JOIN squad_players sp ON p.id = sp.playerId WHERE sp.squadId = $1",
        [squad.id],
      );
      squad.players = playersResult.rows.map((row: PlayerRow) => row.name);

      // Fetch teams for each squad
      const teamsResult = await pool.query(
        "SELECT name FROM teams WHERE squadId = $1",
        [squad.id],
      );
      squad.teams = teamsResult.rows.map((row: TeamRow) => ({
        name: row.name,
      }));
    }

    league.squads = squads;

    res.status(200).json(league);
  } catch (error) {
    console.error("Error fetching league:", error);
    res.status(500).json({ message: "Failed to get league" });
  }
};

// Finalize auction results
export const finalizeAuction = async (req: Request, res: Response) => {
  try {
    // Your implementation here
    res.status(200).json({ message: "Auction results finalized successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to finalize auction" });
  }
};

// import { createLeague, updateLeague, getLeagueById } from '../models/leagueModel';
// import { createSquad, updateSquad } from '../models/squadModel';

// export const createLeagueController = async (req: Request, res: Response) => {
//     const league = req.body;
//     try {
//         const leagueId = await createLeague(league);

//         for (const squad of league.squadObjects) {
//             await createSquad({ ...squad, leagueId });
//         }

//         res.status(201).json({ message: 'League and squads created successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while creating the league' });
//     }
// };

// export const finalizeResultsController = async (req: Request, res: Response) => {
//     const { leagueId, squads } = req.body;
//     try {
//         for (const squad of squads) {
//             await updateSquad(squad.id, squad);
//         }
//         await updateLeague(leagueId, { squadObjects: squads });
//         res.status(200).json({ message: 'Results finalized successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while finalizing the results' });
//     }
// };

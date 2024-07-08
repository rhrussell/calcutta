import { Request, Response } from 'express';
import pool from '../config/db';

// Create a new league
export const createLeague = async (req: Request, res: Response) => {
  try {
    const { name, minutesPerItem, salaryCapacity, numberOfPlayers, numberOfPlayersPerSquad, squads } = req.body;

    // Insert league information into the database
    const result = await pool.query(
      `INSERT INTO leagues (name, minutes_per_item, salary_capacity, number_of_players, number_of_players_per_squad) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [name, minutesPerItem, salaryCapacity, numberOfPlayers, numberOfPlayersPerSquad]
    );

    const leagueId = result.rows[0].id;

    // Insert squads into the database
    for (const squad of squads) {
      await pool.query(
        `INSERT INTO squads (league_id, name, salary_capacity, password) 
         VALUES ($1, $2, $3, $4)`,
        [leagueId, squad.name, squad.salaryCapacity, squad.password]
      );
    }

    res.status(201).json({ message: 'League created successfully', leagueId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create league' });
  }
};

// Finalize auction results
export const finalizeAuction = async (req: Request, res: Response) => {
  try {
    // Your implementation here
    res.status(200).json({ message: 'Auction results finalized successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to finalize auction' });
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

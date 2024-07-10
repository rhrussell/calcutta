import { Request, Response } from "express";
import pool from "../config/db";

export interface Team {
  id?: number;
  seed: number;
  name: string;
  record: string;
  region: string;
  opponent: string;
  price: number;
}

interface PlayerRow {
  name: string;
}

interface TeamRow {
  seed: number;
  name: string;
  record: string;
  region: string;
  opponent: string;
  price: number;
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

    // Insert squads into the squads table and associate them with the league
    const updatedSquads = [];
    for (const squad of squads) {
      const squadResult = await pool.query(
        `INSERT INTO squads (leagueId, name, salaryCapacity, password) 
         VALUES ($1, $2, $3, $4) RETURNING id`,
        [leagueId, squad.name, league.salaryCapacity, squad.password],
      );

      const squadId = squadResult.rows[0].id;
      updatedSquads.push({ ...squad, id: squadId });

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
      }

      // Insert teams into the database
      for (const team of squad.teams) {
        const teamResult = await pool.query(
          `INSERT INTO teams (seed, name, record, region, opponent, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
          [
            team.seed,
            team.name,
            team.record,
            team.region,
            team.opponent,
            team.price,
          ],
        );

        const teamId = teamResult.rows[0]?.id;

        if (teamId) {
          await pool.query(
            `INSERT INTO squad_teams (squadId, teamId) VALUES ($1, $2)`,
            [squadId, teamId],
          );
        }
      }
    }

    res.status(201).json({
      message: "League created successfully",
      id: leagueId,
      squads: updatedSquads,
    });
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
        "SELECT t.seed, t.name, t.record, t.region, t.opponent, t.price FROM teams t JOIN squad_teams st ON t.id = st.teamId WHERE st.squadId = $1",
        [squad.id],
      );
      squad.teams = teamsResult.rows.map((row: TeamRow) => ({
        seed: row.seed,
        name: row.name,
        record: row.record,
        region: row.region,
        opponent: row.opponent,
        price: row.price,
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
export const finalizeResults = async (req: Request, res: Response) => {
  try {
    const { leagueId, squads } = req.body;
    console.log("Request body:", req.body);

    // Fetch the league and squads
    const leagueResult = await pool.query(
      "SELECT * FROM leagues WHERE id = $1",
      [leagueId],
    );

    if (leagueResult.rows.length === 0) {
      return res.status(404).json({ message: "League not found" });
    }

    const league = leagueResult.rows[0];

    for (const squad of squads) {
      const squadId = squad.id;
      if (!squadId) {
        console.error(`Squad ID is missing for squad: ${squad.name}`);
        continue;
      }

      for (const team of squad.teams) {
        const teamResult = await pool.query(
          `INSERT INTO teams (seed, name, record, region, opponent, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
          [
            team.seed,
            team.name,
            team.record,
            team.region,
            team.opponent,
            team.price,
          ],
        );

        const teamId = teamResult.rows[0]?.id;

        if (teamId) {
          await pool.query(
            `INSERT INTO squad_teams (squadId, teamId) VALUES ($1, $2)`,
            [squadId, teamId],
          );
        }
      }

      const teamsResult = await pool.query(
        "SELECT t.seed, t.name, t.record, t.region, t.opponent, t.price FROM teams t JOIN squad_teams st ON t.id = st.teamId WHERE st.squadId = $1",
        [squadId], // Use squadId here instead of squad.id
      );

      squad.teams = teamsResult.rows.map((row: TeamRow) => ({
        seed: row.seed,
        name: row.name,
        record: row.record,
        region: row.region,
        opponent: row.opponent,
        price: row.price,
      }));

      // Ensure squad.salaryCap is a number
      if (typeof squad.salaryCap !== "number") {
        console.error(
          `Invalid salaryCap for squad ${squad.name}: ${squad.salaryCap}`,
        );
        continue;
      }

      // const totalSpent = squad.teams.reduce((total: number, team: Team) => {
      //   if (isNaN(team.price)) {
      //     console.error(`Invalid price for team ${team.name}: ${team.price}`);
      //   }
      //   return total + (team.price || 0);
      // }, 0);

      // if (isNaN(totalSpent)) {
      //   console.error(`Total spent is NaN for squad ${squad.name}`);
      // } else {
      //   squad.salaryCap -= totalSpent;
      // }

      await pool.query("UPDATE squads SET salaryCapacity = $1 WHERE id = $2", [
        squad.salaryCap,
        squadId,
      ]);
    }

    const squadsResult = await pool.query(
      "SELECT * FROM squads WHERE leagueId = $1",
      [leagueId],
    );

    const updatedSquads = squadsResult.rows;

    for (const squad of updatedSquads) {
      const playersResult = await pool.query(
        "SELECT p.name FROM players p JOIN squad_players sp ON p.id = sp.playerId WHERE sp.squadId = $1",
        [squad.id],
      );
      squad.players = playersResult.rows.map((row: PlayerRow) => row.name);

      const teamsResult = await pool.query(
        "SELECT t.seed, t.name, t.record, t.region, t.opponent, t.price FROM teams t JOIN squad_teams st ON t.id = st.teamId WHERE st.squadId = $1",
        [squad.id],
      );
      squad.teams = teamsResult.rows.map((row: TeamRow) => ({
        seed: row.seed,
        name: row.name,
        record: row.record,
        region: row.region,
        opponent: row.opponent,
        price: row.price,
      }));
    }

    league.squads = updatedSquads;

    res.status(200).json(league);
  } catch (error) {
    console.error("Error finalizing auction:", error);
    res.status(500).json({ message: "Failed to finalize auction" });
  }
};

// import pool from "../config/db";
// import { Team } from "./teamModel";

// export interface Squad {
//   id?: number;
//   leagueId: number;
//   name: string;
//   salaryCapacity: number;
//   password: string;
//   players: string[];
//   teams?: Team[]; // Define this type based on your actual data
// }

// // Function to create a new squad
// export const createSquad = async (squad: Squad) => {
//   const { leagueId, name, salaryCapacity, password, players, teams } = squad;
//   await pool.query(
//     `INSERT INTO squads (leagueId, name, salaryCapacity, password, name, players, teams,)
//         VALUES ($1, $2, $3, $4, $5, $6)`,
//     [
//       leagueId,
//       name,
//       salaryCapacity,
//       password,
//       JSON.stringify(players),
//       JSON.stringify(teams),
//     ],
//   );
// };

// // Function to update an existing squad
// export const updateSquad = async (id: number, updates: Partial<Squad>) => {
//   const fields = Object.keys(updates).map(
//     (key, index) => `${key} = $${index + 1}`,
//   );
//   const values = Object.values(updates);
//   const query = `UPDATE squads SET ${fields.join(", ")} WHERE id = $${fields.length + 1}`;
//   await pool.query(query, [...values, id]);
// };

// // Function to get a squad by ID
// export const getSquadById = async (id: number): Promise<Squad | null> => {
//   const result = await pool.query(`SELECT * FROM squads WHERE id = $1`, [id]);
//   return result.rows[0] || null;
// };

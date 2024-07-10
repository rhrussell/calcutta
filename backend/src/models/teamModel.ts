// import pool from '../config/db';

// export interface Team {
//     id: number;
//     seed: number;
//     name: string;
//     record: string;
//     region: string;
//     opponent: string;
//     price: number;
// }

// // Function to create a new team
// export const createTeam = async (team: Team) => {
//     const { squadId, name } = team;
//     await pool.query(
//         `INSERT INTO teams (squad_id, name)
//         VALUES ($1, $2)`,
//         [squadId, name]
//     );
// };

// // Function to update an existing team
// export const updateTeam = async (id: number, updates: Partial<Team>) => {
//     const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`);
//     const values = Object.values(updates);
//     const query = `UPDATE teams SET ${fields.join(', ')} WHERE id = $${fields.length + 1}`;
//     await pool.query(query, [...values, id]);
// };

// // Function to get a team by ID
// export const getTeamById = async (id: number): Promise<Team | null> => {
//     const result = await pool.query(
//         `SELECT * FROM teams WHERE id = $1`,
//         [id]
//     );
//     return result.rows[0] || null;
// };

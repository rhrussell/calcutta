import pool from '../config/db';

export interface Squad {
    id?: number;
    leagueId: number;
    name: string;
    players: string[];
    teams: any[];  // Define this type based on your actual data
    salaryCapacity: number;
    password: string;
}

// Function to create a new squad
export const createSquad = async (squad: Squad) => {
    const { leagueId, name, players, teams, salaryCapacity, password } = squad;
    await pool.query(
        `INSERT INTO squads (league_id, name, players, teams, salary_capacity, password)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [leagueId, name, JSON.stringify(players), JSON.stringify(teams), salaryCapacity, password]
    );
};

// Function to update an existing squad
export const updateSquad = async (id: number, updates: Partial<Squad>) => {
    const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`);
    const values = Object.values(updates);
    const query = `UPDATE squads SET ${fields.join(', ')} WHERE id = $${fields.length + 1}`;
    await pool.query(query, [...values, id]);
};

// Function to get a squad by ID
export const getSquadById = async (id: number): Promise<Squad | null> => {
    const result = await pool.query(
        `SELECT * FROM squads WHERE id = $1`,
        [id]
    );
    return result.rows[0] || null;
};

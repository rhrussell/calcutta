import pool from '../config/db';

export interface League {
    id?: number;
    name: string;
    minutesPerItem: number;
    salaryCapacity: number;
    numberOfPlayers: number;
    numberOfPlayersPerSquad: number;
    squadObjects: any[];  // Define this type based on your actual data
}

// Function to create a new league
export const createLeague = async (league: League): Promise<number> => {
    const { name, minutesPerItem, salaryCapacity, numberOfPlayers, numberOfPlayersPerSquad, squadObjects } = league;
    const result = await pool.query(
        `INSERT INTO leagues (name, minutes_per_item, salary_capacity, number_of_players, number_of_players_per_squad, squad_objects)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [name, minutesPerItem, salaryCapacity, numberOfPlayers, numberOfPlayersPerSquad, JSON.stringify(squadObjects)]
    );
    return result.rows[0].id;
};

// Function to update an existing league
export const updateLeague = async (id: number, updates: Partial<League>) => {
    const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`);
    const values = Object.values(updates);
    const query = `UPDATE leagues SET ${fields.join(', ')} WHERE id = $${fields.length + 1}`;
    await pool.query(query, [...values, id]);
};

// Function to get a league by ID
export const getLeagueById = async (id: number): Promise<League | null> => {
    const result = await pool.query(
        `SELECT * FROM leagues WHERE id = $1`,
        [id]
    );
    return result.rows[0] || null;
};

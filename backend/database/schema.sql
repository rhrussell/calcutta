-- Define leagues table
CREATE TABLE IF NOT EXISTS leagues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    minutes_per_item INT NOT NULL,
    salary_capacity INT NOT NULL,
    number_of_players INT NOT NULL,
    number_of_players_per_squad INT NOT NULL
);

-- Define squads table
CREATE TABLE IF NOT EXISTS squads (
    id SERIAL PRIMARY KEY,
    league_id INT REFERENCES leagues(id),
    name VARCHAR(255) NOT NULL,
    salary_capacity INT NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Define the players table
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Define the squad players table
CREATE TABLE squad_players (
    id SERIAL PRIMARY KEY,
    squad_id INTEGER REFERENCES squads(id) ON DELETE CASCADE,
    player_id INTEGER REFERENCES players(id) ON DELETE CASCADE
);

-- Define the teams table
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    squad_id INTEGER REFERENCES squads(id) ON DELETE CASCADE
);

-- Add indices or additional constraints if necessary
CREATE INDEX IF NOT EXISTS idx_league_name ON leagues (name);
CREATE INDEX IF NOT EXISTS idx_squad_name ON squads (name);
CREATE INDEX IF NOT EXISTS idx_team_name ON teams (name);
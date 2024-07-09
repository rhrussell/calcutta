-- Define leagues table
CREATE TABLE IF NOT EXISTS leagues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    minutesPerItem INT NOT NULL,
    salaryCapacity INT NOT NULL,
    numberOfPlayers INT NOT NULL,
    numberOfPlayersPerSquad INT NOT NULL
);

-- Define squads table
CREATE TABLE IF NOT EXISTS squads (
    id SERIAL PRIMARY KEY,
    leagueId INT REFERENCES leagues(id),
    name VARCHAR(255) NOT NULL,
    salaryCapacity INT NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Define the players table
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Define the squad players table
CREATE TABLE IF NOT EXISTS squad_players (
    id SERIAL PRIMARY KEY,
    squadId INTEGER REFERENCES squads(id) ON DELETE CASCADE,
    playerId INTEGER REFERENCES players(id) ON DELETE CASCADE
);

-- Define the teams table
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    squadId INTEGER REFERENCES squads(id) ON DELETE CASCADE,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Add indices or additional constraints if necessary
CREATE INDEX IF NOT EXISTS idx_league_name ON leagues (name);
CREATE INDEX IF NOT EXISTS idx_squad_name ON squads (name);
CREATE INDEX IF NOT EXISTS idx_team_name ON teams (name);
-- Define leagues table
CREATE TABLE IF NOT EXISTS leagues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,  -- Ensure league name is unique
    minutesPerItem INT NOT NULL,
    salaryCapacity INT NOT NULL,
    numberOfPlayers INT NOT NULL,
    numberOfPlayersPerSquad INT NOT NULL
);

-- Define squads table
CREATE TABLE IF NOT EXISTS squads (
    id SERIAL PRIMARY KEY,
    leagueName VARCHAR(255) REFERENCES leagues(name) ON DELETE CASCADE,  -- Link to league by name
    name VARCHAR(255) NOT NULL,
    salaryCapacity INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE (leagueName, name)  -- Ensure that each squad name is unique within a league
);

-- Define the players table
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL  -- Ensure player names are unique
);

-- Define the squad players table
CREATE TABLE IF NOT EXISTS squad_players (
    id SERIAL PRIMARY KEY,
    squadId INTEGER REFERENCES squads(id) ON DELETE CASCADE,
    playerId INTEGER REFERENCES players(id) ON DELETE CASCADE,
    UNIQUE (squadId, playerId)  -- Ensure each player can only be assigned to a squad once
);

-- Define the teams table
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    seed INT NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,  -- Ensure team names are unique
    record VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    opponent VARCHAR(255) NOT NULL,
    price INT NOT NULL
);

-- Define the squad teams table
CREATE TABLE IF NOT EXISTS squad_teams (
    id SERIAL PRIMARY KEY,
    squadId INTEGER REFERENCES squads(id) ON DELETE CASCADE,
    teamId INTEGER REFERENCES teams(id) ON DELETE CASCADE,
    UNIQUE (squadId, teamId)  -- Ensure that each team is assigned to a squad only once
);

-- Add indices or additional constraints if necessary
CREATE INDEX IF NOT EXISTS idx_league_name ON leagues (name);
CREATE INDEX IF NOT EXISTS idx_squad_name ON squads (name);
CREATE INDEX IF NOT EXISTS idx_team_name ON teams (name);
CREATE INDEX IF NOT EXISTS idx_squad_league_name ON squads (leagueName);  -- Index for efficient joins and lookups

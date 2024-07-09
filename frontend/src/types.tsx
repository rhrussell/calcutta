// Interfaces:
// These are like templates or blueprints that describe the shape and type of objects.
// They don't contain actual data, just the structure of what the data should look like.
// In TypeScript, interfaces are used to define custom types.
// They help ensure that objects have the correct properties and types.

// Here we have two interfaces: Team and Squad.
// Team: Represents a team in a tournament with properties like seed, name, record, region, opponent, and price.
// Squad: Represents a group of players and teams with properties like name, players, teams, and salaryCap.

// These interfaces are used in different parts of the application to ensure consistency and type safety.
// For example, the Team interface is used to define the structure of team objects in the allTeams array.
// The Squad interface is used to define the structure of squad objects in the updatedSquads array.

// By defining interfaces, we can easily create and manage objects with consistent properties and types.
// This helps prevent errors and makes the code easier to understand and maintain.
// By using interfaces, we can define the structure of objects and ensure type safety in our application.

// This section defines the structure for a "Team" object.
// Think of it as a blueprint that tells us what information a team should have.
export interface Team {
  // The seed is like a ranking or position of the team in the tournament.
  seed: string;

  // The name is simply the name of the team.
  name: string;

  // The record is a summary of the team's performance, like their win-loss record.
  record: string;

  // The region is the geographical area or group the team belongs to.
  region: string;

  // The opponent is the team they are currently or next going to compete against.
  // The question mark means this information is optional and might not always be there.
  opponent: string;

  // The price is the cost or value of the team, which could be related to a bidding process.
  // This is also optional, indicated by the question mark.
  price: number;
}

// Practical Example:
// Each team has a name (e.g., "Tigers"), a ranking (e.g., "1st seed"), a record (e.g., "10 wins, 2 losses"),
// a region (e.g., "North"), an opponent they are going to play against (e.g., "Lions"), and maybe a cost (e.g., "$100").

// This section defines the structure for a "Squad" object.
// It's another blueprint, but this time for a group of people or players working together.
export interface Squad {
  // The name is the name of the squad.
  name: string;

  // Players is a list (array) of names of the people in the squad.
  players: string[];

  // Teams is a list (array) of Team objects. Each squad has a collection of teams.
  teams: Team[];

  // The salaryCap is the maximum amount of money the squad is allowed to spend.
  salaryCap: number;

  // The password is a security measure to restrict access to the squad.
  password: string;
}

// Practical Example:
// Each squad is like a group of students or participants.
// Each squad has a name (e.g., "Squad A"), a list of players (e.g., ["Alice", "Bob"]),
//  a list of teams they are responsible for (e.g., the "Tigers" team),
//  and a budget they can't exceed (e.g., $500).

export interface League {
  name: string;
  minutesPerItem: number;
  salaryCapacity: number;
  numberOfPlayers: number;
  numberOfPlayersPerSquad: number;
  squads: Squad[];
}

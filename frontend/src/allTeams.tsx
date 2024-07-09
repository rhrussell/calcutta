// This imports the Team type from the types file.
// The Team type describes the structure of a team object, ensuring all team objects follow the same format.
import { Team } from "./types";

// This creates a list of all the teams, where each team has specific properties like seed, name, record, region, opponent, and price.
// The list contains all the teams participating in the tournament, along with their details.
// The list is exported so it can be used in other files.
// The list is an array of Team objects.
export const allTeams: Team[] = [
  {
    seed: 1, // Seed is the rank or position of the team in the tournament.
    name: "UConn", // The name of the team.
    record: "(31-3)", // The team's win-loss record.
    region: "East", // The region where the team is competing.
    opponent: "16 Stetson (22-12)", // The opponent team and their record.
    price: 0, // The price or value assigned to the team.
  },
  {
    seed: 16,
    name: "Stetson",
    record: "(22-12)",
    region: "East",
    opponent: "1 UConn (31-3)",
    price: 0,
  },
  // {
  //   seed: 8,
  //   name: "Florida Atlantic",
  //   record: "(25-8)",
  //   region: "East",
  //   opponent: "9 Northwestern (21-11)",
  //   price: 0,
  // },
  // {
  //   seed: 9,
  //   name: "Northwestern",
  //   record: "(21-11)",
  //   region: "East",
  //   opponent: "8 Florida Atlantic (25-8)",
  //   price: 0,
  // },
  // {
  //   seed: 5,
  //   name: "San Diego",
  //   record: "(24-10)",
  //   region: "East",
  //   opponent: "12 UAB (23-11)",
  //   price: 0,
  // },
  // {
  //   seed: 12,
  //   name: "UAB",
  //   record: "(23-11)",
  //   region: "East",
  //   opponent: "5 San Diego (24-10)",
  //   price: 0,
  // },
  // {
  //   seed: 4,
  //   name: "Auburn",
  //   record: "(27-7)",
  //   region: "East",
  //   opponent: "13 Yale (22-9)",
  //   price: 0,
  // },
  // {
  //   seed: 13,
  //   name: "Yale",
  //   record: "(22-9)",
  //   region: "East",
  //   opponent: "4 Auburn (27-7)",
  //   price: 0,
  // },
  // {
  //   seed: 6,
  //   name: "BYU",
  //   record: "(23-10)",
  //   region: "East",
  //   opponent: "11 Duquesne (24-11)",
  //   price: 0,
  // },
  // {
  //   seed: 11,
  //   name: "Duquesne",
  //   record: "(24-11)",
  //   region: "East",
  //   opponent: "6 BYU (23-10)",
  //   price: 0,
  // },
  // {
  //   seed: 3,
  //   name: "Illinois",
  //   record: "(26-8)",
  //   region: "East",
  //   opponent: "14 Morehead St. (26-8)",
  //   price: 0,
  // },
  // {
  //   seed: 14,
  //   name: "Morehead St.",
  //   record: "(26-8)",
  //   region: "East",
  //   opponent: "3 Illinois (26-8)",
  //   price: 0,
  // },
  // {
  //   seed: 7,
  //   name: "Washington St.",
  //   record: "(24-9)",
  //   region: "East",
  //   opponent: "10 Drake (28-6)",
  //   price: 0,
  // },
  // {
  //   seed: 10,
  //   name: "Drake",
  //   record: "(28-6)",
  //   region: "East",
  //   opponent: "7 Washington St. (24-9)",
  //   price: 0,
  // },
  // {
  //   seed: 2,
  //   name: "Iowa St.",
  //   record: "(27-7)",
  //   region: "East",
  //   opponent: "15 S. Dakota St. (22-12)",
  //   price: 0,
  // },
  // {
  //   seed: 15,
  //   name: "S. Dakota St.",
  //   record: "(22-12)",
  //   region: "East",
  //   opponent: "2 Iowa St. (27-7)",
  //   price: 0,
  // },
  // {
  //   seed: 1,
  //   name: "North Carolina",
  //   record: "(27-7)",
  //   region: "West",
  //   opponent: "16 Howard (18-16)/16 Wagner (16-15)",
  //   price: 0,
  // },
  // {
  //   seed: 16,
  //   name: "Howard (Play In)", // "Play In" indicates this team will face a yet-to-be-determined team.
  //   record: "(18-16)",
  //   region: "West",
  //   opponent: "16 Wagner (16-15)",
  //   price: 0,
  // },
  // {
  //   seed: 16,
  //   name: "Wagner (Play In)",
  //   record: "(16-15)",
  //   region: "West",
  //   opponent: "16 Howard (18-16)",
  //   price: 0,
  // },
  // {
  //   seed: 8,
  //   name: "Mississippi St.",
  //   record: "(21-13)",
  //   region: "West",
  //   opponent: "9 Michigan St. (19-14)",
  //   price: 0,
  // },
  // {
  //   seed: 9,
  //   name: "Michigan St.",
  //   record: "(19-14)",
  //   region: "West",
  //   opponent: "8 Mississippi St. (21-13)",
  //   price: 0,
  // },
  // {
  //   seed: 5,
  //   name: "Saint Mary's",
  //   record: "(26-7)",
  //   region: "West",
  //   opponent: "12 Grand Canyon (29-4)",
  //   price: 0,
  // },
  // {
  //   seed: 12,
  //   name: "Grand Canyon",
  //   record: "(29-4)",
  //   region: "West",
  //   opponent: "5 Saint Mary's (26-7)",
  //   price: 0,
  // },
  // {
  //   seed: 4,
  //   name: "Alabama",
  //   record: "(21-11)",
  //   region: "West",
  //   opponent: "13 Charleston (27-7)",
  //   price: 0,
  // },
  // {
  //   seed: 13,
  //   name: "Charleston",
  //   record: "(27-7)",
  //   region: "West",
  //   opponent: "4 Alabama (21-11)",
  //   price: 0,
  // },
  // {
  //   seed: 6,
  //   name: "Clemson",
  //   record: "(21-11)",
  //   region: "West",
  //   opponent: "11 New Mexico (26-9)",
  //   price: 0,
  // },
  // {
  //   seed: 11,
  //   name: "New Mexico",
  //   record: "(26-9)",
  //   region: "West",
  //   opponent: "6 Clemson (21-11)",
  //   price: 0,
  // },
  // {
  //   seed: 3,
  //   name: "Baylor",
  //   record: "(23-10)",
  //   region: "West",
  //   opponent: "14 Colgate (25-9)",
  //   price: 0,
  // },
  // {
  //   seed: 14,
  //   name: "Colgate",
  //   record: "(25-9)",
  //   region: "West",
  //   opponent: "3 Baylor (23-10)",
  //   price: 0,
  // },
  // {
  //   seed: 7,
  //   name: "Dayton",
  //   record: "(24-7)",
  //   region: "West",
  //   opponent: "10 Nevada (26-7)",
  //   price: 0,
  // },
  // {
  //   seed: 10,
  //   name: "Nevada",
  //   record: "(26-7)",
  //   region: "West",
  //   opponent: "7 Dayton (24-7)",
  //   price: 0,
  // },
  // {
  //   seed: 2,
  //   name: "Arizona",
  //   record: "(25-8)",
  //   region: "West",
  //   opponent: "15 Long Beach St. (21-14)",
  //   price: 0,
  // },
  // {
  //   seed: 15,
  //   name: "Long Beach St.",
  //   record: "(21-14)",
  //   region: "West",
  //   opponent: "2 Arizona (25-8)",
  //   price: 0,
  // },
  // {
  //   seed: 1,
  //   name: "Houston",
  //   record: "(30-4)",
  //   region: "South",
  //   opponent: "16 Longwood (21-13)",
  //   price: 0,
  // },
  // {
  //   seed: 16,
  //   name: "Longwood",
  //   record: "(21-13)",
  //   region: "South",
  //   opponent: "1 Houston (30-4)",
  //   price: 0,
  // },
  // {
  //   seed: 8,
  //   name: "Nebraska",
  //   record: "(23-10)",
  //   region: "South",
  //   opponent: "9 Texas A&M (20-14)",
  //   price: 0,
  // },
  // {
  //   seed: 9,
  //   name: "Texas A&M",
  //   record: "(20-14)",
  //   region: "South",
  //   opponent: "8 Nebraska (23-10)",
  //   price: 0,
  // },
  // {
  //   seed: 5,
  //   name: "Wisconsin",
  //   record: "(22-13)",
  //   region: "South",
  //   opponent: "12 James Madison (31-3)",
  //   price: 0,
  // },
  // {
  //   seed: 12,
  //   name: "James Madison",
  //   record: "(31-3)",
  //   region: "South",
  //   opponent: "5 Wisconsin (22-13)",
  //   price: 0,
  // },
  // {
  //   seed: 4,
  //   name: "Duke",
  //   record: "(24-8)",
  //   region: "South",
  //   opponent: "13 Vermont (28-6)",
  //   price: 0,
  // },
  // {
  //   seed: 13,
  //   name: "Vermont",
  //   record: "(28-6)",
  //   region: "South",
  //   opponent: "4 Duke (24-8)",
  //   price: 0,
  // },
  // {
  //   seed: 6,
  //   name: "Texas Tech",
  //   record: "(23-10)",
  //   region: "South",
  //   opponent: "11 NC State (22-14)",
  //   price: 0,
  // },
  // {
  //   seed: 11,
  //   name: "NC State",
  //   record: "(22-14)",
  //   region: "South",
  //   opponent: "6 Texas Tech (23-10)",
  //   price: 0,
  // },
  // {
  //   seed: 3,
  //   name: "Kentucky",
  //   record: "(23-9)",
  //   region: "South",
  //   opponent: "14 Oakland (23-11)",
  //   price: 0,
  // },
  // {
  //   seed: 14,
  //   name: "Oakland",
  //   record: "(23-11)",
  //   region: "South",
  //   opponent: "3 Kentucky (23-9)",
  //   price: 0,
  // },
  // {
  //   seed: 7,
  //   name: "Florida",
  //   record: "(24-11)",
  //   region: "South",
  //   opponent: "10 Boise St. (22-10)/10 Colorado (24-10)",
  //   price: 0,
  // },
  // {
  //   seed: 10,
  //   name: "Boise St. (Play In)",
  //   record: "(22-10)",
  //   region: "South",
  //   opponent: "10 Colorado (24-10)",
  //   price: 0,
  // },
  // {
  //   seed: 10,
  //   name: "Colorado (Play In)",
  //   record: "(24-10)",
  //   region: "South",
  //   opponent: "10 Boise St. (22-10)",
  //   price: 0,
  // },
  // {
  //   seed: 2,
  //   name: "Marquette",
  //   record: "(25-9)",
  //   region: "South",
  //   opponent: "15 Western Ky. (22-11)",
  //   price: 0,
  // },
  // {
  //   seed: 15,
  //   name: "Western Ky.",
  //   record: "(22-11)",
  //   region: "South",
  //   opponent: "2 Marquette (25-9)",
  //   price: 0,
  // },
  // {
  //   seed: 1,
  //   name: "Purdue",
  //   record: "(29-4)",
  //   region: "Midwest",
  //   opponent: "16 Montana St. (17-17)/16 Grambling St. (20-14)",
  //   price: 0,
  // },
  // {
  //   seed: 16,
  //   name: "Montana St. (Play In)",
  //   record: "(17-17)",
  //   region: "Midwest",
  //   opponent: "Grambling St. (20-14)",
  //   price: 0,
  // },
  // {
  //   seed: 16,
  //   name: "Grambling St. (Play In)",
  //   record: "(20-14)",
  //   region: "Midwest",
  //   opponent: "Montana St. (17-17)",
  //   price: 0,
  // },
  // {
  //   seed: 8,
  //   name: "Utah St.",
  //   record: "(27-6)",
  //   region: "Midwest",
  //   opponent: "9 TCU (21-12)",
  //   price: 0,
  // },
  // {
  //   seed: 9,
  //   name: "TCU",
  //   record: "(21-12)",
  //   region: "Midwest",
  //   opponent: "8 Utah St. (27-6)",
  //   price: 0,
  // },
  // {
  //   seed: 5,
  //   name: "Gonzaga",
  //   record: "(25-7)",
  //   region: "Midwest",
  //   opponent: "12 McNeese (30-3)",
  //   price: 0,
  // },
  // {
  //   seed: 12,
  //   name: "McNeese",
  //   record: "(30-3)",
  //   region: "Midwest",
  //   opponent: "5 Gonzaga (25-7)",
  //   price: 0,
  // },
  // {
  //   seed: 4,
  //   name: "Kansas",
  //   record: "(22-10)",
  //   region: "Midwest",
  //   opponent: "13 Samford (29-5)",
  //   price: 0,
  // },
  // {
  //   seed: 13,
  //   name: "Samford",
  //   record: "(29-5)",
  //   region: "Midwest",
  //   opponent: "4 Kansas (22-10)",
  //   price: 0,
  // },
  // {
  //   seed: 6,
  //   name: "South Carolina",
  //   record: "(26-7)",
  //   region: "Midwest",
  //   opponent: "11 Oregon (23-11)",
  //   price: 0,
  // },
  // {
  //   seed: 11,
  //   name: "Oregon",
  //   record: "(23-11)",
  //   region: "Midwest",
  //   opponent: "6 South Carolina (26-7)",
  //   price: 0,
  // },
  // {
  //   seed: 3,
  //   name: "Creighton",
  //   record: "(23-9)",
  //   region: "Midwest",
  //   opponent: "14 Akron (24-10)",
  //   price: 0,
  // },
  // {
  //   seed: 14,
  //   name: "Akron",
  //   record: "(24-10)",
  //   region: "Midwest",
  //   opponent: "3 Creighton (23-9)",
  //   price: 0,
  // },
  // {
  //   seed: 7,
  //   name: "Texas",
  //   record: "(20-12)",
  //   region: "Midwest",
  //   opponent: "10 Virginia (23-10)/10 Colorado St. (24-10)",
  //   price: 0,
  // },
  // {
  //   seed: 10,
  //   name: "Virginia (Play In)",
  //   record: "(23-10)",
  //   region: "Midwest",
  //   opponent: "10 Colorado St. (24-10)",
  //   price: 0,
  // },
  // {
  //   seed: 10,
  //   name: "Colorado St. (Play In)",
  //   record: "(24-10)",
  //   region: "Midwest",
  //   opponent: "10 Virginia (23-10)",
  //   price: 0,
  // },
  // {
  //   seed: 2,
  //   name: "Tennessee",
  //   record: "(24-8)",
  //   region: "Midwest",
  //   opponent: "15 Saint Peter's (19-13)",
  //   price: 0,
  // },
  // {
  //   seed: 15,
  //   name: "Saint Peter's",
  //   record: "(19-13)",
  //   region: "Midwest",
  //   opponent: "2 Tennessee (24-8)",
  //   price: 0,
  // },
];

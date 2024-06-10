export interface Team {
  seed: string;
  name: string;
  record: string;
  region: string;
  opponent?: string;
  price?: number;
}

export interface Squad {
  name: string;
  players: string[];
  teams: Team[];
  salaryCap: number;
}

export interface Matchup {
  top: Team;
  bottom: Team;
  position: number;
}

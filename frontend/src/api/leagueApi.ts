import axios from "axios";
import { League, Squad } from "../types";

const API_URL = "http://localhost:3001/api/leagues";

// Adjust the createLeague function to send both league and squads as part of the request payload
export const createLeague = async (
  league: League,
  squads: Squad[],
): Promise<League> => {
  // Combine the league and squads into a single payload object
  const response = await axios.post(`${API_URL}/create`, { league, squads });
  return { ...league, id: response.data.id, squads: response.data.squads }; // Ensure the ID is included in the returned league object
};

export const getLeagueByName = async (leagueName: string): Promise<League> => {
  const response = await axios.get(`${API_URL}/name/${leagueName}`);
  return response.data;
};

export const joinLeague = async (leagueName: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/join`, {
      leagueName,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error joining the league:", error);
    throw error;
  }
};

export const finalizeResults = async (
  leagueId: number,
  squads: Squad[],
): Promise<League> => {
  const response = await axios.post(`${API_URL}/finalize`, {
    leagueId,
    squads,
  });
  return response.data;
};
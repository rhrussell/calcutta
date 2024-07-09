import axios from "axios";

const API_URL = "http://localhost:3001/api/leagues";

// Adjust the createLeague function to send both league and squads as part of the request payload
export const createLeague = async (league: any, squads: any) => {
  // Combine the league and squads into a single payload object
  const response = await axios.post(`${API_URL}/create`, { league, squads });
  return response.data;
};

export const finalizeResults = async (data: any) => {
  const response = await axios.post(`${API_URL}/finalize`, data);
  return response.data;
};

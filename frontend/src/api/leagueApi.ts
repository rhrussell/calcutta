import axios from 'axios';

const API_URL = 'http://localhost:3001/api/leagues';

export const createLeague = async (leagueData: any) => {
    const response = await axios.post(`${API_URL}/create`, leagueData);
    return response.data;
};

export const finalizeResults = async (data: any) => {
    const response = await axios.post(`${API_URL}/finalize`, data);
    return response.data;
};

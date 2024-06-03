import React, { useState,  ChangeEvent, FormEvent } from 'react';
import { useNumberOfPlayers } from '../NumberOfPlayersContext';

interface FormData {
  leagueName: string;
  minutesPerItem: string;
  teamSalaryCap: string;
  numPlayers: string;
  numPlayersPerTeam: string;
}

function LeagueForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    leagueName: '',
    minutesPerItem: '',
    teamSalaryCap: '',
    numPlayers: '',
    numPlayersPerTeam: '',
  });
  
  const { setNumPlayers, setNumPlayersPerTeam } = useNumberOfPlayers();

  const isAnyInputEmpty = Object.values(formData).some(value => value.trim() === '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do something with the form data, like sending it to a server
    setNumPlayers(parseInt(formData.numPlayers));
    setNumPlayersPerTeam(parseInt(formData.numPlayersPerTeam));
    console.log("League Data: ", formData);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        League Name:
        <input
          type="text"
          name="leagueName"
          value={formData.leagueName}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Minutes Per Item:
        <input
          type="number"
          name="minutesPerItem"
          value={formData.minutesPerItem}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Team Salary Cap:
        <input
          type="text"
          name="teamSalaryCap"
          value={formData.teamSalaryCap}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Number of Players:
        <input
          type="number"
          name="numPlayers"
          value={formData.numPlayers}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Number of Players Per Team:
        <input
          type="number"
          name="numPlayersPerTeam"
          value={formData.numPlayersPerTeam}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <button type="submit" disabled={isAnyInputEmpty}>Submit</button>
    </form>
  );
};

export default LeagueForm;

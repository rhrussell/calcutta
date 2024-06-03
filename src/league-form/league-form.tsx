import React, { useState,  ChangeEvent, FormEvent } from 'react';

function LeagueForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    leagueName: '',
    minutesPerItem: '',
    teamSalaryCap: '',
    numPlayers: '',
    numPlayersPerTeam: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do something with the form data, like sending it to a server
    console.log(formData);
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default LeagueForm;

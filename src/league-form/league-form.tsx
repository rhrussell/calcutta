import React, { useState } from 'react';

function LeagueForm() {
  const [formData, setFormData] = useState({
    leagueName: '',
    minutesPerItem: '',
    teamSalaryCap: '',
    numPlayers: '',
    numPlayersPerTeam: '',
  });

  const handleChange = () => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // e.preventDefault();
    // Do something with the form data, like sending it to a server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        League Name:
        <input
          type="text"
          name="name"
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
        <textarea
          name="currency"
          value={formData.teamSalaryCap}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Number of Players:
        <textarea
          name="number"
          value={formData.numPlayers}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Number of Players Per Team:
        <textarea
          name="number"
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

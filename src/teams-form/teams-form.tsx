import React, { useState,  ChangeEvent, FormEvent } from 'react';

function TeamsForm() {
  const [formData, setFormData] = useState({
    playerNames: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do something with the form data, like sending it to a server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Player Names:
        <input
          type="text"
          name="playerNames"
          value={formData.playerNames}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TeamsForm;

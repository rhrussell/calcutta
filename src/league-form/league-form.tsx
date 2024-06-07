import React, { useState,  ChangeEvent, FormEvent } from 'react';
import { useNumberOfPlayers } from '../NumberOfPlayersContext';

interface FormData {
  leagueName: string;
  minutesPerItem: string;
  squadSalaryCap: string;
  numPlayers: string;
  numPlayersPerSquad: string;
}

interface LeagueFormProps {
  onSubmit: (minutes: number) => void;
}

const LeagueForm: React.FC<LeagueFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    leagueName: '',
    minutesPerItem: '',
    squadSalaryCap: '',
    numPlayers: '',
    numPlayersPerSquad: '',
  });
  
  const { setNumPlayers, setNumPlayersPerSquad } = useNumberOfPlayers();

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
    setNumPlayersPerSquad(parseInt(formData.numPlayersPerSquad));
    console.log("League Data: ", formData);
    onSubmit(parseInt(formData.minutesPerItem));
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
        Squad Salary Cap:
        <input
          type="text"
          name="squadSalaryCap"
          value={formData.squadSalaryCap}
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
        Number of Players Per Squad:
        <input
          type="number"
          name="numPlayersPerSquad"
          value={formData.numPlayersPerSquad}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <button type="submit" disabled={isAnyInputEmpty}>Submit</button>
    </form>
  );
};

export default LeagueForm;

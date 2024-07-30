import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { joinLeague } from "../../api/leagueApi"; // Import the joinLeague API call

interface JoinLeagueFormProps {
  onSubmit: (leagueName: string, password: string) => void;
}

const JoinLeagueForm: React.FC<JoinLeagueFormProps> = ({ onSubmit }) => {
  const [leagueName, setLeagueName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(leagueName, password);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Join A League:
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="League Name"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          margin="normal"
          variant="filled"
          required
          //   error={!!errors.leagueName}
          //   helperText={errors.leagueName}
        />
        <br></br>
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          variant="filled"
          required
          type="password"
          //   error={!!errors.leagueName}
          //   helperText={errors.leagueName}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
      {/* {submitted && (
        <Box mt={2}>
          <Typography variant="h6" color="textSecondary">
            Coming Soon!
          </Typography>
        </Box>
      )} */}
    </Box>
  );
};

export default JoinLeagueForm;

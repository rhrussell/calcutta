// This imports necessary parts from React and another context file.
// React helps us build the user interface, and useState allows us to keep track of changes.
// ChangeEvent and FormEvent are used to handle events triggered by user interactions.
// The useNumberOfPlayers hook is used to set the number of players globally.
// Material-UI components like TextField, Button, and Checkbox are used to create the form.
import React, { useState, FormEvent } from "react";
import { useNumberOfPlayers } from "../NumberOfPlayersContext";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { createLeague } from "../api/leagueApi";

// This defines the structure of the form data that we will collect from the user.
interface FormData {
  leagueName: string; // The name of the league
  minutesPerItem: string; // The number of minutes allocated per item
  squadSalaryCap: string; // The maximum budget for a squad
  numPlayers: string; // The total number of players
  numPlayersPerSquad: string; // The number of players per squad
  orderOfAuction: boolean; // Whether the auction follows a specific order
}

// This defines the structure of the properties (props) that are passed into the LeagueForm component.
interface LeagueFormProps {
  // The onSubmit function is a callback that will be called when the form is submitted.
  // It takes three arguments: minutes (number), salary (number), and order (boolean).
  // This function is responsible for handling the form data and passing it to the parent component.
  // The parent component can then use this data to perform further actions.
  // The LeagueFormProps interface is used to define the type of props that the LeagueForm component expects.
  onSubmit: (minutes: number, salary: number, order: boolean) => void;
}

// This is the main function that creates the LeagueForm component.
// It takes the LeagueFormProps as an argument and returns the JSX (user interface) of the form.
// The component uses React hooks to manage the form data and user interactions.
const LeagueForm: React.FC<LeagueFormProps> = ({ onSubmit }) => {
  // useState is used to manage the form data. Initially, all fields are empty or false.
  // The setFormData function is used to update the form data when the user interacts with the form.
  // The formData variable holds the current state of the form data.
  const [formData, setFormData] = useState<FormData>({
    leagueName: "",
    minutesPerItem: "",
    squadSalaryCap: "",
    numPlayers: "",
    numPlayersPerSquad: "",
    orderOfAuction: false,
  });

  // These are functions from a custom context that allow us to set the number of players globally.
  // This is useful for sharing data across different components without prop drilling.
  // The setNumPlayers function sets the total number of players, and setNumPlayersPerSquad sets the number of players per squad.
  // These functions are called when the form is submitted to update the global state.
  // The useNumberOfPlayers hook provides these functions and the current number of players.
  // This hook is used to manage the number of players across the application.
  const { setNumPlayers, setNumPlayersPerSquad } = useNumberOfPlayers();

  // This separates the orderOfAuction property from the rest of the form data for easy handling.
  // This is done to prevent the orderOfAuction checkbox from being treated as a text input field.
  // The restFormData variable contains all form data except for the orderOfAuction property.
  // This separation helps in handling the form data more effectively.
  const { orderOfAuction, ...restFormData } = formData;

  // This state variable is used to store validation errors for the form fields.
  // The setErrors function is used to update the errors when the form is submitted.
  // Initially, all error messages are empty. They will be updated based on user input.
  // The errors variable holds the current state of the validation errors.
  // This state variable is used to display error messages to the user when the form is submitted.
  // The errors state is updated based on the validation rules defined in the validateForm function.
  const [errors, setErrors] = useState({
    leagueName: "",
    minutesPerItem: "",
    squadSalaryCap: "",
    numPlayers: "",
    numPlayersPerSquad: "",
  });

  // This function validates the form data based on certain rules.
  // It checks if the form fields meet the required conditions for submission.
  // The function updates the errors state based on the validation results.
  // The validateForm function is used to validate the form data before submission.
  // It checks if the form fields meet the required conditions for submission.
  const validateForm = () => {
    const newErrors = {
      leagueName: "",
      minutesPerItem: "",
      squadSalaryCap: "",
      numPlayers: "",
      numPlayersPerSquad: "",
    };

    // Validation rules for the form fields
    // The leagueName field should not be empty and should contain letters
    if (!/[a-zA-Z]/.test(formData.leagueName)) {
      newErrors.leagueName = "A League's Name needs to have letters in it";
    }
    // The minutesPerItem field should be greater than or equal to 1
    if (parseFloat(formData.minutesPerItem) < 1) {
      newErrors.minutesPerItem =
        "Minutes Per Item needs to be greater than or equal to 1";
    }
    // The squadSalaryCap field should be greater than or equal to 1
    if (parseFloat(formData.squadSalaryCap) < 1) {
      newErrors.squadSalaryCap =
        "Squad Salary Capacity needs to be greater than or equal to $1";
    }
    // The numPlayers field should be greater than or equal to 1 and a whole number
    if (parseInt(formData.numPlayers) < 1) {
      newErrors.numPlayers =
        "Number of Players needs to be greater than or equal to 1";
    }
    // The numPlayersPerSquad field should be greater than or equal to 1 and a whole number
    if (!Number.isInteger(parseFloat(formData.numPlayers))) {
      newErrors.numPlayers = "Number of Players needs to be a whole number";
    }
    // The numPlayersPerSquad field should be greater than or equal to 1 and a whole number
    if (parseInt(formData.numPlayersPerSquad) < 1) {
      newErrors.numPlayersPerSquad =
        "Number of Players per Squad needs to be greater than or equal to 1";
    }
    // The numPlayersPerSquad field should be a whole number
    if (!Number.isInteger(parseFloat(formData.numPlayersPerSquad))) {
      newErrors.numPlayersPerSquad =
        "Number of Players per Squad needs to be a whole number";
    }

    // Update the errors state with the new error messages
    // The setErrors function is used to update the errors state with the new error messages.
    setErrors(newErrors);

    // Check if there are any errors in the form data
    // The function returns true if there are no errors in the form data.
    return Object.values(newErrors).every((error) => error === "");
  };

  // This function updates the form data when the user types in the input fields.
  // It takes an event (e) as an argument and extracts the name and value of the input field.
  // The setFormData function is then used to update the form data with the new value.
  // This function is called whenever the user types in any of the input fields.
  // It ensures that the form data is up to date with the user's input.
  // The handleChange function is used to handle changes in the input fields of the form.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // This function is called when the form is submitted.
  // It prevents the default form submission, sets the number of players, and logs the form data.
  // The onSubmit function passed as a prop is called with the necessary data.
  // This function handles the form submission and passes the data to the parent component.
  // The handleSubmit function is used to handle the form submission event.
  // It prevents the default form submission, sets the number of players, and calls the onSubmit function.
  // The onSubmit function is responsible for handling the form data and performing further actions.
  // The handleSubmit function is triggered when the user submits the form.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If the form is valid, set the number of players and call the onSubmit function
    if (validateForm()) {
      try {
        await createLeague(formData);
        alert('League created successfully');
      } catch (error) {
        console.error(error);
        alert('An error occurred while creating the league');
      }
      setNumPlayers(parseInt(formData.numPlayers));
      setNumPlayersPerSquad(parseInt(formData.numPlayersPerSquad));
      console.log("League Data: ", formData);
      // This calls the onSubmit function passed in as a prop with the necessary data.
      // The minutesPerItem and squadSalaryCap values are converted to numbers before being passed.
      // The orderOfAuction value is passed as is since it's already a boolean.
      onSubmit(
        parseInt(formData.minutesPerItem),
        parseInt(formData.squadSalaryCap),
        formData.orderOfAuction,
      );
    }
  };

  // This returns the actual form that will be displayed on the screen.
  // It contains various input fields for the user to fill out and a submit button.
  // The input fields are controlled components, meaning their values are managed by React state.
  // The submit button is disabled if any required field is empty.
  // The form submission is handled by the handleSubmit function.
  // This form allows the user to input data and submit it for further processing.
  // The form component is responsible for collecting data from the user and passing it to the parent component.
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="League Name"
        type="text"
        name="leagueName"
        value={formData.leagueName}
        onChange={handleChange}
        margin="normal"
        variant="filled"
        required
        error={!!errors.leagueName}
        helperText={errors.leagueName}
      />
      <br></br>
      <TextField
        label="Minutes Per Item"
        type="number"
        name="minutesPerItem"
        value={formData.minutesPerItem}
        onChange={handleChange}
        margin="normal"
        variant="filled"
        required
        error={!!errors.minutesPerItem}
        helperText={errors.minutesPerItem}
      />
      <br></br>
      <TextField
        label="Squad Salary Cap"
        type="text"
        name="squadSalaryCap"
        value={formData.squadSalaryCap}
        onChange={handleChange}
        margin="normal"
        variant="filled"
        required
        error={!!errors.squadSalaryCap}
        helperText={errors.squadSalaryCap}
      />
      <br></br>
      <TextField
        label="Number of Players"
        type="number"
        name="numPlayers"
        value={formData.numPlayers}
        onChange={handleChange}
        margin="normal"
        variant="filled"
        required
        error={!!errors.numPlayers}
        helperText={errors.numPlayers}
      />
      <br></br>
      <TextField
        label="Number of Players per Squad"
        type="number"
        name="numPlayersPerSquad"
        value={formData.numPlayersPerSquad}
        onChange={handleChange}
        margin="normal"
        variant="filled"
        required
        error={!!errors.numPlayersPerSquad}
        helperText={errors.numPlayersPerSquad}
      />
      <br></br>
      <FormControlLabel
        control={
          <Checkbox
            name="orderOfAuction"
            checked={formData.orderOfAuction}
            onChange={(e) =>
              setFormData({ ...formData, orderOfAuction: e.target.checked })
            }
          />
        }
        label="Order of Auction"
      />
      <br></br>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={Object.values(restFormData).some(
          (value) => value.trim() === "",
        )}
      >
        Submit
      </Button>
    </form>
  );
};

// This exports the LeagueForm component so it can be used in other parts of the application.
// The LeagueForm component is responsible for collecting league data from the user.
// It provides a form for the user to input various details required for setting up a league.
export default LeagueForm;

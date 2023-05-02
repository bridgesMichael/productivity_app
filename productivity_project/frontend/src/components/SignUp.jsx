import { useState } from "react";
import { signUp } from "../utilities";
import { Link } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box>
      <div>
        <form
          onSubmit={(e) => [
            e.preventDefault(),
            signUp(name, email, password),
            setName(""),
            setEmail(""),
            setPassword(""),
          ]}
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "8px",
            padding: "8px",
          }}
        >
          <h3>SignUp</h3>
          <TextField
            label="name"
            value={name}
            id="standard-basic"
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="email"
            value={email}
            id="standard-basic"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="password"
            type="password"
            id="standard-basic"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "8px", padding: "8px" }}
          >
            Submit
          </Button>
        </form>
        <Link to="/login/">
          <Button variant="outlined">Click here to login instead!</Button>
        </Link>
      </div>
    </Box>
  );
};

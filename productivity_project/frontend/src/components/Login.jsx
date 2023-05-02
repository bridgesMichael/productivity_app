import { useContext } from "react";
import { logIn } from "../utilities";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

export const LogIn = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    await logIn(email, password, setUser);
    if (logIn) {
      setValue("email", "");
      setValue("password", "");
      navigate("/home/");
    }
  };

  return (
    <Box>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "8px",
            padding: "8px",
          }}
        >
          <h3>Login</h3>
          <TextField
            label="email"
            variant="standard"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <TextField
            label="password"
            type="password"
            variant="standard"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "8px", padding: "8px" }}
          >
            Login
          </Button>
        </form>
        <Link to="/">
          <Button variant="outlined">
            Click here to create a new account!
          </Button>
        </Link>
      </div>
    </Box>
  );
};

import { useContext } from "react";
import { logIn } from "../utilities";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const LogIn = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { setUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    const { email, password } = data;
    await logIn(email, password, setUser);

    setValue("email", "");
    setValue("password", "");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h3>Login</h3>
        <input
          placeholder="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          placeholder="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input type="submit" value="Login" />
      </form>
      <Link to="/">
        <button>Click here to create a new account!</button>
      </Link>
    </div>
  );
};

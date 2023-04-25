import { useState } from "react";
import { signUp } from "../utilities";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => [
          e.preventDefault(),
          signUp(name, email, password),
          setName(""),
          setEmail(""),
          setPassword(""),
        ]}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h3>SignUp</h3>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Sign Up" />
      </form>
      <Link to="/login/">
        <button>Click here to login instead!</button>
      </Link>
    </div>
  );
};

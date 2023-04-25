import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <Link to={"/"}>SignUp</Link>
      <Link to={"/home/"}>Home</Link>
      <Link to={"/tasks/"}>Tasks</Link>
    </div>
  );
};

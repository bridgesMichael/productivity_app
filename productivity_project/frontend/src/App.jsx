import { createContext, useEffect, useState } from "react";
import "./App.css";
import { currUser, logOut } from "./utilities";
import { getToken } from "./components/CsrfToken";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  getToken();

  useEffect(() => {
    const getCurrUser = async () => {
      setUser(await currUser());
    };
    getCurrUser();
  }, []);

  return (
    <div className="App">
      <h1>Task-Tok</h1>
      {user && user.name && (
        <>
          <NavBar />
          <button onClick={() => logOut(setUser)}>Log Out</button>
          <h2>Hello, {user.name}</h2>
        </>
      )}
      <UserContext.Provider value={{ user, setUser }}>
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}

export default App;

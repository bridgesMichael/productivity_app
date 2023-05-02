import { createContext, useEffect, useState } from "react";
import "./App.css";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import { currUser } from "./utilities";
import { getToken } from "./components/CsrfToken";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";

export const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(null);
  getToken();

  useEffect(() => {
    const getCurrUser = async () => {
      setUser(await currUser());
    };
    getCurrUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <NavBar />
          <div className="main-content">
            <Outlet />
          </div>
        </UserContext.Provider>
      </div>
    </ThemeProvider>
  );
}

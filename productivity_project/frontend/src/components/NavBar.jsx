import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { UserContext } from "../App";
import { logOut } from "../utilities";
import "../App.css";

export const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, setUser } = useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isAuthenticated = () => {
    return user !== null && user.name !== undefined;
  };
  const authButton = () => {
    if (isAuthenticated()) {
      return (
        <Button
          color="inherit"
          onClick={() => logOut(setUser)}
          component={Link}
          to="/login/"
        >
          Logout
        </Button>
      );
    } else {
      return (
        <Button color="inherit" component={Link} to="/login/">
          Login
        </Button>
      );
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <MenuIcon />
            </ClickAwayListener>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onclose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose} component={Link} to="/home/">
                Home
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/create/">
                Create Tasks
              </MenuItem>
            </Menu>
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tasker
          </Typography>

          {authButton()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

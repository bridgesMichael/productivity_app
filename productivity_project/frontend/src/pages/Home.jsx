import "../App.css";
import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { deleteTask, getTasks, completeTask } from "../utilities";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";

dayjs.extend(utc);

export const HomePage = () => {
  const tasks = useLoaderData();
  const [currTasks, setCurrTasks] = useState(tasks);

  useEffect(() => {
    console.log("currtasks updated", currTasks);
  }, [currTasks]);

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    setCurrTasks(await getTasks());
  };

  const handleComplete = async (taskId) => {
    await completeTask(taskId);
    setCurrTasks(await getTasks());
  };

  return (
    <Box>
      <Divider />
      <List>
        {currTasks
          .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
          .filter((task) => task.status !== "complete")
          .map((task) => (
            <Link
              to={`/${task.id}`}
              style={{ textDecoration: "none" }}
              key={task.id}
            >
              <ListItem
                sx={{
                  maxWidth: 720,
                  minWidth: 720,
                  backgroundColor: "#f2ebcf",
                  border: 1,
                  borderColor: "#304e64",
                  borderRadius: "16px",
                  marginBottom: "8px",
                  padding: "8px",
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h4" color="black">
                      {task.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="h6" color="black">
                      Due: {dayjs(task.due_date).format("DD-MMM-YYYY hh:mm A")}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="complete"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleComplete(task.id);
                    }}
                  >
                    <Checkbox />
                  </IconButton>
                </ListItemSecondaryAction>
                <Divider />
              </ListItem>
            </Link>
          ))}
        <Divider />
      </List>
      <Link to="/create/">
        <Button varient="contained">Create New Task</Button>
      </Link>
    </Box>
  );
};

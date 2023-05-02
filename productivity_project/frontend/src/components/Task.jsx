import "../App.css";
import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { deleteTask, getTask, formatTime, updateTimer } from "../utilities";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Button, CardActions, Box } from "@mui/material";
import { Timer } from "./Timer";
import { useStopwatch } from "react-timer-hook";

dayjs.extend(utc);

export const TaskView = () => {
  const task = useLoaderData();
  const [currTask, setCurrTask] = useState(task);

  const navigate = useNavigate();

  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    navigate("/home/");
  };

  const handleStop = async () => {
    const timeInSecs = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    if (timeInSecs !== 0) {
      await updateTimer(task.id, timeInSecs);
    }
    reset(0, false);
    setCurrTask(await getTask(task.id));
  };

  return (
    <Card
      sx={{
        maxWidth: 720,
        minWidth: 720,
        backgroundColor: "#f2ebcf",
        border: 1,
        borderColor: "#304e64",
        borderRadius: "16px",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Task: {task.title} || Category: {task.category}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Due: {dayjs(task.due_date).format("DD-MMM-YYYY hh:mm A")}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign={"left"}
          paddingLeft={"240px"}
        >
          <pre style={{ fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
            {task.description}
          </pre>
        </Typography>
        <Typography>Total Time on Task: {""}</Typography>
        <Typography>{formatTime(currTask.amount_of_time_worked)}</Typography>
        <div>-----------------------------------------</div>
        <Typography>
          Session Timer:
          <Timer
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            isRunning={isRunning}
            start={start}
            pause={pause}
            reset={reset}
          />
        </Typography>
      </CardContent>

      <CardActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            px: 2,
          }}
        >
          <Button size="small" color="primary" component={Link} to="/home/">
            Back
          </Button>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`/edit/${task.id}`}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </Button>{" "}
          {isRunning ? (
            <Button size="small" color="primary" onClick={handleStop}>
              Stop Timer
            </Button>
          ) : (
            <Button size="small" color="primary" onClick={start}>
              Start Timer
            </Button>
          )}
          <Button size="small" color="primary">
            Add sub-task
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

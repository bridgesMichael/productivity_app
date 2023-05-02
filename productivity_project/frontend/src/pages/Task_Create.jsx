import { useState, useEffect } from "react";
import { useLoaderData, useParams, useNavigate, Link } from "react-router-dom";
import { createTask, updateTask } from "../utilities";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { TextField, Button, Box, Autocomplete } from "@mui/material";
import "../App.css";

dayjs.extend(utc);

export const Task_Create = () => {
  const { taskId } = useParams();
  const task = taskId ? useLoaderData() : null;
  const navigate = useNavigate();
  const options = ["Inbox", "Work", "Home", "Other"];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(dayjs());

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("category", task.category);
      setValue("description", task.description);
      setStartDate(dayjs(task.due_date));
    }
  }, [task, setValue]);

  const onSubmit = async (data) => {
    data.due_date = dayjs(startDate).utc().format("YYYY-MM-DD HH:mm");

    if (taskId) {
      await updateTask(taskId, data);
      navigate(`/${task.id}`);
    } else {
      await createTask(data);
    }

    setValue("title", "");
    setValue("category", "");
    setValue("description", "");
    setStartDate(dayjs());
  };

  return (
    <div>
      {task ? <h1>Task Edit</h1> : <h1>Task Creation</h1>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Task title"
            id="standard-basic"
            variant="standard"
            {...register("title", { required: true })}
          />
          {errors.title && <span>This field is required</span>}
          <Autocomplete
            freeSolo
            defaultValue={task ? task.category : ""}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                id="standard-basic"
                variant="standard"
                {...register("category", { required: true })}
              />
            )}
          />
          {errors.category && <span>This field is required</span>}
          <TextField
            label="Description (optional)"
            id="outlined-multiline-static"
            variant="standard"
            multiline
            rows={4}
            {...register("description")}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDateTimePicker
              value={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </LocalizationProvider>
          <Button type="submit" varient="contained">
            {task ? "Update" : "Create"}
          </Button>
          {task ? (
            <Button varient="contained" component={Link} to={`/${task.id}`}>
              Back
            </Button>
          ) : (
            <Button varient="contained" component={Link} to="/home/">
              Back
            </Button>
          )}
        </Box>
      </form>
    </div>
  );
};

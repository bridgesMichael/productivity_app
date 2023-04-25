import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { createTask } from "../utilities";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

export const Task = () => {
  const tasks = useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [currTasks, setCurrTasks] = useState(tasks);
  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = async (data) => {
    data.due_date = startDate;
    setCurrTasks(await createTask(data));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title", { required: true })}
          placeholder="Task title"
        />
        {errors.title && <span>This field is required</span>}

        <input
          {...register("category", { required: true })}
          placeholder="Category"
        />
        {errors.category && <span>This field is required</span>}

        <textarea
          {...register("description")}
          placeholder="Description (optional)"
        />

        <label>
          Due date:
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
            timeFormat="hh:mm aa"
          />
        </label>

        <input type="submit" />
      </form>
      <ol>
        {currTasks.map((task) => (
          <li>
            {task.title} Due: {task.due_date}
          </li>
        ))}
      </ol>
    </div>
  );
};

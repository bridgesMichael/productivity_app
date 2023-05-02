import axios from "axios";

export const signUp = async (name, email, password) => {
  let response = await axios.post("/user/users/", {
    name: name,
    email: email,
    password: password,
  });
  console.log(`Signup response: ${response.data.success}`);
  return response.data.success;
};

export const logIn = async (email, password, setUser) => {
  let response = await axios.put("/user/users/", {
    email: email,
    password: password,
  });
  setUser(response.data);
};

export const currUser = async () => {
  let response = await axios.get("/user/users/");
  console.log(response.data);
  return response.data;
};

export const logOut = async (setUser) => {
  let response = await axios.post("/user/users/");
  if (response.data.logout) {
    setUser(null);
  }
};

export const getTasks = async () => {
  let response = await axios.get("/tasks/");
  return response.data.tasks;
};

export const getTask = async (taskId) => {
  let response = await axios.get(`/tasks/${taskId}`);
  return response.data.task;
};

export const createTask = async (taskData) => {
  let response = await axios.post("/tasks/", taskData);
  return response.data.tasks;
};

export const updateTask = async (taskId, taskData) => {
  let response = await axios.put(`/tasks/${taskId}/`, taskData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  await axios.delete(`/tasks/${taskId}/`);
};

export const completeTask = async (taskId) => {
  const response = await axios.put(`/tasks/${taskId}/`, {
    status: "complete",
  });
  return response.data;
};

export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export const getTimer = async (taskId) => {};

export const updateTimer = async (taskId, timeInSecs) => {
  const currTask = await getTask(taskId);
  const currTime = currTask.amount_of_time_worked;
  const newTime = currTime + timeInSecs;
  let response = await axios.put(`/tasks/${taskId}/`, {
    amount_of_time_worked: newTime,
  });
  return response.data;
};

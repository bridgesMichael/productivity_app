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

export const createTask = async (taskData) => {
  console.log(taskData);
  let response = await axios.post("/tasks/", taskData);
  return response.data.tasks;
};

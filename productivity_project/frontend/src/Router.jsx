import App from "./App";
import { createHashRouter } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { LogIn } from "./components/Login";
import { TaskView } from "./components/Task";
import { HomePage } from "./pages/Home";
import { Task_Create } from "./pages/Task_Create";
import { getTask, getTasks } from "./utilities";

const Router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <SignUp />,
      },
      {
        path: "/login/",
        element: <LogIn />,
      },
      {
        path: "/home/",
        element: <HomePage />,
        loader: getTasks,
      },
      {
        path: "/create/",
        element: <Task_Create />,
        loader: getTasks,
      },
      {
        path: "/:taskId/",
        element: <TaskView />,
        loader: ({ params }) => getTask(params.taskId),
      },
      {
        path: "/edit/:taskId/",
        element: <Task_Create />,
        loader: async ({ params }) => {
          if (params.taskId) {
            return await getTask(params.taskId);
          }
          return null;
        },
      },
    ],
  },
]);

export default Router;

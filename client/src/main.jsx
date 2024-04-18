import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import App from "./App.jsx";
import UserList from "./components/UserList.jsx";
import DreamDetail from "./components/DreamDetail.jsx";
import UserDetail from "./components/UserDetail.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <UserList />
      },
      {
        path: "/user/:id",
        element: <UserDetail />
      },
      {
        path: '/dream/:id',
        element: <DreamDetail />,
      }
    ]
  },
  /* {
    path: '/user/create',
    element: <App />,
    children: [
      {
        path: '/user/create',
        element: <UserForm />,
      }
    ]
  },
  {
    path: '/user/:id/update',
    element: <App />,
    children: [
      {
        path: '/user/:id/update',
        element: <UserForm />,
      }
    ]
  } */
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import App from "./App.jsx";
import UserList from "./components/UserList.jsx";
import DreamDetail from "./components/DreamDetail.jsx";
import DreamForm from "./components/DreamForm.jsx";
import UserDetail from "./components/UserDetail.jsx";
import UserForm from "./components/UserForm.jsx";
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
        path: '/user/create',
        element: <UserForm />,
      },
      {
        path: "/user/:id",
        element: <UserDetail />
      },
      {
        path: '/user/:id/update',
        element: <UserForm />,
      },
      {
        path: '/dream/create',
        element: <DreamForm />,
      },
      {
        path: '/dream/:id',
        element: <DreamDetail />,
      },
      {
        path: '/dream/:id/update',
        element: <DreamForm />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

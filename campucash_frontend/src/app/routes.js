import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Login } from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Transactions } from "./components/Transactions";
import { Departments } from "./components/Departments";
import { Reports } from "./components/Reports";
import { Settings } from "./components/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/app",
    Component: Root,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "departments",
        Component: Departments,
      },
      {
        path: "transactions",
        Component: Transactions,
      },
      {
        path: "reports",
        Component: Reports,
      },
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },
]);

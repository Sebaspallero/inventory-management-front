import React from "react";

import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";


export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />, 
    children: [
      {path: "/", element: React.createElement(Login)},
      {path: "/dashboard", element: React.createElement(Dashboard)}
    ],
  },
]);
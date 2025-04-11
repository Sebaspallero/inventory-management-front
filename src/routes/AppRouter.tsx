import React from "react";

import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import AuthScreens from "@/pages/AuthScreens";
import NotFound from "@/pages/NotFound";


export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />, 
    children: [
      {path: "/", element: React.createElement(AuthScreens)},
      {path: "/dashboard", element: React.createElement(Dashboard)}
    ],
  },
]);
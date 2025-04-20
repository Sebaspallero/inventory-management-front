import React from "react";

import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Dashboard from "@/pages/Dashboard";

import AuthScreens from "@/pages/AuthScreens";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Products from "@/pages/Products";
import DashboardLayout from "@/pages/DashboardLayout";
import Suppliers from "@/pages/Suppliers";



export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />, 
    children: [
      {path: "/", element: React.createElement(AuthScreens)},
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: "/dashboard", element: <Dashboard /> },
              { path: "/products", element: <Products /> },
              { path: "/suppliers", element: <Suppliers /> },
            ]
          }
        ]
      }
    ],
  },
]);
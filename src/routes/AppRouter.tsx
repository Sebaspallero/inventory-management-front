import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import NotFound from "@/pages/NotFoundPage";
import AuthPage from "@/pages/AuthPage";
import Categories from "@/pages/CategoriesPage";
import DashboardLayout from "@/pages/DashboardLayout";
import Dashboard from "@/pages/DashBoardPage";
import Orders from "@/pages/Orders";
import Products from "@/pages/ProductsPage";
import Suppliers from "@/pages/SuppliersPage";
import ProtectedRoute from "./ProtectedRoute";
import Users from "@/pages/UsersPage";



export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />, 
    children: [
      {path: "/", element: <AuthPage/>},
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            errorElement: <NotFound />,
            children: [
              { path: "/dashboard", element: <Dashboard /> },
              { path: "/products", element: <Products /> },
              { path: "/suppliers", element: <Suppliers /> },
              { path: "/orders", element: <Orders/> },
              { path: "/categories", element: <Categories />},
              { path: "/users", element: <Users />},
            ]
          }
        ]
      }
    ],
  },
]);
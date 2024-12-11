// router.ts
import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./PrivateRoutes";
import ListOfUser from "./pages/ListOfUsers"; // فرض اینکه این فایل در پوشه pages وجود دارد
import AddUserPage from "./pages/AddUserPage";
import { RegisterPage } from "./pages/RegisterPage";
import DrugsCategoryPage from "./pages/DrugsCategoryPage";
import DrugsListPage from "./pages/DrugsListPage";
import AddDrugsPage from "./pages/AddDrugsPage";
import TicketForm from "./components/TicketForm";
import UserAccount from "./components/UserAccount";
import Permissions from "./components/Permissions";
import CosmeticsCategoryList from "./components/CosmeticsCategoryList";
import CosmeticsList from "./components/CosmeticsList";
import AddCosmeticForm from "./components/AddCosmeticForm";
import TransactionManager from "./components/TransactionManager";
import ShelvesPage from "./pages/ShelvesPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          { path: "dashboard", element: <HomePage /> },
          { path: "users", element: <ListOfUser /> },
          { path: "add-user", element: <AddUserPage /> },
          { path: "", element: <Navigate to="login" replace /> },
          { path: "list-of-drug-categories", element: <DrugsCategoryPage /> },
          {
            path: "list-of-cosmetic-categories",
            element: <CosmeticsCategoryList />,
          },
          { path: "list-of-drugs", element: <DrugsListPage /> },
          { path: "list-of-cosmetic", element: <CosmeticsList /> },
          { path: "add-drug", element: <AddDrugsPage /> },
          { path: "add-cosmetic", element: <AddCosmeticForm /> },
          { path: "ticket", element: <TicketForm /> },
          { path: "account", element: <UserAccount /> },
          { path: "user-permissions/:userId", element: <Permissions /> },
          { path: "/transactions", element: <TransactionManager /> },
          { path: "shelves", element: <ShelvesPage /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  { path: "/register", element: <RegisterPage /> },
]);

export default router;

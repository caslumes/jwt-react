import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { AuthProvider } from "./core/auth/AuthProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import LoginPage from "./pages/login/LoginPage";

const router = createBrowserRouter([
    { path: "/users/manage", element: <ManageUsers /> },
    { path: "/login", element: <LoginPage /> },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);

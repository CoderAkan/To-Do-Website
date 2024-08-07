import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout";
import ErrorPage from "../pages/error_page";
import Home from "../pages/home";
import Tasks, { taskAction, taskLoader } from "../pages/tasks";
import Categories, { categoriesAction, categoriesLoader } from "../pages/categories";
import Auth from "../pages/auth";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                loader: taskLoader,
                action: taskAction,
                element: 
                    (<ProtectedRoute>
                        <Home />
                    </ProtectedRoute>)
            },
            {
                path: "tasks",
                loader: taskLoader,
                action: taskAction,
                element: 
                    (<ProtectedRoute>
                        <Tasks />
                    </ProtectedRoute>)
            },
            {
                path: "categories",
                action: categoriesAction,
                loader: categoriesLoader,
                element: 
                    (<ProtectedRoute>
                        <Categories />
                    </ProtectedRoute>),
            },
            {
                path: "auth",
                element: <Auth />
            }
        ],
    }
])
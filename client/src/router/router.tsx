import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout";
import ErrorPage from "../pages/error_page";
import Home from "../pages/home";
import Tasks from "../pages/tasks";
import Categories from "../pages/categories";
import Auth from "../pages/auth";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "tasks",
                element: <Tasks />,
            },
            {
                path: "categories",
                element: <Categories />,
            },
            {
                path: "auth",
                element: <Auth />
            }
        ],
    }
])
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginProvider from "./context/Login/LoginProvider";
import TodoProvider from "./context/Todo/TodoProvider";
import * as ROUTES from "./routes";
import * as PAGES from "./pages";

const router = createBrowserRouter([
    {
        path: ROUTES.signIn,
        element: <App />,
        errorElement: <PAGES.ErrorPage />,
    },
    {
        path: ROUTES.welcome,
        element: <PAGES.Welcome />,
    },
    {
        path: ROUTES.todoList,
        element: <PAGES.TodoList />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <LoginProvider>
            <TodoProvider>
                <RouterProvider router={router} />
            </TodoProvider>
        </LoginProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

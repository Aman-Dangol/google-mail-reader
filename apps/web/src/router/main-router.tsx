import { appChildren } from "@src/router/app-children";
import { errorRoute } from "@src/router/error-router";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: lazy(() => import("@src/App")),
    children: appChildren,
  },
  {
    path: "/login",
    Component: lazy(() => import("@src/pages/Login/login")),
  },

  // error path
  errorRoute,
]);

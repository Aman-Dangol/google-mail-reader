import type { RouteObject } from "react-router";

export const errorRoute: RouteObject = {
  path: "*",
  element: <div>no such route</div>,
};

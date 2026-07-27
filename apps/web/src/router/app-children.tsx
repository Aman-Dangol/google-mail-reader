import { lazy } from "react";
import type { RouteObject } from "react-router";

export const appChildren: RouteObject[] = [
  {
    path: "/",
    Component: lazy(() => import("@src/pages/Mails/mails")),
  },
];

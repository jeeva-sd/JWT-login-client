import { lazy } from "react";
import AuthGurad from "./AuthGurad";
import { PATH_HOME, PATH_LOGIN } from "./paths";
import { RouteItem } from "./types";

const routes: RouteItem[] = [
  {
    path: PATH_LOGIN.root,
    guard: AuthGurad,
    element: lazy(() => import("../components/Login")),
  },
  {
    path: "/*",
    element: lazy(() => import("../components/NotFound")),
  },
  {
    path: PATH_HOME.root,
    guard: AuthGurad,
    element: lazy(() => import("../components/Home")),
  },
];

export default routes;

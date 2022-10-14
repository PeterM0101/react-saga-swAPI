import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import People from "./pages/People";
import NotFound from "./pages/NotFound";
import Details from "./pages/Details";

export const MAIN_ROUTE = "/";
export const NOT_FOUND_ROUTE = "*";
export const DETAILS_ROUTE = "/people/:id";

const routes = [
  {
    id: "main",
    path: MAIN_ROUTE,
    exact: true,
    component: People,
  },
  {
    id: "details",
    path: DETAILS_ROUTE,
    exact: false,
    component: Details,
  },
  {
    id: "notFound",
    path: NOT_FOUND_ROUTE,
    exact: false,
    component: NotFound,
  },
];

// export const getRouteConfig = (id: string) => {
//   const route = routes.find((route) => route.id === id);
//
//   if (route) {
//     const { component, ...rest } = route;
//     return rest;
//   } else return null;
// };

const Routes: FC = () => {
  return (
    <Switch>
      {routes.map((route) => {
        const { id, ...props } = route;
        return <Route key={id} {...props} />;
      })}
    </Switch>
  );
};

export default Routes;

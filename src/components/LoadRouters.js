import React from "react";
import { Switch, Route } from "react-router-dom";

const LoadRouters = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      })}
    </Switch>
  );
};

export default LoadRouters;

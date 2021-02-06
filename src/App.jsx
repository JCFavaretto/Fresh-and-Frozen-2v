import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "config/routes";
import { ToastContainer, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "App.scss";

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <RouteWithSubRoutes key={index} {...route} />
        ))}
      </Switch>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
      />
    </Router>
  );
}

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
};

export default App;

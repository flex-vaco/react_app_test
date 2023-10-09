import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthPage } from "../modules/auth";

export function PublicRoutes() {
  return (
    <Switch>
      <HashRouter>
      <Route path="/auth" component={AuthPage} />
      <Redirect to="/auth" />
      </HashRouter>
    </Switch>
  );
}

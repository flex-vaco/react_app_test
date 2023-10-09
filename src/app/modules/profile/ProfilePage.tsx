import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { PageTitle } from "../../../_start/layout/core";
import { Account } from "./components/account/Account";
import { Overview } from "./components/Overview";
import { Settings } from "./components/settings/Settings";

const ProfilePage: React.FC = () => {
  return (
    <Switch>
      <HashRouter>
      <Route path="/profile/account">
        <PageTitle>Account</PageTitle>
        <Account />
      </Route>
      <Route path="/profile/overview">
        <PageTitle>Overview</PageTitle>
        <Overview />
      </Route>
      <Route path="/profile/settings">
        <PageTitle>Settings</PageTitle>
        <Settings />
      </Route>
      <Redirect from="/profile" exact={true} to="/profile/overview" />
      <Redirect to="/profile/overview" />
      </HashRouter>
    </Switch>
  );
};

export { ProfilePage };

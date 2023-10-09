import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Redirect, Switch, useHistory } from "react-router-dom";
import * as auth from "./redux/AuthRedux";
import { persistor } from "../../../setup/redux/Store";

export function Logout() {
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    persistor.purge();
    dispatch(auth.actions.logout());
    localStorage.removeItem("user");
    history.push("/");
    document.location.reload();
  }, []);

  // useEffect(() => {
  //   //localStorage.removeItem("user");
  //   history.push("/");
  //   document.location.reload();
  // }, []);
  return null;
  // return (
  //   <Switch>
  //     <Redirect to="/auth/login" />
  //   </Switch>
  // );
}

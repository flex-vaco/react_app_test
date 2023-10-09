import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Redirect, Switch, useHistory } from "react-router-dom";
import * as auth from "./redux/AuthRedux";

export function Logout() {
  const history = useHistory();

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(auth.actions.logout());
  //   document.location.reload();
  // }, [dispatch]);
  useEffect(()=>{
    localStorage.removeItem("user");
    history.push("/")
    document.location.reload();
  },[])
  return null
  // return (
  //   <Switch>
  //     <Redirect to="/auth/login" />
  //   </Switch>
  // );
}

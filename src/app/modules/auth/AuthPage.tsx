import React, { useEffect } from "react";
import { Redirect, Route, Switch, Link, HashRouter } from "react-router-dom";
import { Registration } from "./components/Registration";
import { ForgotPassword } from "./components/ForgotPassword";
import { Login } from "./components/Login";
import { toAbsoluteUrl } from "../../../_start/helpers";

export function AuthPage() {
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="d-flex flex-column flex-lg-row flex-column-fluid"
        id="kt_login"
      >
        {/* Aside */}
        <div className="d-flex flex-column flex-lg-row-auto bg-primary w-lg-600px pt-15 pt-lg-0">
          {/* Top */}
          <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15 text-center">
            {/* begin::Aside Logo */}
            <br />
            <br />
            <br />
            <br />
            <span className="mb-6 mt-50">
              <img
                alt="Logo"
                src={toAbsoluteUrl("/media/logos/logo-calypso.svg")}
              />
            </span>
            {/* end::Aside Logo */}
            <br /> <br /> <br />
            {/* begin::Aside Subtitle */}
            <span className="fw-bold fs-2x text-white lh-lg">
              Restricted Access
            </span>
            <br />
            {/* end::Aside Subtitle */}

            {/* Bottom */}
            <span className="ps-20 ms-20 text-white fs-3 me-20 pe-20">
            Use of this application is strictly controlled. Any unauthorized use of the application will be prosecuted to the fullest extent of the law. All access is logged and proactively audited.
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="login-content flex-lg-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden py-20 px-10 p-lg-7 mx-auto mw-450px w-100">
          <div className="d-flex flex-column-fluid flex-center py-10">
            <Switch>
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/registration" component={Registration} />
                <Route
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
            </Switch>
          </div>
          <div className="d-flex justify-content-lg-start justify-content-center align-items-center py-7 py-lg-0">
            <span className="text-danger fw-bold fs-5"> Terms of Use </span>
            <span className="text-danger ms-10 fw-bold fs-5"> Support </span>
            <span className="text-danger ms-10 fw-bold fs-5"> Contact Us </span>
          </div>
        </div>
      </div>
    </div>
  );
}

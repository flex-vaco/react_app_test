import React, { Suspense, lazy } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { FallbackView } from "../../_start/partials";
import { ExtendedDashboardWrapper } from "../pages/dashboards/extended-dashboard/ExtendedDashboardWrapper";
import { LightDashboardWrapper } from "../pages/dashboards/light-dashboard/LightDashboardWrapper";
import { CompactDashboardWrapper } from "../pages/dashboards/compact-dashboard/CompactDashboardWrapper";
import { StartDashboardWrapper } from "../pages/dashboards/start-dashboard/StartDashboardWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";

import { AdminDashboardWrapper } from "../pages/dashboards/admin-dashboard/AdminDashboardWrapper";
import { ManagerDashboardWrapper } from "../pages/dashboards/manager-dashboard/ManagerDashboardWrapper";
import { AnalyticsDashboardWrapper } from "../pages/dashboards/analytics-dashboard/AnalyticsDashboardWrapper";
import store from "../../setup/redux/Store";

export function PrivateRoutes() {
  const BuilderPageWrapper = lazy(
    () => import("../pages/layout-builder/BuilderPageWrapper")
  );
  const ProfilePageWrapper = lazy(
    () => import("../modules/profile/ProfilePageWrapper")
  );
  const ChagePage = lazy(() => import("../modules/apps/chat/ChatPageWrapper"));
  const ShopPageWrapper = lazy(
    () => import("../modules/apps/shop/ShopPageWrapper")
  );
  const CalypsoPage = lazy(() => import("../modules/apps/calypso/CalypsoPage"));
  const GeneralPageWrapper = lazy(
    () => import("../modules/general/GeneralPageWrapper")
  );
  const DocsPageWrapper = lazy(() => import("../modules/docs/DocsPageWrapper"));

  const userDashboard = () => {
    const {
      auth: { accessToken },
    } = store.getState();


    const {
      auth: { user },
    } = store.getState();


    //const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    if (!accessToken) return "/";
  
    switch (user?.typeid) {
      case 1:
        return "/calypso/manager-dashboard";
      case 2:
        return "/extended";
      default:
        return "/shop/shop-1";
    }
  };

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <HashRouter>
          <Route path="/admin-dashboard" component={AdminDashboardWrapper} />
          <Route path="/calypso" component={CalypsoPage} />
          <Route path="/dashboard" component={StartDashboardWrapper} />
          <Route path="/extended" component={ExtendedDashboardWrapper} />
          <Route path="/light" component={LightDashboardWrapper} />
          <Route path="/compact" component={CompactDashboardWrapper} />
          <Route path="/builder" component={BuilderPageWrapper} />
          <Route path="/general" component={GeneralPageWrapper} />
          <Route path="/chat" component={ChagePage} />
          <Route path="/shop" component={ShopPageWrapper} />
          <Route path="/profile" component={ProfilePageWrapper} />
          <Route path="/menu-test" component={MenuTestPage} />
          <Route path="/docs" component={DocsPageWrapper} />
          <Route
            path="/analytics-dashboard"
            component={AnalyticsDashboardWrapper}
          />
          <Redirect from="/auth" to={userDashboard()} />
          <Redirect exact from="/" to={userDashboard()} />
          {/* <Redirect to="error/404" /> */}
        </HashRouter>
      </Switch>
    </Suspense>
  );
}

import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IThemeConfig, getConfig, useTheme } from "../../../../_start/layout/core";
import { UserAdminPage } from "../../../pages/dashboards/users-admin/UserAdminPage";
import { ProjectAdminPage } from "../../../pages/dashboards/projects-admin/ProjectAdminPage";
import { WorkFlowAdminPage } from "../../../pages/dashboards/workflows-admin/WorkFlowAdminPage";
import { TaskAdminPage } from "../../../pages/dashboards/tasks-admin/TaskAdminPage";
import { ManagerDashboardPage } from "../../../pages/dashboards/manager-dashboard/ManagerDashboardPage";
import { AddUser } from "../../../pages/dashboards/users-admin/AddUser";
import { EditUser } from "../../../pages/dashboards/users-admin/EditUser";
import { AddProject } from "../../../pages/dashboards/projects-admin/AddProject";
import { EditProject } from "../../../pages/dashboards/projects-admin/EditProject";
import { AddWorkFlow } from "../../../pages/dashboards/workflows-admin/AddWorkFlow";
import { EditWorkFlow } from "../../../pages/dashboards/workflows-admin/EditWorkFlow";
import { EditTask } from "../../../pages/dashboards/tasks-admin/EditTask";
import { AddTask } from "../../../pages/dashboards/tasks-admin/AddTask";
import { AnalyticsDashboardPage } from "../../../pages/dashboards/analytics_dashboard_page";
import { AnalyticsPage } from "../../../pages/dashboards/analytics/AnalyticsPage";

const defaultPageConfig = getConfig();

const dashboardPageConfig: Partial<IThemeConfig> = {
    aside: {
      ...defaultPageConfig.aside,
      display: true,
      primaryDisplay: true,
      secondaryDisplay: false,
      toggle: false,
      minimized: false,
    },
    toolbar: {
      ...defaultPageConfig.toolbar,
      display: false,
    },
    sidebar: {
      ...defaultPageConfig.sidebar,
      display: false,
    },
  };

export function CalypsoPage() {
    const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(dashboardPageConfig);
    return () => {
      setTheme(defaultPageConfig);
    };
  }, []);

  return (
    <Switch>
        <Route path="/calypso/analytics" component={AnalyticsPage} />
        <Route exact path="/calypso/project-admin" component={ProjectAdminPage} />
        <Route path="/calypso/project-admin/add" component={AddProject} />
        <Route path="/calypso/project-admin/edit" component={EditProject} />
        <Route exact path="/calypso/user-admin" component={UserAdminPage} />
        <Route path="/calypso/user-admin/add" component={AddUser} />
        <Route path="/calypso/user-admin/edit" component={EditUser} />
        <Route exact path="/calypso/workflow-admin" component={WorkFlowAdminPage} />
        <Route path="/calypso/workflow-admin/add" component={AddWorkFlow} />
        <Route path="/calypso/workflow-admin/edit" component={EditWorkFlow} />
        <Route exact path="/calypso/task-admin" component={TaskAdminPage} />
        <Route path="/calypso/task-admin/add" component={AddTask} />
        <Route path="/calypso/task-admin/edit" component={EditTask} />
        <Route exact path="/calypso/manager-dashboard" component={ManagerDashboardPage} />
        <Route exact path="/calypso/analytics-dashboard" component={AnalyticsDashboardPage} />
        <Redirect from="/calypso" exact={true} to="/calypso/manager-dashboard" />
        <Redirect to="/calypso/user-admin" />
    </Switch>
  );
}

export default CalypsoPage;

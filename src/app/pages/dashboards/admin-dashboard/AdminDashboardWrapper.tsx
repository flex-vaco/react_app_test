/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  IThemeConfig,
  useTheme,
  getConfig,
  PageTitle,
} from "../../../../_start/layout/core";
import { AdminDashboardPage } from "./AdminDashboardPage";

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

export function AdminDashboardWrapper() {
  const { setTheme } = useTheme();
  // Refresh UI after config updates
  useEffect(() => {
    setTheme(dashboardPageConfig);
    return () => {
      setTheme(defaultPageConfig);
    };
  }, []);

  return (
    <>
      <AdminDashboardPage />
      <PageTitle>Admin Dashboard</PageTitle>
    </>
  );
}

import React from "react";

export const AnalyticsDashboardPage: React.FC = () => {
  return (
    <iframe
      src="/analytics/index.html"
      sandbox="allow-scripts"
      loading="eager"
      style={{ height: "100%", width: "100%" }}
    ></iframe>
  );
};

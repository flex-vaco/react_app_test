/* eslint-disable jsx-a11y/anchor-is-valid */
//RV: created from dashbord page
import React from "react";
import {
  StatsWidget1,
  StatsWidget2,
  DataTable
} from "../../../../_start/partials/widgets";

export const AdminDashboardPage: React.FC = () => {
  return (
    <>
      {/*begin::Row*/}
      <div className="row g-0 g-xl-5 g-xxl-8">
        <div className="col-xl-4">
          <StatsWidget1 className="card-stretch mb-5 mb-xxl-8" />
        </div>

        <div className="col-xl-8">
          <StatsWidget2 className="card-stretch mb-5 mb-xxl-8" />
        </div>
      </div>
      {/*end::Row*/}

      {/*begin::Row*/}
      <div className="row g-0 g-xl-5 g-xxl-8">
        <div className="col-xl-12">
          <DataTable className="card-stretch" entity="users" />
        </div>
      </div>
      {/*end::Row*/}

      {/*begin::Row*/}
            <div className="row g-0 g-xl-5 g-xxl-8">
        <div className="col-xl-12">
          <DataTable className="card-stretch" entity="projects" />
        </div>
      </div>
      {/*end::Row*/}
    </>
  );
};

/* eslint-disable jsx-a11y/anchor-is-valid */
//RV: created from dashbord page
import React from "react";
import {
  DataTable
} from "../../../../_start/partials/widgets";
export const WorkFlowAdminPage: React.FC = () => {
  const context = "edit"
  return (
    <>
      {/*begin::Row*/}
      <div className="row g-0 g-xl-5 g-xxl-8">
        <div className="col-xl-12">
          <DataTable className="card-stretch" entity="workflows" />
        </div>
      </div>
      {/*end::Row*/}
    </>
  );
};

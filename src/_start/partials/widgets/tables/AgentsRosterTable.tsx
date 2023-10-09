import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "react-bootstrap-v5";

import moment from "moment";
import DataTables from "datatables.net";
import { DropdownDataTable } from "../../content/dropdown/DropdownDataTable";
import { KTSVG } from "../../../helpers";

declare global {
  interface Window {
    $: JQuery;
    DataTable: any; // Add this if DataTables doesn't export a TypeScript-friendly object
  }
}
type Props = {
  className: string;
  innerPadding?: string;
};
const AgentsRosterTable: React.FC<Props> = ({ className }) => {
  const tableDataAPIURL = "https://coe-project001.uc.r.appspot.com/portal/datatable";
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch(tableDataAPIURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        report_code: "tbl_roster_project",
        flt_projects: "",
        flt_time: "c1w"
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (tableRef.current) {
          new DataTables(tableRef.current, {
            data: data,
            columns: [
              { title: "Agent ID", data: "uid" },
              { title: "Qty. of Tasks", data: "task_qty" },
              { title: "Duration", data: "duration" },
              { title: "Handle Time Avg.", data: "handle_time" },
              { title: "No. of Workflows", data: "workflow_distinct_qty" },
              { title: "No. of Tasks", data: "task_distinct_qty" },
              {
                title: "Last Login",
                data: "date_last_login",
                render: function (data, type, row, meta) {
                  return moment.utc(data).local().format("M/D/YY h:mm A");
                },
              },
              { title: "Tags", data: "tags" },
            ],
          });
        }
        setLoading(false)
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5 mb-2">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark"> Agents Roster</span>
          <span className="text-muted mt-3 fw-bold fs-7">
            Top 50 agents that worked on a task in this scope. To expand, click
            here.
          </span>
        </h3>
        <div className="card-toolbar">
          <div className="card-toolbar">
            {/* begin::Dropdown */}
            <button
              type="button"
              className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-flip="top-end"
              disabled
            >
              <KTSVG
                path="/media/icons/duotone/Layout/Layout-4-blocks-2.svg"
                className="svg-icon-1"
              />
            </button>
            <DropdownDataTable />
            {/* end::Dropdown */}
          </div>
          {/* <a href="#" className="btn btn-primary fw-bolder fs-7">
          ADD {tableHeading.toUpperCase()}
        </a> */}
        </div>
      </div>
      {/* end::Header*/}
      {/* {loading && (
            <h3 className="indicator-progress text-center mt-20 text-muted" style={{ display: "block" }}>          
              Fetching data. <br /> Please wait...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </h3>
      )}
      {!loading &&  */}
      <div className="card-body py-3 mt-3">
        <div className="table-responsive">
          <table
            className="table table-row-dashed stripe table-row-gray-300 align-middle gs-0 gy-4"
            ref={tableRef}
          ></table>
        </div>
      </div>
      {/* } */}
    </div>
  );
};

export default AgentsRosterTable;

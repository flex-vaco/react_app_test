/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Props, useState } from "react";
import { KTSVG } from "../../../helpers";
import { Link, useHistory } from "react-router-dom";

interface DropdownData {
}

export const DropdownDataTable: React.FC<DropdownData> = (props) => {
  const history = useHistory();

  const [searchVal, setSearchVal] = useState("");
  const [showCreateAppModal, setShowCreateAppModal] = useState(false);
  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column w-300px w-lg-350px p-5"
      data-kt-menu="true"
    >
      {/* <!--begin::Input--> */}
      <div className="input-group input-group-solid mb-5">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <KTSVG
              className="svg-icon-4"
              path="/media/icons/duotone/General/Search.svg"
            />
          </span>
        </div>
        <input
          type="text"
          className="form-control ps-0"
          name="search"
          value={searchVal}
          placeholder="Search"
          onChange={(e) => {
            setSearchVal(e.target.value);
          }}
        />
      </div>
      {/* <!--end::Input--> */}
      {/* <!--begin::actions--> */}
      <div data-kt-menu="true">
        <div className="menu-item px-3">
          <Link to={history.location.pathname + "/add"}>
            <KTSVG
              className="svg-icon-2 svg-icon-lg-1"
              path="/media/icons/duotone/Navigation/Plus.svg"
            />
            &nbsp;Add
          </Link>
        </div>
      </div>
      {/* <!--end::actions--> */}
    </div>
  );
};

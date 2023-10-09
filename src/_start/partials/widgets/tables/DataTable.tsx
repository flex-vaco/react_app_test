/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useMemo} from "react";
import { KTSVG } from "../../../helpers";
import axios from "axios";
import Pagination from "../../utils/pagination/Pagination"
import { DropdownDataTable } from "../../content/dropdown/DropdownDataTable";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import * as Utils from "../../../../app/utils/utilites";

type Props = {
  className: string;
  innerPadding?: string;
  color?: string;
  entity: string;
  tableData?: any[];
  tableHeaders?: any[];
};

const DataTable: React.FC<Props> = ({
  className,
  entity = "",
}) => {
  const history = useHistory();
  const tableHeading = entity;
    const [resultList, setResultList] = useState<any[]>([]) //<AxiosResponse | null | void>(null);
    const [headers, setHeaders] = useState<any[]>([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [PageSize, setPageSize] = useState(10);
    const [searchVal, setSearchVal] = useState("");

    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return resultList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, resultList, PageSize]);

  const handleDeleteRecord = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#B1060F',
      cancelButtonColor: '#D9214E',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const API_URL = `${process.env.REACT_APP_API_URL}${entity}/${id}`;
        axios.delete(API_URL)
          .then((response) => {
            setDataChanged(!dataChanged)
          })
          .catch((error) => {
            console.error("Error Deleting: ", error)
          })
      }
    })
  }

  useEffect(()=>{
    const API_URL = process.env.REACT_APP_API_URL+entity;
    axios.get(API_URL).then(res=>{
      setResultList(res?.data)
      setHeaders(Object.keys(res?.data[0]))
      })
      .catch(err=>{
      console.error(`Error Fetching ${entity}: `, err)
      });
  },[entity, dataChanged]);
    
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark">{tableHeading.toUpperCase().replace('_', ' ')}</span>
          <span className="text-muted mt-3 fw-bold fs-7">
            {resultList.length} {tableHeading.replace('_', ' ')}
          </span>
        </h3>
        <div className="card-toolbar align-items-end">
          {/* <!--begin::Search--> */}
          {/* <div className="input-group input-group-solid mb-5">
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
          </div> */}
          {/* <!--end::Search--> */}
          </div>
          <div className="card-toolbar align-items-end">
          {/* begin::Dropdown */}
          <button
            type="button"
            className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
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
      {/* end::Header*/}

      {/* begin::Body*/}
      <div className="card-body py-0">
        {/* begin::Table*/}
        {resultList.length === 0 ? (
          <div className="d-flex bg-dark bg-opacity-5 align-items-center justify-content-center h-100">
            <br/>
            <div
              className="d-flex spinner-border text-primary align-items-center"
              role="status"
            ></div>
          </div>
        ) : (
          <div className="table-responsive">
            <table
              className="table align-middle border-gray-100"
              id="kt_advance_table_widget_4"
            >
              <thead>
                <tr className="text-start text-muted fw-bolder text-gray-400 text-uppercase fs-7 border-gray-100 border-bottom-1">
                  <td>
                    <div className="form-check form-check-custom form-check-sm form-check-solid me-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="0"
                      />
                    </div>
                  </td>
                  {headers.map((item, key) => {
                    return (
                      <td id={key.toString()} className="ps-0 min-w-30px py-5">
                        {item}
                      </td>
                    );
                  })}
                  <td className="min-w-10px pe-0 text-end py-5">Action</td>
                </tr>
              </thead>
              <tbody>
                {currentTableData.map((item, key) => {
                  return (
                    <tr id={key.toString()} key={key.toString()}>
                      <td>
                        <div className="form-check form-check-custom form-check-sm form-check-solid me-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="0"
                          />
                        </div>
                      </td>
                      {headers.map((header_key, key) => {
                        return (
                          <td id={key.toString()} key={key.toString()}>
                            {(header_key.search("date_") >= 0) ? Utils.formatDate(item[header_key]) : (item[header_key] || "--")}
                          </td>
                        );
                      })}
                      <td className="pe-0 text-end">
                        <Link 
                          className="btn btn-icon btn-bg-light  btn-color-muted btn-active-color-primary btn-sm"
                          to={{
                            pathname: history.location.pathname + "/edit",
                            state: { data: item }
                          }}
                        >
                          <KTSVG
                              className="svg-icon-4"
                              path="/media/icons/duotone/Communication/Write.svg"
                            />
                        </Link>
                        &nbsp;
                        <button
                          className="btn btn-icon btn-bg-light  btn-color-muted btn-active-color-primary btn-sm"
                          id={item.id}
                          onClick={()=>handleDeleteRecord(item.id)}
                        >
                          <KTSVG
                            className="svg-icon-4"
                            path="/media/icons/duotone/General/Trash.svg"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          {/* end::Table*/}
          </div>
        )}
      </div>
      {/* begin::Footer*/}
      <div className="card-footer row pt-3 pb-5">
        <div className="d-flex col-1 justify-content-start">
          <select id="pagesize" value={PageSize} onChange={e=> setPageSize(parseInt(e.target.value))} className="form-select">
            <option value="5"> 5 </option>
            <option value="10"> 10 </option>
            <option value="25"> 25 </option>
            <option value="50"> 50 </option>
          </select>  
        </div>
        <div className="d-flex col-11 justify-content-end">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={resultList.length}
            pageSize={PageSize}
            onPageChange={(page: React.SetStateAction<number>) => setCurrentPage(page)}
          />
        </div>
      </div>
      {/* end::Footer*/}
    </div>
  );
};

export { DataTable };

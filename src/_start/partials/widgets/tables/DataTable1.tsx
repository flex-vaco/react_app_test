/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useMemo} from "react";
import { KTSVG } from "../../../helpers";
import axios from "axios";
import Pagination from "../../utils/pagination/Pagination"
import { DropdownDataTable } from "../../content/dropdown/DropdownDataTable";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
// import { EditTaskModal } from "../../../../app/pages/dashboards/tasks-admin/EditTask";
// import { EditUserModel } from "../../../../app/pages/dashboards/users-admin/EditUser";
// import { EditProjectModal } from "../../../../app/pages/dashboards/projects-admin/EditProject";
// import { EditWorkflowModal } from "../../../../app/pages/dashboards/workflows-admin/EditWorkFlow";

type Props = {
  className: string;
  innerPadding?: string;
  color?: string;
  entity: string;
  heading?: string;
  tableData: any[];
  tableHeaders: any[];
};

let PageSize = 10;

const DataTable1: React.FC<Props> = ({
  className,
  entity,
  heading,
  tableData,
  tableHeaders
}) => {
    const history = useHistory();
    const [resultList, setResultList] = useState(tableData) //<AxiosResponse | null | void>(null);
    const [tableHeading, setTableHeading] = useState(heading || entity);
    const [headers, setHeaders] = useState(tableHeaders);
    const [dataChanged, setDataChanged] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [showEditProjectModal, setShowEditProjectModal] = useState(false);
    const [showEditWorkflowModal, setShowEditWorkFlowModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [editableItem, setEditableItem] = useState<any>({});
    const [editUrl, setEditUrl] = useState('');

    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return resultList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, resultList]);

  const handleDeleteRecord = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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
  const getEditUrl = (entity: string): string =>{
    switch(entity){
      case "workflow_tasks":
        return "/calypso/task-admin/edit"
        break;
      case "users":
        return "/calypso/user-admin/edit"
        break;
      case "projects":
        return "/calypso/project-admin/edit"
        break;
      case "workflows":
        return "/calypso/workflow-admin/edit"
        break;
      default:
        return ''
    }
  }

  const handleEditRecord = (id: number, entity: string, item: any) => {
    switch(entity){
      case "workflow_tasks":
        setEditableItem(item);
        setShowEditTaskModal(true);
        setShowEditUserModal(false);
        setShowEditWorkFlowModal(false);
        setShowEditProjectModal(false);
        break;
      case "users":
        setEditableItem(item);
        setShowEditTaskModal(false);
        setShowEditUserModal(true);
        setShowEditWorkFlowModal(false);
        setShowEditProjectModal(false);
        break;
      case "projects":
        setEditableItem(item);
        setShowEditTaskModal(false);
        setShowEditUserModal(false);
        setShowEditWorkFlowModal(false);
        setShowEditProjectModal(true);
        break;
      case "workflows":
        setEditableItem(item);
        setShowEditTaskModal(false);
        setShowEditUserModal(true);
        setShowEditWorkFlowModal(true);
        setShowEditProjectModal(false);
        break;
      default:
        setEditableItem({});
        setShowEditProjectModal(false);
        setShowEditTaskModal(false);
        setShowEditUserModal(false);
        setShowEditWorkFlowModal(false);
    }
  }

    
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark">{tableHeading.toUpperCase()}</span>
          <span className="text-muted mt-3 fw-bold fs-7">
            {resultList.length} {tableHeading}
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
                    <tr id={key.toString()}>
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
                          <td id={key.toString()}>
                            {(item[header_key] === null) ? "--" : item[header_key]}
                          </td>
                        );
                      })}
                      <td className="pe-0 text-end">
                        <Link 
                          className="btn btn-icon btn-bg-light  btn-color-muted btn-active-color-primary btn-sm mx-3"
                          to={{
                            pathname: getEditUrl(entity),
                            state: { data: item }
                          }}
                        >
                          <KTSVG
                            className="svg-icon-4"
                            path="/media/icons/duotone/Communication/Write.svg"
                          />
                        </Link>
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
            <div className="d-flex justify-content-end">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={resultList.length}
                pageSize={PageSize}
                onPageChange={(page: React.SetStateAction<number>) => setCurrentPage(page)}
              />
            </div>
          </div>
        )}
        {/* end::Table*/}
      </div>
      {/* begin::Modals */}
      {/* <EditTaskModal
        show={showEditTaskModal}
        handleClose={() => setShowEditTaskModal(false)}
        task={editableItem}
      />
      <EditUserModel
        show={showEditUserModal}
        handleClose={() => setShowEditUserModal(false)}
        user={editableItem}
      />
      <EditProjectModal
        show={showEditProjectModal}
        handleClose={() => setShowEditProjectModal(false)}
        project={editableItem}
      />
      <EditWorkflowModal
        show={showEditWorkflowModal}
        handleClose={() => setShowEditWorkFlowModal(false)}
        workflow={editableItem}
      /> */}
      {/* end::Modals */}
      {/* end::Body*/}
    </div>
  );
};

export { DataTable1 };

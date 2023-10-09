/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import clsx from "clsx";
// import Swal from "sweetalert2";
// import { Modal } from "react-bootstrap-v5";
import { useHistory } from "react-router-dom";
import { TaskForm } from "./TaskForm";

// type Props = {
//   show: boolean;
//   handleClose: () => void;
//   task: any;
// };
// const initialValues: any = {};

// const taskSchema = Yup.object().shape({
//   id: Yup.number().required("Task ID is required"),
//   flow_id: Yup.number().required("Workflow ID is required"),
//   task_code: Yup.string()
//     .min(3, "Minimum 3 symbols")
//     .max(50, "Maximum 50 symbols")
//     .required("Public ID is required"),
//   task_name: Yup.string()
//     .min(3, "Minimum 3 symbols")
//     .max(50, "Maximum 50 symbols")
//     .required("Public ID is required"),
//   task_shortdesc: Yup.string()
//     .min(3, "Minimum 3 symbols")
//     .max(50, "Maximum 100 symbols")
//     .required("Public ID is required"),
//   sort_order: Yup.number().required("Project ID is required"),
//   status_id: Yup.number(),
//   type_id: Yup.number().required("Type ID is required"),
// });

// const EditTaskModal: React.FC<Props> = ({ show, handleClose, task }) => {
//   const [status_id, setStatusId] = useState(task.status_id);
//   const [sort_order, setSortOrder] = useState(task.sort_order);

//   const [loading, setLoading] = useState(false);

//   const handleCancel = () => {
//     formik.resetForm();
//     handleClose();
//   };

//   useEffect(() => {
//     formik.setValues(task);
//     formik.isSubmitting = false;
//     formik.isValid = true;
//   }, [task]);

//   const formik = useFormik({
//     initialValues,
//     validationSchema: taskSchema,
//     onSubmit: (values, { setStatus, setSubmitting }) => {
//       setLoading(true);
//       values.status_id = task.status_id;
//       values.sort_order = task.sort_order;
//       const API_URL = `${process.env.REACT_APP_API_URL}workflow_tasks/${values.id}`;

//       delete values.id;
//       delete values.date_added;
//       setTimeout(() => {
//         axios
//           .put(API_URL, values)
//           .then((res) => {
//             Swal.fire({ icon: "success", title: "Updated Task!" }).then(() => {
//               setLoading(false);
//               setSubmitting(false);
//               window.location.reload();
//             });
//           })
//           .catch((error) => {
//             console.error("Error Saving Task: ", error);
//             setLoading(false);
//             setSubmitting(false);
//             setStatus("Error Saving Task");
//           });
//       }, 1000);
//     },
//   });

//   return (
//     <Modal
//       id="kt_modal_create_app"
//       tabIndex={-1}
//       aria-hidden="true"
//       dialogClassName="modal-dialog-centered mw-1000px h-auto"
//       show={show}
//       onHide={handleClose}
//     >
//       <div className="modal-content">
//         <div className="modal-body">
//           <form
//             className="form w-100"
//             noValidate
//             id="kt_login_signup_form"
//             onSubmit={formik.handleSubmit}
//           >
//             <div className="row">
//               <div className="col-3">
//                 <h5 className="modal-title ms-3">EDIT TASK</h5>
//               </div>
//               <div className="col-9 text-right">
//                 <button
//                   type="submit"
//                   id="kt_login_signup_form_submit_button"
//                   className="btn btn-primary fw-bolder btn-sm ms-2 float-end"
//                   disabled={formik.isSubmitting || !formik.isValid}
//                 >
//                   {!loading && <span className="indicator-label">Submit</span>}
//                   {loading && (
//                     <span
//                       className="indicator-progress"
//                       style={{ display: "block" }}
//                     >
//                       Please wait...{" "}
//                       <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//                     </span>
//                   )}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-light-primary me-3 float-end"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//             {formik.status && (
//               <div className="mb-lg-15 alert alert-danger">
//                 <div className="alert-text font-weight-bold">
//                   {formik.status}
//                 </div>
//               </div>
//             )}
//             <hr className="text-muted"></hr>
//             {/* begin::Form group  */}
//             <div className="row mb-3">
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Type ID
//                 </label>
//                 <input
//                   placeholder="Type ID"
//                   type="number"
//                   autoComplete="off"
//                   //onChange={(e)=>setTypeId(e.target.valueAsNumber)}
//                   {...formik.getFieldProps("type_id")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.type_id && formik.errors.type_id,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.type_id && !formik.errors.type_id,
//                     }
//                   )}
//                 />
//                 {formik.touched.type_id && formik.errors.type_id && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">{formik.errors.type_id}</div>
//                   </div>
//                 )}
//               </div>

//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Workflow ID
//                 </label>
//                 <input
//                   placeholder="Project ID"
//                   type="number"
//                   autoComplete="off"
//                   //onChange={(e)=>setFlowId(e.target.valueAsNumber)}
//                   {...formik.getFieldProps("flow_id")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.flow_id && formik.errors.flow_id,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.flow_id && !formik.errors.flow_id,
//                     }
//                   )}
//                 />
//                 {formik.touched.flow_id && formik.errors.flow_id && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">{formik.errors.flow_id}</div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {/* end::Form group */}
//             {/* begin::Form group */}
//             <div className="row mb-3">
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Task Code
//                 </label>
//                 <input
//                   placeholder="Task code"
//                   type="text"
//                   autoComplete="off"
//                   //onChange={(e)=>setTaskCode(e.target.value)}
//                   {...formik.getFieldProps("task_code")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.task_code && formik.errors.task_code,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.task_code && !formik.errors.task_code,
//                     }
//                   )}
//                 />
//                 {formik.touched.task_code && formik.errors.task_code && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">
//                       {formik.errors.task_code}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Task Name
//                 </label>
//                 <input
//                   placeholder="Name"
//                   type="text"
//                   autoComplete="off"
//                   //onChange={(e)=>setTaskName(e.target.value)}
//                   {...formik.getFieldProps("task_name")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.task_name && formik.errors.task_name,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.task_name && !formik.errors.task_name,
//                     }
//                   )}
//                 />
//                 {formik.touched.task_name && formik.errors.task_name && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">
//                       {formik.errors.task_name}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {/* end::Form group */}
//             {/* begin::Form group */}
//             <div className="row mb-3">
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5 me-5">
//                   Task Status
//                   <input
//                     className="form-check-input ms-5"
//                     type="checkbox"
//                     name="layout-builder[layout][header][fixed][desktop]"
//                     checked={status_id === 1}
//                     onChange={(e) => setStatusId(e.target.checked ? 1 : 0)}
//                   />
//                 </label>
//                 <span>{status_id ? "Active" : "Inactive"}</span>
//                 <br />
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5 me-5">
//                   Sort in Ascending Order
//                   <input
//                     className="form-check-input ms-5"
//                     type="checkbox"
//                     name="layout-builder[layout][header][fixed][desktop]"
//                     checked={sort_order === 1 ? true : false}
//                     onChange={(e) => setSortOrder(e.target.checked ? 1 : 0)}
//                   />
//                 </label>
//                 <span>{sort_order ? "Yes" : "No"}</span>
//               </div>
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Task Short Description
//                 </label>
//                 <textarea
//                   rows={2}
//                   autoComplete="off"
//                   //onChange={(e)=>setTskShortDesc(e.target.value)}
//                   {...formik.getFieldProps("task_shortdesc")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.task_shortdesc &&
//                         formik.errors.task_shortdesc,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.task_shortdesc &&
//                         !formik.errors.task_shortdesc,
//                     }
//                   )}
//                 />
//                 {formik.touched.task_shortdesc &&
//                   formik.errors.task_shortdesc && (
//                     <div className="fv-plugins-message-container">
//                       <div className="fv-help-block">
//                         {formik.errors.task_shortdesc}
//                       </div>
//                     </div>
//                   )}
//               </div>
//             </div>
//             {/* end::Form group */}
//           </form>
//         </div>
//       </div>
//     </Modal>
//   );
// };
// export { EditTaskModal };

export const EditTask: React.FC<{}> = () => {
  const history = useHistory();
  return (
    <div className="modal-content">
      <div className="modal-body">
        <TaskForm
          data={(history.location.state as any).data}
          isEdit={true}
        />
      </div>
    </div>
  );
};

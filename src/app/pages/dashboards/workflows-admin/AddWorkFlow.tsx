/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import clsx from "clsx";
// import Swal from "sweetalert2";
import { WorkFlowForm } from "./WorkFlowForm";

// const initialValues = {
//     flow_code: "",
//     flow_name: "",
//     flow_shortdesc: "",
//     project_id: 0,
//     status_id: 0,
//     type_id: 0
// };

// const workflowSchema = Yup.object().shape({
//   flow_code: Yup.string()
//     .min(3, "Minimum 3 symbols")
//     .max(50, "Maximum 50 symbols")
//     .required("Public ID is required"),
//   flow_name: Yup.string()
//     .min(3, "Minimum 3 symbols")
//     .max(50, "Maximum 50 symbols")
//     .required("Public ID is required"),
//   flow_shortdesc: Yup.string()
//     .min(3, "Minimum 3 symbols")
//     .max(50, "Maximum 50 symbols")
//     .required("Public ID is required"),
//   project_id: Yup.number().required("Project ID is required"),
//   status_id: Yup.number(),
//   type_id: Yup.number().required("Type ID is required"),
// });

// export function AddWorkFlow() {
//   const [status_id, setStatusId] = useState(0);
  
//   const [loading, setLoading] = useState(false);

//   const handleCancel = () => {
//     formik.resetForm();
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: workflowSchema,
//     onSubmit: (values, { setStatus, setSubmitting }) => {
//       setLoading(true);
//       values.status_id = status_id;
//       setTimeout(() => {
//       const API_URL = process.env.REACT_APP_API_URL+"workflows";
//       axios.post(API_URL, values)
//           .then((res) =>{
//             Swal.fire({icon:"success", title:"Saved Workflow!"}).then(() => {
//               setLoading(false);
//               setSubmitting(false);
//               window.location.reload()
//             })
//           })
//           .catch((error) => {
//             console.error("Error Saving Task: ", error)
//             setLoading(false);
//             setSubmitting(false);
//             setStatus("Error Saving Task");
//           })
//         }, 1000);
        
//     },
//   });

//   return (
//     <>
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
//                 <h5 className="modal-title">ADD WORKFLOW</h5>
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
//                   //onChange={(e) => setTypeId(e.target.valueAsNumber)}
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
//                   Project ID
//                 </label>
//                 <input
//                   placeholder="Project ID"
//                   type="number"
//                   autoComplete="off"
//                   //onChange={(e) => setProjectID(e.target.valueAsNumber)}
//                   {...formik.getFieldProps("project_id")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.project_id && formik.errors.project_id,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.project_id && !formik.errors.project_id,
//                     }
//                   )}
//                 />
//                 {formik.touched.project_id && formik.errors.project_id && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">
//                       {formik.errors.project_id}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {/* end::Form group */}
//             {/* begin::Form group */}
//             <div className="row mb-3">
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Workflow Code
//                 </label>
//                 <input
//                   placeholder="Workflow code"
//                   type="text"
//                   autoComplete="off"
//                   //onChange={(e) => setFlowCode(e.target.value)}
//                   {...formik.getFieldProps("flow_code")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.flow_code && formik.errors.flow_code,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.flow_code && !formik.errors.flow_code,
//                     }
//                   )}
//                 />
//                 {formik.touched.flow_code && formik.errors.flow_code && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">
//                       {formik.errors.flow_code}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Workflow Name
//                 </label>
//                 <input
//                   placeholder="Name"
//                   type="text"
//                   autoComplete="off"
//                   //onChange={(e) => setFlowName(e.target.value)}
//                   {...formik.getFieldProps("flow_name")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.flow_name && formik.errors.flow_name,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.flow_name && !formik.errors.flow_name,
//                     }
//                   )}
//                 />
//                 {formik.touched.flow_name && formik.errors.flow_name && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">{formik.errors.flow_name}</div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {/* end::Form group */}
//             {/* begin::Form group */}
//             <div className="row mb-3">
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5 me-5">
//                   Workflow Status
//                   <input
//                     className="form-check-input ms-5"
//                     type="checkbox"
//                     name="layout-builder[layout][header][fixed][desktop]"
//                     checked={status_id === 1 ? true : false}
//                     onChange={(e) => setStatusId(e.target.checked ? 1 : 0)}
//                   />
//                 </label>
//                 <span>{status_id ? "Active" : "Inactive"}</span>
//               </div>
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Workflow Short Description
//                 </label>
//                 <textarea
//                   rows={2}
//                   autoComplete="off"
//                   //onChange={(e) => setFlowShortDesc(e.target.value)}
//                   {...formik.getFieldProps("flow_shortdesc")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.flow_shortdesc &&
//                         formik.errors.flow_shortdesc,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.flow_shortdesc &&
//                         !formik.errors.flow_shortdesc,
//                     }
//                   )}
//                 />
//                 {formik.touched.flow_shortdesc &&
//                   formik.errors.flow_shortdesc && (
//                     <div className="fv-plugins-message-container">
//                       <div className="fv-help-block">
//                         {formik.errors.flow_shortdesc}
//                       </div>
//                     </div>
//                   )}
//               </div>
//             </div>
//             {/* end::Form group */}
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

export const AddWorkFlow: React.FC<{}> = () => {
  return (
    <div className="modal-content">
      <div className="modal-body">
        <WorkFlowForm data={null} isEdit={false} />
      </div>
    </div>
  );
};
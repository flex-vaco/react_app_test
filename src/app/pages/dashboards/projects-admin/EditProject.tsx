/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import clsx from "clsx";
// import Swal from "sweetalert2";
// import { Modal } from "react-bootstrap-v5";
import { ProjectForm } from "./ProjectForm";
import { useHistory } from "react-router-dom";

// type Props = {
//   show: boolean;
//   handleClose: () => void;
//   project: any;
// };
// const initialValues: any = {};

// const projectSchema = Yup.object().shape({
//   pub_id: Yup.string()
//     .min(3, "Minimum 3 symbols")
//     .max(50, "Maximum 50 symbols")
//     .required("Public ID is required"),
//   project_code: Yup.string()
//     .min(3, "Minimum 3 symbols")
//     .max(50, "Maximum 50 symbols")
//     .required("Project code is required"),
//   project_shortdesc: Yup.string()
//     .min(3, "Minimum 10 symbols")
//     .max(500, "Maximum 500 symbols"),
//   project_name: Yup.string()
//     .min(3, "Minimum 3 symbols")
//     .max(50, "Maximum 50 symbols")
//     .required("Project name is required"),
//   client_id: Yup.number().required("Client ID is required"),
//   status_id: Yup.number(),
//   is_log_url: Yup.number(),

// });

// export const EditProjectModal: React.FC<Props> = ({ show, handleClose, project }) => {
//   const [status_id, setStatusId] = useState(project.status_id);
//   const [is_log_url, setIsLogURL] = useState(project.is_log_url);

//   const [loading, setLoading] = useState(false);

//   const handleCancel = () => {
//     formik.resetForm();
//     handleClose();
//   };

//   useEffect(() => {
//     formik.setValues(project);
//     setStatusId(project.status_id);
//     setIsLogURL(project.is_log_url);
//     formik.isSubmitting = false;
//     formik.isValid = true;
//   }, [project]);

//   const formik = useFormik({
//     initialValues: project,
//     validationSchema: projectSchema,
//     onSubmit: (values, { setStatus, setSubmitting }) => {
//       setLoading(true);
//       values.status_id = status_id;
//       values.is_log_url = is_log_url;
//       const API_URL = `${process.env.REACT_APP_API_URL}projects/${values.id}`;

//       delete values.id;
//       delete values.date_added;
//       setTimeout(() => {
//         axios
//           .put(API_URL, values)
//           .then((res) => {
//             Swal.fire({ icon: "success", title: "Updated Project!" }).then(() => {
//               setLoading(false);
//               setSubmitting(false);
//               window.location.reload();
//             });
//           })
//           .catch((error) => {
//             console.error("Error Saving Project: ", error);
//             setLoading(false);
//             setSubmitting(false);
//             setStatus("Error Saving Project");
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
//           <div className="row">
//           <div className="col-3">
//             <h5 className="modal-title">EDIT PROJECT</h5>
//           </div>
//           <div className="col-9 text-right">
//             <button
//               type="submit"
//               id="kt_login_signup_form_submit_button"
//               className="btn btn-primary fw-bolder btn-sm ms-2 float-end"
//               disabled={formik.isSubmitting || !formik.isValid}
//             >
//               {!loading && <span className="indicator-label">Submit</span>}
//               {loading && (
//                 <span
//                   className="indicator-progress"
//                   style={{ display: "block" }}
//                 >
//                   Please wait...{" "}
//                   <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//                 </span>
//               )}
//             </button>
//             <button
//               type="button"
//               className="btn btn-sm btn-light-primary me-3 float-end"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//         <hr className="text-muted"></hr>

//             {formik.status && (
//               <div className="mb-lg-15 alert alert-danger">
//                 <div className="alert-text font-weight-bold">
//                   {formik.status}
//                 </div>
//               </div>
//             )}
//             {/* begin::Form group Firstname */}
//             <div className="row mb-3">
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Public ID
//                 </label>
//                 <input
//                   placeholder="Public ID"
//                   type="text"
//                   autoComplete="off"
//                   //onChange={(e)=>setPubId(e.target.value)}
//                   {...formik.getFieldProps("pub_id")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.pub_id && formik.errors.pub_id,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.pub_id && !formik.errors.pub_id,
//                     }
//                   )}
//                 />
//                 {formik.touched.pub_id && formik.errors.pub_id && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">{formik.errors.pub_id}</div>
//                   </div>
//                 )}
//               </div>

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
//             </div>
//             {/* end::Form group */}

//             {/* begin::Form group  */}
//             <div className="row mb-3">
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Client ID
//                 </label>
//                 <input
//                   placeholder="Client ID"
//                   type="number"
//                   autoComplete="off"
//                   //onChange={(e)=>setClientId(e.target.valueAsNumber)}
//                   {...formik.getFieldProps("client_id")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.client_id && formik.errors.client_id,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.client_id && !formik.errors.client_id,
//                     }
//                   )}
//                 />
//                 {formik.touched.client_id && formik.errors.client_id && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">
//                       {formik.errors.client_id}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Project Code
//                 </label>
//                 <input
//                   placeholder="Project Code"
//                   type="text"
//                   autoComplete="off"
//                   //onChange={(e)=>setProjectCode(e.target.value)}
//                   {...formik.getFieldProps("project_code")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.project_code &&
//                         formik.errors.project_code,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.project_code &&
//                         !formik.errors.project_code,
//                     }
//                   )}
//                 />
//                 {formik.touched.project_code && formik.errors.project_code && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">
//                       {formik.errors.project_code}
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
//                   Project Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Project Name"
//                   autoComplete="off"
//                   //onChange={(e)=>setProjectName(e.target.value)}
//                   {...formik.getFieldProps("project_name")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.project_name &&
//                         formik.errors.project_name,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.project_name &&
//                         !formik.errors.project_name,
//                     }
//                   )}
//                 />
//                 {formik.touched.project_name && formik.errors.project_name && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">
//                       {formik.errors.project_name}
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Project Short Description
//                 </label>
//                 <textarea
//                   rows={2}
//                   autoComplete="off"
//                   //onChange={(e)=>setProjectShortDesc(e.target.value)}
//                   {...formik.getFieldProps("project_shortdesc")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.project_shortdesc &&
//                         formik.errors.project_shortdesc,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.project_shortdesc &&
//                         !formik.errors.project_shortdesc,
//                     }
//                   )}
//                 />
//                 {formik.touched.project_shortdesc &&
//                   formik.errors.project_shortdesc && (
//                     <div className="fv-plugins-message-container">
//                       <div className="fv-help-block">
//                         {formik.errors.project_shortdesc}
//                       </div>
//                     </div>
//                   )}
//               </div>
//             </div>
//             {/* end::Form group */}

//             {/* begin::Form group */}
//             <div className="row mb-3">
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5 me-5">
//                   Project Status
//                   <input
//                     className="form-check-input ms-5"
//                     type="checkbox"
//                     checked={status_id === 1}
//                     onChange={(e) => setStatusId(e.target.checked ? 1 : 0)}
//                     //{...formik.getFieldProps("status_id")}
//                   />
//                 </label>
//                 <span>{(status_id ===1) ? "Active" : "Inactive"}</span>
//               </div>
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5 me-5">
//                   Is Log URL ?
//                   <input
//                     className="form-check-input ms-5"
//                     type="checkbox"
//                     name="layout-builder[layout][header][fixed][desktop]"
//                     checked={is_log_url === 1}
//                     onChange={(e) => setIsLogURL(e.target.checked ? 1 : 0)}
//                   />
//                 </label>
//                 <span>{(is_log_url ===1) ? "Yes" : "No"}</span>
//               </div>
//             </div>
//             {/* end::Form group */}
//             <div className="d-flex flex-wrap pb-lg-0 pb-5"></div>
//             {/* end::Form group */}
//           </form>
//         </div>
//       </div>
//     </Modal>
//   );
// };

export const EditProject: React.FC<{}> = () => {
  const history = useHistory();
  return (
    <div className="modal-content">
      <div className="modal-body">
        {
          <ProjectForm
            data={(history.location.state as any).data}
            isEdit={true}
          />
        }
      </div>
    </div>
  );
};

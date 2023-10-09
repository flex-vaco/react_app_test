/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import clsx from "clsx";
// import Swal from "sweetalert2";
// import { useHistory } from "react-router-dom";
import { UserForm } from "./UserForm";

// const initialValues = {
//   pub_id: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
//   status_id: 0,
//   type_id: 0,
// };

// const userSchema = Yup.object().shape({
//   pub_id: Yup.string()
//     .min(3, "Minimum 3 symbols")
//     .max(50, "Maximum 50 symbols")
//     .required("Public ID is required"),
//   email: Yup.string()
//     .email("Wrong email format")
//     .min(3, "Minimum 3 symbols")
//     .max(50, "Maximum 50 symbols")
//     .required("Email is required"),

//   password: Yup.string()
//     .min(3, "Minimum 3 symbols")
//     .max(50, "Maximum 50 symbols")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .required("Password confirmation is required")
//     .when("password", {
//       is: (val: string) => (val && val.length > 0 ? true : false),
//       then: Yup.string().oneOf(
//         [Yup.ref("password")],
//         "Password and Confirm Password didn't match"
//       ),
//     }),
//   status_id: Yup.bool().required("You must Set the stauts as active"),
//   type_id: Yup.number(),
// });

// export const AddUser: React.FC = () => {

//   const [status_id, setStatusId] = useState(0);

//   const [loading, setLoading] = useState(false);

//   const handleCancel = () => {
//     formik.resetForm()
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: userSchema,
//     onSubmit: (values, { setStatus, setSubmitting }) => {
//       setLoading(true);
//       const userValues = {
//         pub_id: values.pub_id,
//         uid: values.email,
//         pwd: values.password,
//         statusid: values.status_id,
//         typeid: values.type_id
//       };

//         setTimeout(() => {
//           const API_URL = process.env.REACT_APP_API_URL+"users";
//           axios.post(API_URL, userValues)
//           .then((res) =>{
//             Swal.fire({icon:"success", title:"Saved User!"}).then(() => {
//               setLoading(false);
//               setSubmitting(false);
//               window.location.reload()
//             })
//           })
//           .catch((error) => {
//             console.error("Error Saving User: ", error)
//             setLoading(false);
//             setSubmitting(false);
//             setStatus("Error Saving User");
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
//           <div className="row">
//           <div className="col-3">
//             <h5 className="modal-title">ADD USER</h5>
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
//               Reset
//             </button>
//           </div>
//         </div>
//             {formik.status && (
//               <div className="mb-lg-15 alert alert-danger">
//                 <div className="alert-text font-weight-bold">
//                   {formik.status}
//                 </div>
//               </div>
//             )}
//             <hr className="text-muted"></hr>
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
//                     <div className="fv-help-block">
//                       {formik.errors.pub_id}
//                     </div>
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
//                     <div className="fv-help-block">
//                       {formik.errors.type_id}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {/* end::Form group */}
//                         {/* begin::Form group Firstname */}
//                         <div className="row mb-3">
//               <div className="col-xl-6">
//                 <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Email
//                 </label>
//                 <input
//                   placeholder="Email"
//                   type="email"
//                   autoComplete="off"
//                   //onChange={(e)=>setEmail(e.target.value)}
//                   {...formik.getFieldProps("email")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.email && formik.errors.email,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.email && !formik.errors.email,
//                     }
//                   )}
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">
//                       {formik.errors.email}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="col-xl-6">
//               <label className="form-label fs-6 fw-bolder text-dark pt-5 me-5">
//                   User Status
//                   <input
//                     className="form-check-input ms-5"
//                     type="checkbox"
//                     checked={status_id === 1 ? true : false}
//                     onChange={(e) => setStatusId(e.target.checked ? 1 : 0)}
//                     //{...formik.getFieldProps("status_id")}
//                   />
//                 </label>
//                 <span>{status_id ? "Active" : "Inactive"}</span>
//               </div>
//             </div>
//             {/* end::Form group */}
//             {/* begin::Form group Password */}
//             <div className="row mb-3">
//               <div className="col-xl-6">
//               <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   autoComplete="off"
//                   //onChange={(e)=>setPassword(e.target.value)}
//                   {...formik.getFieldProps("password")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.password && formik.errors.password,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.password && !formik.errors.password,
//                     }
//                   )}
//                 />
//                 {formik.touched.password && formik.errors.password && (
//                   <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">
//                       {formik.errors.password}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="col-xl-6">
//               <label className="form-label fs-6 fw-bolder text-dark pt-5">
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Password confirmation"
//                   autoComplete="off"
//                   //onChange={(e)=>setPassword(e.target.value)}
//                   {...formik.getFieldProps("confirmPassword")}
//                   className={clsx(
//                     "form-control form-control-lg form-control-solid",
//                     {
//                       "is-invalid":
//                         formik.touched.confirmPassword &&
//                         formik.errors.confirmPassword,
//                     },
//                     {
//                       "is-valid":
//                         formik.touched.confirmPassword &&
//                         !formik.errors.confirmPassword,
//                     }
//                   )}
//                 />
//                 {formik.touched.confirmPassword &&
//                   formik.errors.confirmPassword && (
//                     <div className="fv-plugins-message-container">
//                       <div className="fv-help-block">
//                         {formik.errors.confirmPassword}
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

export const AddUser: React.FC<{}> = () => {
  return (
    <div className="modal-content">
      <div className="modal-body">
        <UserForm data={null} isEdit={false} />
      </div>
    </div>
  );
};

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import clsx from "clsx";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

interface User {
  id?: string;
  uid: string;
  pub_id: string;
  email: string;
  pwd: string;
  updatePassword: boolean;
  confirmPassword: string;
  statusid: number;
  typeid: string;
}

interface UserFormProps {
  data: User | null;
  isEdit: boolean;
  handleClose?: Function;
}

// const initialValues = {} as any;
const initialValues = {
  pub_id: "",
  email: "",
  confirmPassword: "",
  statusid: 0,
  typeid: "",
  uid: "",
  updatePassword: false,
  pwd: "",
} as User;

export const userSchema = Yup.object().shape({
  pub_id: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Public ID is required"),
  uid: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  updatePassword: Yup.bool(),
  pwd: Yup.string().when("updatePassword", {
    is: true,
    then: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Password is required"),
  }),
  confirmPassword: Yup.string().when("updatePassword", {
    is: true,
    then: Yup.string()
      .required("Password confirmation is required")
      .when("pwd", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("pwd")],
          "Password and Confirm Password didn't match"
        ),
      }),
  }),
  statusid: Yup.bool().required("You must Set the stauts as active"),
  typeid: Yup.number(),
});

export const UserForm: React.FC<UserFormProps> = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    formik.setValues(props.data ?? initialValues);
  }, [props.data]);

  const handleCancel = (e: React.ChangeEvent<any>) => {
    resetForm();
    props.handleClose?.();
  };

  const resetForm = () => {
    const values: any = { ...initialValues };
    if (props.data !== null) {
      for (const key in props.data)
        if (
          props.data[key as keyof User] !== null &&
          props.data[key as keyof User] !== undefined
        )
          values[key as keyof User] = props.data[key as keyof User];
    }
    formik.resetForm({ values });
  };

  const formik = useFormik<User>({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const successTitle = props.isEdit ? "User Updated!" : "User Created";
      const errorTitle = props.isEdit
        ? "Error Updating User"
        : "Error Creating User";

      setLoading(true);
      const userValues: any = {
        pub_id: values.pub_id,
        uid: values.uid,
        statusid: values.statusid,
        typeid: values.typeid,
      };
      if (props.isEdit) {
        if (values.updatePassword) userValues["pwd"] = values.pwd;
      } else userValues["pwd"] = values.pwd;
      const API_URL =
        process.env.REACT_APP_API_URL +
        "users" +
        (props.isEdit ? "/" + props.data?.id : "");
      try {
        if (props.isEdit) await axios.put(API_URL, userValues);
        else await axios.post(API_URL, userValues);
        Swal.fire({ icon: "success", title: successTitle }).then(() => {
          setLoading(false);
          setSubmitting(false);
          history.goBack();
        });
      } catch (error) {
        console.error("Error User: ", { error, update: props.isEdit });
        setLoading(false);
        setSubmitting(false);
        setStatus(errorTitle);
      }
    },
  });

  return (
    <>
      <form
        className="form w-100"
        noValidate
        autoComplete="off"
        id="kt_login_signup_form"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-3">
            <h5 className="modal-title">
              {props.isEdit ? "EDIT USER" : "ADD USER"}
            </h5>
          </div>
          <div className="col-9 text-right">
            <button
              type="submit"
              id="kt_login_signup_form_submit_button"
              className="btn btn-danger fw-bolder btn-sm ms-2 float-end text-white"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading && <span className="indicator-label">Submit</span>}
              {loading && (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...{" "}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-light-danger me-3 float-end"
              onClick={handleCancel}
            >
              Reset
            </button>
          </div>
        </div>
        {formik.status && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        <hr className="text-muted"></hr>
        {/* begin::Form group Firstname */}
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Public ID
            </label>
            <input
              placeholder="Public ID"
              type="text"
              autoComplete="false"
              //onChange={(e)=>setPubId(e.target.value)}
              {...formik.getFieldProps("pub_id")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid": formik.touched.pub_id && formik.errors.pub_id,
                },
                {
                  "is-valid": formik.touched.pub_id && !formik.errors.pub_id,
                }
              )}
            />
            {formik.touched.pub_id && formik.errors.pub_id && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  {formik.errors.pub_id ?? ""}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Type ID
            </label>
            <input
              placeholder="Type ID"
              type="number"
              autoComplete="false"
              //onChange={(e)=>setTypeId(e.target.valueAsNumber)}
              {...formik.getFieldProps("typeid")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid": formik.touched.typeid && formik.errors.typeid,
                },
                {
                  "is-valid": formik.touched.typeid && !formik.errors.typeid,
                }
              )}
            />
            {formik.touched.typeid && formik.errors.typeid && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.typeid}</div>
              </div>
            )}
          </div>
        </div>
        {/* end::Form group */}
        {/* begin::Form group Firstname */}
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Email
            </label>
            <input
              placeholder="Email"
              type="email"
              autoComplete="false"
              //onChange={(e)=>setEmail(e.target.value)}
              {...formik.getFieldProps("uid")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid": formik.touched.uid && formik.errors.uid,
                },
                {
                  "is-valid": formik.touched.uid && !formik.errors.uid,
                }
              )}
            />
            {formik.touched.uid && formik.errors.uid && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.uid}</div>
              </div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5 me-5">
              User Status
              <input
                className="form-check-input ms-5"
                type="checkbox"
                {...formik.getFieldProps("statusid")}
                checked={formik.values.statusid === 1}
                onChange={(e) => {
                  formik.setFieldValue("statusid", e.target.checked ? 1 : 0);
                }}
              />
            </label>
            <span>{formik.values.statusid == 1 ? "Active" : "Inactive"}</span>
          </div>
        </div>
        {/* end::Form group */}
        {/* begin::Form group Password */}

        <div className="row mb-3" hidden={!props.isEdit}>
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5 me-5">
              Update Password
              <input
                className="form-check-input ms-5"
                type="checkbox"
                {...formik.getFieldProps("updatePassword")}
                checked={formik.values.updatePassword}
              />
            </label>
          </div>
        </div>
        <div
          className="row mb-3"
          hidden={props.isEdit && !formik.values?.updatePassword}
        >
          <div className="row mb-3">
            <div className="col-xl-6">
              <label className="form-label fs-6 fw-bolder text-dark pt-5">
                {props.isEdit ? "New Password" : "Password"}
              </label>
              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                {...formik.getFieldProps("pwd")}
                className={clsx(
                  "form-control form-control-lg form-control-solid",
                  {
                    "is-invalid": formik.touched.pwd && formik.errors.pwd,
                  },
                  {
                    "is-valid": formik.touched.pwd && !formik.errors.pwd,
                  }
                )}
              />
              {formik.touched.pwd && formik.errors.pwd && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.pwd}</div>
                </div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-xl-6">
              <label className="form-label fs-6 fw-bolder text-dark pt-5">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Password confirmation"
                autoComplete="false"
                //onChange={(e)=>setPassword(e.target.value)}
                {...formik.getFieldProps("confirmPassword")}
                className={clsx(
                  "form-control form-control-lg form-control-solid",
                  {
                    "is-invalid":
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword,
                  },
                  {
                    "is-valid":
                      formik.touched.confirmPassword &&
                      !formik.errors.confirmPassword,
                  }
                )}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.confirmPassword}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
        {/* end::Form group */}
      </form>
    </>
  );
};

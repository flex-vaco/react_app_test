/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import clsx from "clsx";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

interface Project {
  id?: string;
  project_name: string;
  pub_id: string;
  project_code: string;
  project_shortdesc: string;
  status_id: number;
  client_id: number;
  type_id: string;
  is_log_url: number;
}

interface ProjectFormProps {
  data: Project | null;
  isEdit: boolean;
  handleClose?: Function;
}

// const initialValues = {} as any;
const initialValues = {
  pub_id: "",
  project_name: "",
  project_code: "",
  project_shortdesc: "",
  status_id: 0,
  client_id: 0,
  is_log_url: 0,
  type_id: "",
} as Project;

const projectSchema = Yup.object().shape({
  pub_id: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Public ID is required"),
  project_code: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Project code is required"),
  project_shortdesc: Yup.string()
    .min(3, "Minimum 10 symbols")
    .max(500, "Maximum 500 symbols"),
  project_name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Project name is required"),
  client_id: Yup.number().required("Client ID is required"),
  status_id: Yup.number(),
  typeid: Yup.number(),
  is_log_url: Yup.number(),
});

export const ProjectForm: React.FC<ProjectFormProps> = (props) => {
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
      for (const val in props.data)
        if (
          props.data[val as keyof Project] !== null &&
          props.data[val as keyof Project] !== undefined
        )
          values[val as keyof Project] = props.data[val as keyof Project];
    }
    formik.resetForm({ values });
  };

  const formik = useFormik<Project>({
    initialValues: initialValues,
    validationSchema: projectSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const successTitle = props.isEdit
        ? "Project Updated!"
        : "Project Created";
      const errorTitle = props.isEdit
        ? "Error Updating Project"
        : "Error Creating Project";
      setLoading(true);
      const data:Project = {
        client_id: values.client_id,
        is_log_url: values.is_log_url,
        project_code: values.project_code,
        project_name: values.project_name,
        project_shortdesc: values.project_shortdesc,
        pub_id: values.pub_id,
        status_id: values.status_id,
        type_id: values.type_id,
      };
      try {
        const API_URL = `${process.env.REACT_APP_API_URL}projects${
          props.isEdit ? "/" + props.data?.id : ""
        }`;
        if (props.isEdit) await axios.put(API_URL, data);
        else await axios.post(API_URL, data);
        Swal.fire({ icon: "success", title: successTitle }).then(() => {
          setLoading(false);
          setSubmitting(false);
          history.goBack();
        });
      } catch (error) {
        console.error("Error Project: ", { error, update: props.isEdit });
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
        id="kt_login_signup_form"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-3">
            <h5 className="modal-title">
              {props.isEdit ? "EDIT PROJECT" : "ADD PROJECT"}
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
        <hr className="text-muted"></hr>

        {formik.status && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* begin::Form group Firstname */}
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Public ID
            </label>
            <input
              placeholder="Public ID"
              type="text"
              autoComplete="off"
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
                <div className="fv-help-block">{formik.errors.pub_id}</div>
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
              autoComplete="off"
              //onChange={(e)=>setTypeId(e.target.valueAsNumber)}
              {...formik.getFieldProps("type_id")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid": formik.touched.type_id && formik.errors.type_id,
                },
                {
                  "is-valid": formik.touched.type_id && !formik.errors.type_id,
                }
              )}
            />
            {formik.touched.type_id && formik.errors.type_id && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.type_id}</div>
              </div>
            )}
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Form group  */}
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Client ID
            </label>
            <input
              placeholder="Client ID"
              type="number"
              autoComplete="off"
              //onChange={(e)=>setClientId(e.target.valueAsNumber)}
              {...formik.getFieldProps("client_id")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid":
                    formik.touched.client_id && formik.errors.client_id,
                },
                {
                  "is-valid":
                    formik.touched.client_id && !formik.errors.client_id,
                }
              )}
            />
            {formik.touched.client_id && formik.errors.client_id && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.client_id}</div>
              </div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Project Code
            </label>
            <input
              placeholder="Project Code"
              type="text"
              autoComplete="off"
              //onChange={(e)=>setProjectCode(e.target.value)}
              {...formik.getFieldProps("project_code")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid":
                    formik.touched.project_code && formik.errors.project_code,
                },
                {
                  "is-valid":
                    formik.touched.project_code && !formik.errors.project_code,
                }
              )}
            />
            {formik.touched.project_code && formik.errors.project_code && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  {formik.errors.project_code}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* end::Form group */}
        {/* begin::Form group */}
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Project Name
            </label>
            <input
              type="text"
              placeholder="Project Name"
              autoComplete="off"
              //onChange={(e)=>setProjectName(e.target.value)}
              {...formik.getFieldProps("project_name")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid":
                    formik.touched.project_name && formik.errors.project_name,
                },
                {
                  "is-valid":
                    formik.touched.project_name && !formik.errors.project_name,
                }
              )}
            />
            {formik.touched.project_name && formik.errors.project_name && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  {formik.errors.project_name}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Project Short Description
            </label>
            <textarea
              rows={2}
              autoComplete="off"
              //onChange={(e)=>setProjectShortDesc(e.target.value)}
              {...formik.getFieldProps("project_shortdesc")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid":
                    formik.touched.project_shortdesc &&
                    formik.errors.project_shortdesc,
                },
                {
                  "is-valid":
                    formik.touched.project_shortdesc &&
                    !formik.errors.project_shortdesc,
                }
              )}
            />
            {formik.touched.project_shortdesc &&
              formik.errors.project_shortdesc && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.project_shortdesc}
                  </div>
                </div>
              )}
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5 me-5">
              Project Status
              <input
                className="form-check-input ms-5"
                type="checkbox"
                {...formik.getFieldProps("status_id")}
                checked={formik.values.status_id === 1}
                onChange={(e) =>
                  formik.setFieldValue("status_id", e.target.checked ? 1 : 0)
                }
              />
            </label>
            <span>{formik.values.status_id === 1 ? "Active" : "Inactive"}</span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5 me-5">
              Is Log URL ?
              <input
                className="form-check-input ms-5"
                type="checkbox"
                name="layout-builder[layout][header][fixed][desktop]"
                checked={formik.values.is_log_url === 1}
                onChange={(e) =>
                  formik.setFieldValue("is_log_url", e.target.checked ? 1 : 0)
                }
              />
            </label>
            <span>{formik.values.is_log_url === 1 ? "Yes" : "No"}</span>
          </div>
        </div>
        {/* end::Form group */}
        <div className="d-flex flex-wrap pb-lg-0 pb-5"></div>
        {/* end::Form group */}
      </form>
    </>
  );
};

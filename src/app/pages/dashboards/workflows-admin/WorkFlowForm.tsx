/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import clsx from "clsx";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap-v5";
import { useHistory } from "react-router-dom";

interface Workflow {
  id?: string;
  flow_code: string;
  flow_name: string;
  flow_shortdesc: string;
  project_id: number | string;
  type_id: number | string;
  status_id: number;
}

interface WorkflowProps {
  data: Workflow | null;
  isEdit: boolean;
  handleClose?: Function;
}

// const initialValues = {} as any;
const initialValues = {
  flow_code: "",
  flow_name: "",
  flow_shortdesc: "",
  project_id: "",
  type_id: "",
  status_id: 0,
} as Workflow;

const workflowSchema = Yup.object().shape({
  flow_code: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Flow Code is required"),
  flow_name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Flow Name is required"),
  flow_shortdesc: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Flow Description is required"),
  project_id: Yup.number().required("Project ID is required"),
  status_id: Yup.number(),
  type_id: Yup.number().required("Type ID is required"),
});

export const WorkFlowForm: React.FC<WorkflowProps> = (props) => {
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
          props.data[val as keyof Workflow] !== null &&
          props.data[val as keyof Workflow] !== undefined
        )
          values[val as keyof Workflow] = props.data[val as keyof Workflow];
    }
    formik.resetForm({ values });
  };

  const formik = useFormik<Workflow>({
    initialValues,
    validationSchema: workflowSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const successTitle = props.isEdit
        ? "Workflow Updated!"
        : "Workflow Created";
      const errorTitle = props.isEdit
        ? "Error Updating Workflow"
        : "Error Creating Workflow";
      setLoading(true);
      const data: Workflow = {
        flow_code: values.flow_code,
        flow_name: values.flow_name,
        flow_shortdesc: values.flow_shortdesc,
        project_id: values.project_id,
        status_id: values.status_id,
        type_id: values.type_id,
      };
      try {
        const API_URL = `${process.env.REACT_APP_API_URL}workflows${
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
        console.error("Error Workflow: ", { error, update: props.isEdit });
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
              {props.isEdit ? "EDIT WORKFLOW" : "ADD WORKFLOW"}</h5>
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
        {/* begin::Form group  */}
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Type ID
            </label>
            <input
              placeholder="Type ID"
              type="number"
              autoComplete="off"
              //onChange={(e) => setTypeId(e.target.valueAsNumber)}
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
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Project ID
            </label>
            <input
              placeholder="Project ID"
              type="number"
              autoComplete="off"
              //onChange={(e) => setProjectID(e.target.valueAsNumber)}
              {...formik.getFieldProps("project_id")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid":
                    formik.touched.project_id && formik.errors.project_id,
                },
                {
                  "is-valid":
                    formik.touched.project_id && !formik.errors.project_id,
                }
              )}
            />
            {formik.touched.project_id && formik.errors.project_id && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.project_id}</div>
              </div>
            )}
          </div>
        </div>
        {/* end::Form group */}
        {/* begin::Form group */}
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Workflow Code
            </label>
            <input
              placeholder="Workflow code"
              type="text"
              autoComplete="off"
              //onChange={(e) => setFlowCode(e.target.value)}
              {...formik.getFieldProps("flow_code")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid":
                    formik.touched.flow_code && formik.errors.flow_code,
                },
                {
                  "is-valid":
                    formik.touched.flow_code && !formik.errors.flow_code,
                }
              )}
            />
            {formik.touched.flow_code && formik.errors.flow_code && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.flow_code}</div>
              </div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Workflow Name
            </label>
            <input
              placeholder="Name"
              type="text"
              autoComplete="off"
              //onChange={(e) => setFlowName(e.target.value)}
              {...formik.getFieldProps("flow_name")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid":
                    formik.touched.flow_name && formik.errors.flow_name,
                },
                {
                  "is-valid":
                    formik.touched.flow_name && !formik.errors.flow_name,
                }
              )}
            />
            {formik.touched.flow_name && formik.errors.flow_name && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.flow_name}</div>
              </div>
            )}
          </div>
        </div>
        {/* end::Form group */}
        {/* begin::Form group */}
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Workflow Short Description
            </label>
            <textarea
              rows={2}
              autoComplete="off"
              //onChange={(e) => setFlowShortDesc(e.target.value)}
              {...formik.getFieldProps("flow_shortdesc")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid":
                    formik.touched.flow_shortdesc &&
                    formik.errors.flow_shortdesc,
                },
                {
                  "is-valid":
                    formik.touched.flow_shortdesc &&
                    !formik.errors.flow_shortdesc,
                }
              )}
            />
            {formik.touched.flow_shortdesc && formik.errors.flow_shortdesc && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  {formik.errors.flow_shortdesc}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5 me-5">
              Workflow Status
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
        {/* end::Form group */}
      </form>
    </>
  );
};

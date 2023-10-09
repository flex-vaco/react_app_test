/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import clsx from "clsx";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap-v5";
import { useHistory } from "react-router-dom";
import { Task } from "redux-saga";

interface WorkflowTask {
  id?: string;
  task_name: string;
  task_code: string;
  task_shortdesc: string;
  flow_id: number | string;
  type_id: number | string;
  sort_order: number;
  status_id: number;
}

interface WorkflowTaskProps {
  data: WorkflowTask | null;
  isEdit: boolean;
  handleClose?: Function;
}

// const initialValues = {} as any;
const initialValues = {
  task_code: "",
  task_name: "",
  task_shortdesc: "",
  flow_id: "",
  sort_order: 0,
  status_id: 0,
  type_id: "",
} as WorkflowTask;

const taskSchema = Yup.object().shape({
  flow_id: Yup.number().required("Workflow ID is required"),
  task_code: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Task Code is required"),
  task_name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Task Name is required"),
  task_shortdesc: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 100 symbols")
    .required("Task Describtion is required"),
  sort_order: Yup.number(),
  status_id: Yup.number(),
  type_id: Yup.number().required("Type ID is required"),
});

export const TaskForm: React.FC<WorkflowTaskProps> = (props) => {
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
          props.data[val as keyof WorkflowTask] !== null &&
          props.data[val as keyof WorkflowTask] !== undefined
        )
          values[val as keyof WorkflowTask] =
            props.data[val as keyof WorkflowTask];
    }
    formik.resetForm({ values });
  };

  const formik = useFormik<WorkflowTask>({
    initialValues,
    validationSchema: taskSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      const data: WorkflowTask = {
        flow_id: values.flow_id,
        sort_order: values.sort_order,
        status_id: values.status_id,
        task_code: values.task_code,
        task_name: values.task_name,
        task_shortdesc: values.task_shortdesc,
        type_id: values.type_id,
      };
      try {
        const API_URL = `${process.env.REACT_APP_API_URL}workflow_tasks${
          props.isEdit ? "/" + props.data?.id : ""
        }`;
        if (props.isEdit) await axios.put(API_URL, data);
        else await axios.post(API_URL, data);

        Swal.fire({ icon: "success", title: "Updated Task!" }).then(() => {
          setLoading(false);
          setSubmitting(false);
          history.goBack();
        });
      } catch (error) {
        console.error("Error Saving Task: ", error);
        setLoading(false);
        setSubmitting(false);
        setStatus("Error Saving Task");
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
            <h5 className="modal-title ms-3">
              {props.isEdit ? "EDIT TASK" : "ADD TASK"}
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
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Workflow ID
            </label>
            <input
              placeholder="Project ID"
              type="number"
              autoComplete="off"
              //onChange={(e)=>setFlowId(e.target.valueAsNumber)}
              {...formik.getFieldProps("flow_id")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid": formik.touched.flow_id && formik.errors.flow_id,
                },
                {
                  "is-valid": formik.touched.flow_id && !formik.errors.flow_id,
                }
              )}
            />
            {formik.touched.flow_id && formik.errors.flow_id && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.flow_id}</div>
              </div>
            )}
          </div>
        </div>
        <div className="row mb-3"></div>
        {/* end::Form group */}
        {/* begin::Form group */}
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Task Code
            </label>
            <input
              placeholder="Task code"
              type="text"
              autoComplete="off"
              //onChange={(e)=>setTaskCode(e.target.value)}
              {...formik.getFieldProps("task_code")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid":
                    formik.touched.task_code && formik.errors.task_code,
                },
                {
                  "is-valid":
                    formik.touched.task_code && !formik.errors.task_code,
                }
              )}
            />
            {formik.touched.task_code && formik.errors.task_code && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.task_code}</div>
              </div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Task Name
            </label>
            <input
              placeholder="Name"
              type="text"
              autoComplete="off"
              //onChange={(e)=>setTaskName(e.target.value)}
              {...formik.getFieldProps("task_name")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid":
                    formik.touched.task_name && formik.errors.task_name,
                },
                {
                  "is-valid":
                    formik.touched.task_name && !formik.errors.task_name,
                }
              )}
            />
            {formik.touched.task_name && formik.errors.task_name && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.task_name}</div>
              </div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-xl-6">
            <label className="form-label fs-6 fw-bolder text-dark pt-5">
              Task Short Description
            </label>
            <textarea
              rows={2}
              autoComplete="off"
              //onChange={(e)=>setTskShortDesc(e.target.value)}
              {...formik.getFieldProps("task_shortdesc")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid":
                    formik.touched.task_shortdesc &&
                    formik.errors.task_shortdesc,
                },
                {
                  "is-valid":
                    formik.touched.task_shortdesc &&
                    !formik.errors.task_shortdesc,
                }
              )}
            />
            {formik.touched.task_shortdesc && formik.errors.task_shortdesc && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  {formik.errors.task_shortdesc}
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
              Task Status
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
            <span>{formik.values.status_id ? "Active" : "Inactive"}</span>
            <br />
            <label className="form-label fs-6 fw-bolder text-dark pt-5 me-5">
              Sort in Ascending Order
              <input
                className="form-check-input ms-5"
                type="checkbox"
                {...formik.getFieldProps("sort_order")}
                checked={formik.values.sort_order === 1}
                onChange={(e) =>
                  formik.setFieldValue("sort_order", e.target.checked ? 1 : 0)
                }
              />
            </label>
            <span>{formik.values.sort_order ? "Yes" : "No"}</span>
          </div>
        </div>
        {/* end::Form group */}
      </form>
    </>
  );
};

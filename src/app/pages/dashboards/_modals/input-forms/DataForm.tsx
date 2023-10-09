import React, {useState, useEffect } from "react";
import { Modal } from "react-bootstrap-v5";
import { KTSVG } from "../../../../../_start/helpers";

type Props = {
  data?: {};
  show: boolean;
  handleClose: () => void;
  context: string;
  dbTable: string;
};

const sampleProject = {
  "client_id": 999,
  "is_log_url": 0,
  "project_code": "RV_TEST",
  "project_name": "RAJENDER TESTING",
  "project_shortdesc": "TEST PROJECT WHILE CODING CAN BE DELETED",
  "pub_id": "string",
  "status_id": 0,
  "type_id": 0
}

const DataFormModal: React.FC<Props> = ({ show, handleClose, context="add", data, dbTable  }) => {
  useEffect(() => {
    initMap();
  }, []);

  const [updatedData, setUpdatedData] = useState(sampleProject);
  const dissmissLocation = () => {
    // setLocation(data.location);
    handleClose();
  };
  const handleSave = () => {
    //setUpdatedData(sampleProject)
    console.log(updatedData)
    handleClose();
  };
  const initMap = () => {};
  data = sampleProject;
  return (
    <Modal
      className="modal fade"
      id="kt_modal_select_location"
      data-backdrop="static"
      tabIndex={-1}
      role="dialog"
      show={show}
      dialogClassName="modal-xl"
      aria-hidden="true"
      onHide={dissmissLocation}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{context.toUpperCase()} {dbTable.toUpperCase()}</h5>

          <div
            className="btn btn-icon btn-sm btn-active-light-primary ms-2"
            onClick={dissmissLocation}
          >
            <KTSVG
              path="/media/icons/duotone/Navigation/Close.svg"
              className="svg-icon-2x"
            />
          </div>
        </div>
        <div className="modal-body">
          
        <div className="row">
                    <div className="col-xl-6">
                      {/* begin::Form Group */}
                      <div className="mb-10">
                        <label className="fs-6 form-label fw-bolder text-dark">
                          Client
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg form-control-solid "
                          name="channelname"
                          placeholder=""
                          value={updatedData.client_id}
                          onChange={(e) =>
                            updatedData.client_id = e.target.valueAsNumber
                          }
                        />
                      </div>
                      {/* end::Form Group */}
                    </div>
                    <div className="col-xl-6">
                      {/* begin::Form Group */}
                      <div className="mb-10">
                        <label className="fs-6 form-label fw-bolder text-dark">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg form-control-solid "
                          name="channelemail"
                          placeholder=""
                          // value={data.supportChannel.email}
                          // onChange={(e) =>
                          //   updateData({
                          //     supportChannel: {
                          //       ...data.supportChannel,
                          //       email: e.target.value,
                          //     },
                          //   })
                          // }
                        />
                      </div>
                      {/* end::Form Group */}
                    </div>
                    
                  </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-light-primary"
            onClick={dissmissLocation}
          >
            Cancel
          </button>
          <button
            id="submit"
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            SAVE
          </button>
        </div>
      </div>
    </Modal>
  );
};

export { DataFormModal };

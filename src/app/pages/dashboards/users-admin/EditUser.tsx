/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import { Modal } from "react-bootstrap-v5";
import { UserForm } from "./UserForm";
import { useHistory } from "react-router-dom";

// type Props = {
//   show: boolean;
//   handleClose: () => void;
//   data: any;
// };

// export const EditUserModel: React.FC<Props> = ({ show, handleClose, data }) => {
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
//           {<UserForm data={data} isEdit={true} handleClose={handleClose} />}
//         </div>
//       </div>
//     </Modal>
//   );
// };



export const EditUser: React.FC<{}> = () => {
  const history = useHistory();
  return (
    <div className="modal-content">
      <div className="modal-body">
        {
          <UserForm
            data={(history.location.state as any).data}
            isEdit={true}
          />
        }
      </div>
    </div>
  );
};
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { putEditUser } from "../services/UserSevice";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
  const {
    handleClose,
    isEditUser,
    inforEdit,
    pageNumber,
    handleUpdateFromModal,
  } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleConfirmEditUser = async () => {
    let res = await putEditUser(name, job, pageNumber);
    if (res && res.updatedAt) {
      handleUpdateFromModal({ first_name: name, id: inforEdit.id });

      toast.success("Success edit a user !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("Error edit a user !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    handleClose();
  };

  useEffect(() => {
    setName(inforEdit.first_name);
  }, [inforEdit]);

  return (
    <>
      <Modal show={isEditUser} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user:</Modal.Title>
        </Modal.Header>
        <div className="px-3">
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Job:</label>
            <input
              type="text"
              className="form-control"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </div>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalEditUser;

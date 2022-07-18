
import { Button, Modal, Toast } from 'react-bootstrap';
import { deleteUser } from '../services/UserSevice';
import { toast } from 'react-toastify';


const ModalDeleteUser = (props) => {

    const { handleClose, isDeleteUser, inforDelete, handleDeleteFromModal } = props

    const ConfirmDelete = async () => {
        let res = await deleteUser(inforDelete.id)

        if (res && res.statusCode) {
            handleDeleteFromModal(inforDelete)
            toast.success('Success delete a user !', {
                position: toast.POSITION.TOP_RIGHT
            });

        }
        else {
            toast.error('Error delete a user !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        handleClose()
    }
    return (
        <>
            <Modal show={isDeleteUser} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user:</Modal.Title>
                </Modal.Header>
                <div className='px-3'>
                    <p>Are you want to delete this user,</p>
                    <b>Email={inforDelete.email} ?</b>
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => ConfirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalDeleteUser
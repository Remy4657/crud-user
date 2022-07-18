import axios from 'axios';
import { useState } from 'react';
import { Button, Modal, Toast } from 'react-bootstrap';
import { postCreateUser } from '../services/UserSevice';
import {toast } from 'react-toastify';

const ModalAddNew = (props) => {

    const { handleClose, isAddNewUser, handleUpdateTable } = props
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleSaveUser = async () => {

        let res = await postCreateUser(name, job)
        if(res && res.id){
            handleClose()
            setName('')
            setJob('')
            toast.success('Success create a user !', {
                position: toast.POSITION.TOP_RIGHT
            });
            handleUpdateTable({first_name: name, id: res.id})
        }
        else{
            toast.error('Error create a user !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    return (
        <>
            <Modal show={isAddNewUser} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user:</Modal.Title>
                </Modal.Header>
                <div className='px-3'>

                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Job:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={job}
                            onChange={(e) => setJob(e.target.value)} />
                    </div>
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalAddNew
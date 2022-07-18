import { useEffect, useState } from 'react';
import { fetchAllUser } from '../services/UserSevice';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModaEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import _ from 'lodash'
import './TableUser.scss'

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([])
    const [pageTotal, setPageToatal] = useState(0);
    const [userTotal, setUserTotal] = useState(0)

    const [isAddNewUser, setIsAddNewUser] = useState(false)
    const [isEditUser, setIsEditUser] = useState(false)
    const [isDeleteUser, setIsDeleteUser] = useState(false)
    const [inforEdit, setInforEdit] = useState({})
    const [inforDelete, setInforDelete] = useState({})
    // page_number
    const [pageNumber, setPageNumber] = useState(1)

    const handleClose = () => {

        setIsAddNewUser(false)
        setIsEditUser(false)
        setIsDeleteUser(false)
    }

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async (number_page) => {
        let res = await fetchAllUser(number_page);

        setPageToatal(res.total_pages)
        setUserTotal(res.total)

        if (res && res.data) {
            setListUsers(res.data)
        }
    }
    const handlePageClick = (event) => {
        setPageNumber(event.selected + 1)
        getUsers(event.selected + 1)

    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }
    const handleEditUser = (item) => {
        setIsEditUser(true)
        setInforEdit(item)
    }
    const handleUpdateFromModal = (user) => {
        let indexUserEdit = listUsers.findIndex(item => item.id === user.id)
        let listUsersClone = _.cloneDeep(listUsers)
        listUsersClone[indexUserEdit].first_name = user.first_name
        setListUsers(listUsersClone)

    }
    const handleDeleteFromModal = (user) => {
        let listUsersClone = _.cloneDeep(listUsers)
        listUsersClone = listUsers.filter(item => item.id !== user.id)
        setListUsers(listUsersClone)
    }
    const handleDeleteUser = (user) => {
        setIsDeleteUser(true)
        setInforDelete(user)
    }

    const handleSort = (sortField, sortBy) => {
        console.log(sortField, sortBy)
        let listUsersClone = _.cloneDeep(listUsers)
        
        // if(sortBy == 'desc' && sortField == 'id'){
        //     listUsersClone.sort((a, b) => b.id - a.id);
        //     setListUsers(listUsersClone)
        // }
        // if(sortBy == 'asc' && sortField == 'id'){
        //     listUsersClone.sort((a, b) => a.id - b.id);
        //     setListUsers(listUsersClone)
        // }

        listUsersClone = _.orderBy(listUsersClone, sortField, sortBy)
        setListUsers(listUsersClone)
        
        
    }

    return (
        <>
            <div className='my-3 d-flex align-items-center justify-content-between'>
                <span><b>List User:</b></span>
                <button type="button" className="btn btn-success" onClick={() => { setIsAddNewUser(true) }}>Add new user</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className='d-flex justify-content-between'>
                                <span>ID</span>
                                <span className='icon-sort'>
                                    <i 
                                    class="fa-solid fa-arrow-up-long"
                                    onClick={() => handleSort('id', 'asc')}
                                    ></i>
                                    <i 
                                    class="fa-solid fa-arrow-down-long"
                                    onClick={() => handleSort('id', 'desc')}
                                    >
                                  
                                    </i>
                                </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div className='d-flex justify-content-between'>
                                <span>First name</span>
                                <span className='icon-sort'>
                                    <i class="fa-solid fa-arrow-up-long" onClick={() => handleSort('first_name', 'asc')}></i>
                                    <i class="fa-solid fa-arrow-down-long" onClick={() => handleSort('first_name', 'desc')}></i>
                                </span>
                            </div>
                        </th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => (

                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button
                                        className='mx-3 btn btn-warning'
                                        onClick={() => {
                                            handleEditUser(item)
                                        }}>
                                        Edit</button>
                                    <button
                                        className='mx-3 btn btn-danger'
                                        onClick={() => { handleDeleteUser(item) }}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

            <ModalAddNew isAddNewUser={isAddNewUser} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />
            <ModalEditUser isEditUser={isEditUser} handleClose={handleClose} inforEdit={inforEdit} handleUpdateFromModal={handleUpdateFromModal} pageNumber={pageNumber} />
            <ModalDeleteUser isDeleteUser={isDeleteUser} handleClose={handleClose} inforDelete={inforDelete} handleDeleteFromModal={handleDeleteFromModal} />

            <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageTotal}
                renderOnZeroPageCount={null}

                marginPagesDisplayed={1}
                activeClassName="active"
                pageLinkClassName="page-link"
                breakLinkClassName="page-link"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
                pageClassName="page-item"
                breakClassName="page-item"
                nextClassName="page-item"
                previousClassName="page-item"
                containerClassName="pagination"
                previousLabel={<>&laquo;</>}
                nextLabel={<>&raquo;</>}
            />

        </>
    )
}
export default TableUsers
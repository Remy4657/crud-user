import { useEffect, useState } from 'react';
import { fetchAllUser } from '../services/UserSevice';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModaEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import _, { debounce } from 'lodash'
import './TableUser.scss'
import { CSVLink } from "react-csv";
import Papa from 'papaparse'
import { toast } from 'react-toastify';


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
    // keyword to search
    const [keywords, setKeywords] = useState('')

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
    // handle search
    const handleSearch = debounce((event) => {
        let term = event.target.value
        if (term) {

            let listUsersClone = _.cloneDeep(listUsers)
            listUsersClone = listUsers.filter(item => item.email.includes(term))
            setListUsers(listUsersClone)
        }
        else {
            getUsers(pageNumber)
        }

    }, 300)

    const headers = [
        { label: "ID", key: "id" },
        { label: "First Name", key: "first_name" },
        { label: "Last Name", key: "last_name" },
        { label: "Email", key: "email" },
        { label: "Avatar", key: "avatar" }
    ];
    const csvReport = {
        data: listUsers,
        headers: headers,
        filename: 'Clue_Mediator_Report.csv'
    };
    // handle import
    const handleImport = (e) => {
        if (e.target.files && e.target.files[0]) {

            let file = e.target.files[0]
            
            if (file.type === 'text/csv') {
                Papa.parse(file, {
                    complete: function (results) {
                        // make data
                        let file_upload = results.data
                      
                        // check qty of fields
                        if (file_upload[0][0] === '') {
                            toast.error('Error in file import is not have data !', {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        }
                        else {
                            //console.log('file upload:', file_upload)
                            if (file_upload[0][0] !== 'first_name' || file_upload[0][1] !== 'last_name' || file_upload[0][2] !== 'email') {
                                toast.error('Error fields in file import !', {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                            }
                            else {
                                let arrayFileUpload = []
                                file_upload.map((item, index) => {
                                    if (index > 0 && item.length === 4) {
                                        let obj = {}
                                        obj.email = item[2]
                                        obj.first_name = item[0]
                                        obj.last_name = item[1]
                                        arrayFileUpload.push(obj)
                                    }
                                })
                                setListUsers(arrayFileUpload)
                            }
                        }
                    }
                });
            }
            else {
                toast.error('File not format!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
        else {
            toast.error('File not found!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    return (
        <>
            <input className='mt-5 p-1 col-4' placeholder='Enter email...' type='text' onChange={(event) => handleSearch(event)}></input>
            <div className='mb-3 d-flex align-items-center justify-content-between'>

                <span><b>List User:</b></span>
                <div className='button-group'>

                    <label htmlFor='test' className='btn btn-warning text-white'>
                        <i class="fa-solid fa-file-import"></i>  Import</label>
                    <input id='test' type='file' hidden onChange={(e) => handleImport(e)}></input>
                    <CSVLink {...csvReport} type="button" className="btn btn-success">
                        <i class="fa-solid fa-file-arrow-down"></i>   Export to CSV
                    </CSVLink>
                    <button type="button" className="btn btn-primary" onClick={() => { setIsAddNewUser(true) }}>
                        <i class="fa-solid fa-circle-plus"></i>   Add new
                    </button>
                </div>
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
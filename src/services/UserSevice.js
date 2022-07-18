import axios from "./customize-axios";


const fetchAllUser = (number_page) => (
    axios.get(`/api/users?page=${number_page}`)
)
const postCreateUser = (name, job) => (
    axios.post('/api/users', { name, job })
)
const putEditUser = (name, job, number_page) => {
    return (
        axios.put(`/api/users/${number_page}`, { name, job })
    )
}
const deleteUser = (id) => {
    return (
        axios.delete(`/api/users/${id}`)
    )
}

export { fetchAllUser, postCreateUser, putEditUser, deleteUser }
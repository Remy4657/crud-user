import './Login.scss'
import { useState, useEffect, useContext } from 'react'
import { loginApi } from '../services/UserSevice'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const { login } = useContext(UserContext)

    useEffect(() => {

        let token = localStorage.getItem("token")
        if (token) {
            navigate("/")
        }
    },[])

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Error fields in file import !', {
                position: toast.POSITION.TOP_RIGHT
            });
            return
        }
        setIsLoading(true)
        let res = await loginApi(email, password)

        if (res && res.token) {
    
            login(email, res.token)
            navigate("/");
          
            toast.success('Login success', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            if (res && res.status === 400) {
                toast.error(res.data.error, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
        setIsLoading(false)
    }

    const handleGoBack = () => {
        navigate("/")
    }
    return (
        <div className=''>
            <div className="d-flex flex-column login col-lg-3 col-md-8 col-sm position-relative">
                <h2 className='my-5'>Login</h2>
                <span>Email or Username ( Nhập email này để login thành công: eve.holt@reqres.in)</span>
                <input placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                <input type={isShowPassword ? 'text' : 'password'} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                <i className={isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'} onClick={() => { setIsShowPassword(!isShowPassword) }}></i>
                <button
                    className={(email && password) ? 'active-login' : 'not-alow'}
                    disabled={((email && password)) ? false : true}
                    onClick={() => handleLogin()}
                >
                    {isLoading && <i className="fas fa-sync fa-spin"></i>} &nbsp; Login
                </button>
                <div className='go-back d-flex justify-content-center mt-5'>
                    <i className="fa-solid fa-angles-left"></i>
                    <span onClick={() => handleGoBack()}>Go back</span>
                </div>

            </div>
        </div>
    )
}
export default Login
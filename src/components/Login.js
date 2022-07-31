import "./Login.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FETCH_DATA_LOGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "../redux/actions/action";
import { loginApi } from "../services/UserSevice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);

  // always at home when logined
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {};

  const handleGoBack = () => {
    navigate("/");
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  // driect home when auth == true
  useEffect(() => {
    if (account && account.auth === true) {
      navigate("/");
    }
  }, [account]);

  const handleLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
      // dispatch: thao tác giua redux va react; getstate: lay state hien tai cua redux
      dispatch(FETCH_DATA_LOGIN());
      let res = await loginApi(email.trim(), password);

      if (res && res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("email", email);

        dispatch(FETCH_DATA_SUCCESS(email.trim(), res.token));

        //navigate("/");
        toast.success("Login success", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        if (res && res.status === 400) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        dispatch(FETCH_DATA_ERROR());
      }
    };
  };

  return (
    <div className="">
      <div className="d-flex flex-column login col-lg-3 col-md-8 col-sm position-relative">
        <h2 className="my-5">Login</h2>
        <span>
          Email or Username ( Nhập email này để login thành công:
          eve.holt@reqres.in)
        </span>
        <input
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type={isShowPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyUp={(e) => {
            handlePressEnter(e);
          }}
        />
        <i
          className={
            isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
          }
          onClick={() => {
            setIsShowPassword(!isShowPassword);
          }}
        ></i>
        <button
          className={email && password ? "active-login" : "not-alow"}
          disabled={email && password ? false : true}
          onClick={() => dispatch(handleLoginRedux(email, password))}
        >
          {isLoading && <i className="fas fa-sync fa-spin"></i>} &nbsp; Login
        </button>
        <div className="go-back d-flex justify-content-center mt-5">
          <i className="fa-solid fa-angles-left"></i>
          <span onClick={() => handleGoBack()}>Go back</span>
        </div>
      </div>
    </div>
  );
};
export default Login;

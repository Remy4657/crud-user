import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_DATA_SUCCESS, LOGOUT } from "../redux/actions/action";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.account.email);
  const auth = useSelector((state) => state.user.account.auth);

  // when refresh to not lost datan (email)
  useEffect(() => {
    if (localStorage.getItem("email") !== null) {
      dispatch(
        FETCH_DATA_SUCCESS(
          localStorage.getItem("email"),
          localStorage.getItem("token")
        )
      );
    }
  }, []);

  const handleLogout = () => {
    dispatch(LOGOUT());
    navigate("/login", { replace: true });
    toast.success("Logout successfuly !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <NavLink className="text-decoration-none nav-link ml-n5" to="/">
            <h2>React app</h2>
          </NavLink>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              {email && auth === true && (
                <NavLink className="nav-link" to="/users">
                  Manage users
                </NavLink>
              )}
            </Nav>
            {email && email !== "null" && (
              <span>
                Welcome <b>{email}</b>{" "}
              </span>
            )}
            &nbsp;
            <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                {email && auth === true ? (
                  <NavDropdown.Item
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                ) : (
                  <NavLink to="/login" className="dropdown-item">
                    Login
                  </NavLink>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;

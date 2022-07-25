import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const Header = () => {

    const navigate = useNavigate()
    const { logout, user, login } = useContext(UserContext)
    useEffect(() => {
            if(localStorage.getItem('email') !== null){
                login(localStorage.getItem('email'), localStorage.getItem('token'))
            }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        logout()
        navigate("/login", { replace: true })

        toast.success('Logout successfuly !', {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    return (

        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <NavLink className='nav-link' to='/' >
                        <h2>React app</h2>
                    </NavLink>


                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className='nav-link' to='/' >Home</NavLink>
                            {user.email && user.auth === true && <NavLink className='nav-link' to='/users' >Manage users</NavLink>}

                        </Nav>
                        {user.email && user.email !== 'null' && <span>Welcome <b>{user.email}</b> </span>}&nbsp;
                        <Nav>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                {(user.email && user.auth === true) ? <NavDropdown.Item onClick={() => { handleLogout() }}>Logout</NavDropdown.Item>
                                    : <NavLink to='/login' className='dropdown-item'  >Login</NavLink>
                                }
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header
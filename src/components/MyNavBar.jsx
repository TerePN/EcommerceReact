import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CartSideBar from './CartSideBar';
import '../styles/MyNavBarStyle.css'

const MyNavBar = () => {

    const navigate = useNavigate()

    const logOut = () => {
        localStorage.setItem('token', '')
        navigate('/login')
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg" >
                <Container>
                    <Navbar.Brand to="/" as={Link}>Ecommerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="conteinerItem">
                            <Nav.Link to="/" as={Link}  >
                                <i className="fa-solid fa-house"></i>
                            </Nav.Link>
                            <Nav.Link to="/login" as={Link}  >
                            <i className="fa-solid fa-user"></i>
                            </Nav.Link>
                            <Nav.Link to="/purchases" as={Link}  >
                                <i className="fa-solid fa-bag-shopping"></i>
                            </Nav.Link>
                            <Nav.Link onClick={ handleShow } > 
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Nav.Link>
                            <Nav.Link onClick={logOut}>
                                logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CartSideBar show={show} handleClose={handleClose} />
        </>

    );
};

export default MyNavBar;
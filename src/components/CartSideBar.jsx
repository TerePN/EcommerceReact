import React, { useEffect } from 'react';
import { ListGroup, Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCarUserThunk } from '../store/slices/CarUser.slice';
import { purchasesCarThunk } from '../store/slices/CarUser.slice';
import { deleteProductCarThunk } from '../store/slices/CarUser.slice';
import { Link } from 'react-router-dom'

const CartSideBar = ({ show, handleClose }) => {

    const dispatch = useDispatch()
    const productsInCar = useSelector(state => state.carUser)
    useEffect(() => {
        dispatch(getCarUserThunk())
    }, [])

    const tokenExists = () => {
        const token = localStorage.getItem("token")
        return token !== "";
    }

    const deleteProductCar = (id) => {
        dispatch(deleteProductCarThunk(id))
    } 

    return (
        <Offcanvas show={show} onHide={handleClose} placement={`end`}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>PRODUCTS IN CAR  <i className="fa-solid fa-cart-shopping"></i> </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup>
                    {
                        productsInCar.map(productsInCar => (
                            <ListGroup.Item key={productsInCar.id} >
                                <Link to={`/product/${productsInCar.productsInCart?.productId}`}
                                    onClick={() => handleClose(true)} >
                                    {productsInCar.title}
                                </Link>
                                <Button onClick={ () => deleteProductCar(productsInCar.id) } variant="dark"><i className="fa-solid fa-trash"></i></Button>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Offcanvas.Body>
            <Button className='m-3' onClick={ () => dispatch(purchasesCarThunk())}>
                Buy Car
            </Button>
        </Offcanvas>
    );
};

export default CartSideBar;
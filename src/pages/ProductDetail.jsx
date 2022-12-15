import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import { addProductCarThunk } from '../store/slices/CarUser.slice';
import '../styles/productDetailStyle.css'

const ProductDetail = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const productsList = useSelector(state => state.products)
    const [quantity, setQuantity] = useState(1)

    const productDetail = productsList.find(products => products.id === Number(id))
    const relatedProducts = productsList.filter(
        products => products.category.id === productDetail.category.id)

    useEffect( () => {
        setQuantity(1)
    }, [id])

    const addCar = () => {
        const productsInCar = {
            id: id,
            quantity: quantity
        }
        dispatch(addProductCarThunk(productsInCar))
        return(
            <MyModal />
        )
    }

    return (
        <Row>

            <Col className="conteinerImg" >
                <img className='img-fluid' src={productDetail?.productImgs[0]} alt="" />
            </Col>

            <Col>
            <h2> {productDetail?.title} </h2>
            <p> {productDetail?.description} </p>
            <b> PRICE: {productDetail?.price} </b>
            <div className="quantity">
                    <Button  className='quantityButton' onClick={() => setQuantity(quantity - 1)} >
                        -
                    </Button>
                    {quantity}
                    <Button className='quantityButton' onClick={() => setQuantity(quantity + 1)}>
                        +
                    </Button>
                    <br />
                    <Button className='quantityButtonBuy' onClick={addCar} >
                        ADD TO CAR
                    </Button>
                </div>
            </Col>

            <Col lg={3}  className="conteinerProductRelated" >
                <ListGroup>
                    {
                        relatedProducts.map(products => (
                            <ListGroup.Item key={products.id} >
                                <Link to={`/product/${products.id}`} >
                                    <img src={products.productImgs[0]} alt="" className='img-fluid' />
                                    {products.title}
                                </Link>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Col>

        </Row>
    );
};

export default ProductDetail;
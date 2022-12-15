import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { ListGroup } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"

const Purchases = () => {

    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases.data?.purchases)
    const navigate = useNavigate()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <h1>Purchases</h1>
            <ListGroup>
                {
                    purchases?.map(purchases => {
                        const date = new Date(purchases.createdAt)
                        return (
                            <h4 key={purchases.id} className="mt-5" >
                                {date.toLocaleDateString(undefined, options) }
                                {
                                    purchases.cart.products.map(productsPurchases => (
                                        <ListGroup.Item key={productsPurchases.id} onClick={() => navigate(`/product/${productsPurchases.id}`)} >
                                            <h2> {productsPurchases.title} </h2>
                                            <b> {productsPurchases.price} </b>
                                            <b className='mr-5'>quantity: {productsPurchases.productsInCart?.quantity} </b>
                                        </ListGroup.Item>
                                    ))
                                }
                            </h4>
                        )
                    })
                }
            </ListGroup>
        </div>
    );
};

export default Purchases;
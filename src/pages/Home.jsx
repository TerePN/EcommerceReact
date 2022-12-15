import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, InputGroup, Form, Col, Row, ListGroup, Card} from 'react-bootstrap';
import '../styles/homeStyle.css'
import MyModal from '../components/MyModal';

const Home = () => {

    const products = useSelector(state => state.products)
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([])
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

    useEffect(() => {
        setProductsFiltered(products)
    }, [products])

    const filterCategory = (id) => {
        const filter = products.filter(product => product.category.id === id)
        setProductsFiltered(filter)
    }

    const searchProduct = () => {
        const filtered = products.filter(
            product => product.title.toLowerCase().includes(searchInput.toLowerCase()))
        setProductsFiltered(filtered)
    }

    return (
        <Row>
            <Col lg={3}>
                <ListGroup>
                    {
                        categories.map(category => (
                            <Button
                                variant="primary"
                                key={category.id}
                                style={{ cursor: 'pointer' }}
                                onClick={() => filterCategory(category.id)}> {category.name}
                            </Button>
                        ))
                    }
                </ListGroup>
            </Col>

            <Col>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Search product"
                        onChange={e => setSearchInput(e.target.value)}
                        value={searchInput} />
                    <Button variant="dark"
                        onClick={searchProduct}>
                        Button
                    </Button>
                </InputGroup>
                <Row xs={1} md={2} xl={3} className="g-4">
                    {
                        productsFiltered.map(product => (
                            <Col  className='conteinerCard' key={product.id}>
                                <Card
                                    className='conteinerCard--card'
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    style={{ height: '100%', cursor: 'pointer' }} >
                                        <div className='card--conteinerImg'>
                                    <Card.Img
                                        variant="top"
                                        className='card--imgProducts'
                                        src={product.category.name === "Smart TV" ?
                                                product.productImgs[1] : product.productImgs[0]}
                                    />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text> Price : {product.price} $ </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Col>
        </Row>
    );
};

export default Home;
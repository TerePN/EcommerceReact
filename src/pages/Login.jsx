import React from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()

    const submit = (data) => {
        axios.post('https://e-commerce-api.academlo.tech/api/v1/users/login', data)
            .then(res => {
                localStorage.setItem("token", res.data.data.token)
                navigate('/')
            })
            .catch(error => {
                if (error.response?.status == 404) {
                    alert('credenciales invalidas')
                }
                console.log(error.response)
            })
    }

    const tokenExists = () => {
        const token = localStorage.getItem("token")
        return token !== "";
    }

    const logOut = () => {
        localStorage.setItem('token', '')
        navigate('/login')
    }

    return (
        <div style={{ maxWidth: '500px', margin: "0 auto" }}>
            {tokenExists() ?
                <Button variant="dark" style={{margin: "0, auto"}} onClick={logOut} >LOGOUT</Button>
                :  <> <h1>Login</h1>
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control {...register("email")} type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control {...register("password")} type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </>
            }
        </div>
    );
};

export default Login;
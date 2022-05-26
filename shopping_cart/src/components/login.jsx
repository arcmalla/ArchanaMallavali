import React, { useState } from "react";
import { Container, Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    })

    const login = () => {
        if (loginDetails['email'].trim() != "") {
            if (loginDetails['password'].trim() != "") {
                navigate('/home')

            } else {
                toast.warn("Please enter password")
            }

        } else {
            toast.warn("Please enter email id")
        }
        // do your logic
    }
    return (
        <div style={{ marginTop: '150px' }}>

            <Container>
                <Row>
                    <Col>
                        <div style={{ fontWeight: 'bold', fontSize: '30px' }}>
                            Login
                        </div>
                        <br></br>
                        <div>
                            Get access to your Orders,Wishlist and Recomendations
                        </div>

                    </Col>
                    <Col>
                        <>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" value={loginDetails['email']} placeholder="name@example.com" onChange={(e) => {
                                    let details = { ...loginDetails }
                                    details['email'] = e.target.value
                                    setLoginDetails(details)
                                }} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" value={loginDetails['password']} placeholder="Password" onChange={(e) => {
                                    let details = { ...loginDetails }
                                    details['password'] = e.target.value
                                    setLoginDetails(details)

                                }} />
                            </FloatingLabel>
                            <br></br>

                            <Button variant="danger" size="lg" style={{ width: '100%' }} onClick={login}>
                                Login
                            </Button>
                        </>

                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default Login
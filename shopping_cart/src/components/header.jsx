import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Navbar"
import { useNavigate } from "react-router-dom"
import { items } from "../utilityService"
import Emitter from "../emitterservice"
import {isMobile} from 'react-device-detect';

function Header() {
    const [items_list, setItemslist] = useState(items)
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    const navigate = useNavigate()
    const navigateTo = (type) => {
        navigate('/' + type)
    }
    useEffect(() => {
        Emitter.on("CART_ITEMS", (newvalue) => {
            let list = [...newvalue]
            setItemslist(list)
        })
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    })


    const getImage = () => {
        const images = require.context('../../static/images', true);
        let someVariable = "logo.png"
        let dynamicImage = images(`./${someVariable}`);
        return dynamicImage

    }
    const getImageC = () => {
        const images = require.context('../../static/images', true);
        let someVariable = "cart.svg"
        let dynamicImage = images(`./${someVariable}`);
        return dynamicImage

    }

    return (

        <Navbar bg="light" expand="lg" fixed="top" style={{ marginLeft: '5%' }} >
            {
                isMobile?<div>
 {width <= 768 ? <Container >
                {/* <Navbar.Brand href="#home">
                </Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div style={{ width: '300px' }}>
                        <div>
                            <span onClick={() => navigateTo("")} style={{ cursor: 'pointer' }}>Signin</span> &nbsp; &nbsp; <span onClick={() => navigateTo("signup")} style={{ cursor: 'pointer' }}>Register</span>
                        </div>
                        <div onClick={() => navigateTo("cart")} style={{ cursor: 'pointer' }}>
                            {/* <img src={getImageC()} style={{ color: 'red', width: '50px' }} /> {items_list.length} itmes */}
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container> : <Container >
                {/* <Navbar.Brand href="#home"><img src={getImage()} /></Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" style={{ width: '100%' }}>
                        <Nav.Link onClick={() => navigateTo("home")} >Home</Nav.Link>
                        <Nav.Link onClick={() => navigateTo("products")} >Products</Nav.Link>
                    </Nav>
                    <div style={{ width: '300px' }}>
                        <div>
                            <span onClick={() => navigateTo("")} style={{ cursor: 'pointer' }}>Signin</span> &nbsp; &nbsp; <span onClick={() => navigateTo("signup")} style={{ cursor: 'pointer' }}>Register</span>
                        </div>
                        <div onClick={() => navigateTo("cart")} style={{ cursor: 'pointer' }}>
                            {/* <img src={getImageC()} style={{ color: 'red', width: '50px' }} /> {items_list.length} itmes */}
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>}
                </div>:<Container >
                {/* <Navbar.Brand href="#home"><img src={getImage()} /></Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" style={{ width: '100%' }}>
                        <Nav.Link onClick={() => navigateTo("home")} >Home</Nav.Link>
                        <Nav.Link onClick={() => navigateTo("products")} >Products</Nav.Link>
                    </Nav>
                    <div style={{ width: '300px' }}>
                        <div>
                            <span onClick={() => navigateTo("")} style={{ cursor: 'pointer' }}>Signin</span> &nbsp; &nbsp; <span onClick={() => navigateTo("signup")} style={{ cursor: 'pointer' }}>Register</span>
                        </div>
                        <div onClick={() => navigateTo("cart")} style={{ cursor: 'pointer' }}>
                            {/* <img src={getImageC()} style={{ color: 'red', width: '50px' }} /> {items_list.length} itmes */}
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
            }
           

        </Navbar>
    )

}

export default Header

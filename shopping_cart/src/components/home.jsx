import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Carousel, Card } from "react-bootstrap";
import { categories, banners } from "../api_config"
import axios from "axios";
import { useNavigate } from "react-router-dom"

function Home() {

    const [categories_list, setCategories] = useState([])
    const [banner, setBanners] = useState([])
    useEffect(() => {
        getCategories()
        getBanners()
    }, [])
    const navigate = useNavigate()
    const navigateTo = (type) => {
        navigate('/' + type)
    }

    const getBanners = () => {
        const endPoint = banners()
        axios.get(endPoint).then((response) => {
            setBanners(response.data);
        });
    }

    const getCategories = () => {
        const endPoint = categories()
        axios.get(endPoint).then((response) => {
            setCategories(response.data);
        });
    }
    const getImage = (url) => {
        const images = require.context('../../static/images', true);
        let someVariable = url != undefined ? url.split("images/")[1] : "category/baby.png"
        let dynamicImage = images(`./${someVariable}`);
        return dynamicImage

    }
    return (
        <div style={{ marginTop: '10%' }}>

            <Container>
                {
                    banner.length > 0 ?
                        <Carousel>
                            {
                                banner.map(data => {
                                    return (
                                        <Carousel.Item interval={1000}>
                                             <img
                                                className="d-block w-100"
                                                src={getImage(data.bannerImageUrl)}
                                                alt={data.bannerImageAlt}
                                            /> 
                                            
                                        </Carousel.Item>
                                    )
                                })
                            }

                            
                        </Carousel> : ""
                }
                {
                    categories_list && categories_list.map((data, index) => {
                        return (
                            <Card style={{ padding: '10px', margin: '10px' }} className="cardLike">
                                <Card.Body>
                                    {index % 2 === 0 ? <Row>
                                        <Col sm={3} md={3} lg={3} xs={3}>
                                            <img src={getImage(data.imageUrl)} style={{ width: '200px', height: '150px' }} /> 
                                        </Col>
                                        <Col style={{ textAlign: "center", lineHeight:'3rem'}} sm={9} md={9} lg={9} xs={9}>
                                            <div style={{ fontWeight: 'bold' }}>
                                                {data.name}
                                            </div>
                                            <div>
                                                {data.description}
                                            </div>
                                            <Button variant="danger" size="lg" onClick={()=>navigateTo("products")} >
                                                Explore {data.key}
                                            </Button>
                                        </Col>
                                    </Row> : <Row>
                                        <Col style={{ textAlign: "center" }} sm={9} md={9} lg={9} xs={9}>
                                            <div style={{ fontWeight: 'bold',lineHeight:'3rem' }}>
                                                {data.name}
                                            </div>
                                            <div>
                                                {data.description}
                                            </div>
                                            <Button variant="danger" size="lg"  onClick={()=>navigateTo("products")}>
                                                Explore {data.key}
                                            </Button>
                                        </Col>
                                        <Col sm={3} md={3} lg={3} xs={3}>
                                             <img src={getImage(data.imageUrl)} style={{ width: '200px', height: '150px' }} /> 
                                        </Col>

                                    </Row>}


                                </Card.Body>
                            </Card>
                        )
                    })
                }

            </Container>
        </div>
    )
}

export default Home

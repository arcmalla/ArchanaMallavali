import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { products, categories, addToCart } from "../api_config"
import axios from "axios";
import { items } from "../utilityService"
import Emitter from "../emitterservice";



function Products_Mobile() {
    const [categories_list, setCategories] = useState([])
    const [products_list, setProducts] = useState({})
    const [selected_products, setSlectedProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    useEffect(() => {
        getCategories()


    }, [])

    const getProducts = (id) => {
        const endPoint = products()
        axios.get(endPoint).then((response) => {
            setProducts(response.data);
            const filteredItems = response.data.filter(x =>
                x.category == id
            );
            setSlectedProducts(filteredItems)

        });
    }
    const getCategories = () => {
        const endPoint = categories()
        axios.get(endPoint).then((response) => {
            setSelectedCategory(response.data[0].id)
            setCategories(response.data);
            getProducts(response.data[0].id)
        });
    }
    const getImage = (url) => {
        const images = require.context('../../static/images', true);
        let someVariable = url != undefined ? url.split("images/")[1] : "category/baby.png"
        let dynamicImage = images(`./${someVariable}`);
        return dynamicImage

    }
    const selectCategory = (event) => {
        setSelectedCategory(event.target.value)
        const filteredItems = products_list.filter(x =>
            x.category == event.target.value
        );
        setSlectedProducts(filteredItems)

    }
    const addToCart1 = (item) => {
        if (items.length > 0) {
            let avaiable = false
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === item.id) {
                    avaiable = true
                    items[i]['count'] = items[i]['count'] + 1
                    break;
                }

            }
            if (!avaiable) {
                item['count'] = 1
                items.push(item)
            }

        } else {
            item['count'] = 1
            items.push(item)
        }
        Emitter.emitt("CART_ITEMS", items)
        const endPoint = addToCart()
        axios.post(endPoint, item).then((response) => {
            alert(response.data.responseMessage)
        });

    }
    return (
        <div style={{ marginTop: '40%' }}>

            <Container>

                <Form.Select aria-label="Default select example" style={{background:'maroon'}}
                value={selectedCategory} onChange={(e) => selectCategory(e)}>
                    {
                        categories_list && categories_list.map(data => {
                            return (
                                <option value={data.id}>{data.name}</option>
                            )
                        })
                    }
                </Form.Select>
                {
                    selected_products && selected_products.map(data => {
                        return (
                            <div style={{ margin: '10px', paddingBottom: '10px' }} className="cardLike">
                                <div style={{ fontWeight: 'bold', height: '60px' }} className="desc">
                                    {data.name}
                                </div>
                                <Row>
                                    <Col>
                                        <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                             <span> <img src={getImage(data.bannerImageUrl)} style={{ width: '150px' }} /></span> 
                                        </div>

                                    </Col>
                                    <Col>
                                        <div style={{ height: '150px', background: 'lightgray' }} className="desc">
                                            {data.description}
                                        </div>
                                        <br></br>
                                        <Button variant="danger" size="lg" style={{ fontSize: '10px' }} onClick={() => addToCart1(data)}>
                                            Buy Now @ MRP Rs.{data.price}
                                        </Button>
                                    </Col>
                                </Row>





                            </div>
                        )
                    })
                }
            </Container>


        </div>
    )
}

export default Products_Mobile

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Carousel, Card } from "react-bootstrap";
import { items } from "../utilityService"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Emitter from "../emitterservice";

function Cart() {
    const [item_list, setItemList] = useState(items)
    const [total_amount,setTotalAmount] = useState(0)
    useEffect(() => {
        let amount = 0
        items.forEach(data=>{
            amount = amount+(data.price*data.count)
        })
        setTotalAmount(amount)
    }, [])
    const navigate = useNavigate()
    const navigateTo = (type) => {
        navigate('/' + type)
    }
    const addToCart1 = (item) => {
        let list = [...item_list]
        if (list.length > 0) {
            let avaiable = false
            for (var i = 0; i < list.length; i++) {
                if (list[i].id === item.id) {
                    avaiable = true
                    items[i]['count'] = items[i]['count'] + 1
                    list[i]['count'] = list[i]['count'] + 1
                    break;
                }

            }
            if (!avaiable) {
                item['count'] = 1
                items.push(item)
                list.push(item)
            }

        } else {
            item['count'] = 1
            items.push(item)
            list.push(item)
        }
         let amount = 0
        list.forEach(data=>{
            amount = amount+(data.price*data.count)
        })
        setTotalAmount(amount)
        // console.log(list)

        Emitter.emitt("CART_ITEMS", list)
        setItemList(list)
        console.log("sdasdsa", item_list)

    }

    const removeItem = (element) => {
        let list = [...item_list]
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === element.id) {
                if (list[i]['count'] == 1) {
                    items.splice(i, 1)
                    list.splice(i, 1)
                    setItemList(list)

                    break;
                } else {
                    items[i]['count'] = items[i]['count'] - 1
                    list[i]['count'] = list[i]['count'] - 1
                    setItemList(list)

                    break;

                }
            }

        }
        let amount = 0
        list.forEach(data=>{
            amount = amount+(data.price*data.count)
        })
        setTotalAmount(amount)

        Emitter.emitt("CART_ITEMS", list)
    }
    const getImag1 = () => {
        const images = require.context('../../static/images', true);
        let someVariable = "lowest-price.png"
        let dynamicImage = images(`./${someVariable}`);
        return dynamicImage

    }

    const getImage = (url) => {
        const images = require.context('../../static/images', true);
        let someVariable = url != undefined ? url.split("images/")[1] : "category/baby.png"
        let dynamicImage = images(`./${someVariable}`);
        return dynamicImage

    }
    return (
        <div className="cart_div">
            {
                item_list.length > 0 ? <Container>
                    <div className="cardLike" style={{padding:'10px'}}>
                        <span style={{fontWeight:'bold'}}> My Cart </span> {item_list.length} items
                    </div>
                    <br></br>
                    {
                        item_list && item_list.map((element, indes) => {
                            return (
                                <Row className="cardLike" style={{ margin: '5px', padding: '10px' }}>
                                    <Col style={{ display: 'inline-flex' }} sm={8} lg={8} md={8} >
                                        <div >
                                             <img src={getImage(element.imageURL)} style={{ width: '100px', height: '100px' }} /> 
                                        </div>
                                        <div>
                                            <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                                                {element.name}
                                            </div>
                                            <div>
                                                <span className="add_or_remove" onClick={() => removeItem(element)} style={{cursor:'pointer'}}>-</span>&nbsp; {element.count} <span className="add_or_remove" style={{cursor:'pointer'}} onClick={() => addToCart1(element)}>+</span> &nbsp; {element.price}
                                            </div>
                                        </div>


                                    </Col>
                                    <Col style={{ textAlign: 'right', marginTop:'3%' }} sm={4} lg={4} md={4}>
                                        Rs {element.price * element.count}
                                    </Col>

                                </Row>
                            )
                        })
                    }
                    <br></br>
                    <div style={{ padding: '20px', background: "#FFFFFF" }} className="cardLike">
                        <img src={getImag1()} /> You wont find it cheaper anywhere 
                    </div>
                    <div className="fixed-bottom" style={{background:'maroon',color:"white"}}>
                       
                    <Button variant="" size="lg" style={{ fontSize: '10px', float:'left', color:'white' }} onClick={() => navigateTo("products")}>
                            Proceed to Checkout 
                        </Button>
                        <div style={{float:'right'}}>
                            Rs{total_amount} 

                        </div>
                    </div>



                </Container> : <div className="noItems">
                    <div style={{ fontWeight: "bold" }}>No Items in your cart</div>
                    <div>
                        Your favourite items are just a click away
                    </div >
                    <div className="fixed-bottom">
                        <Button variant="danger" size="lg" style={{ fontSize: '10px', width:'100%' }} onClick={() => navigateTo("products")}>
                            Start Shopping
                        </Button>
                    </div>
                </div>
            }


        </div>
    )
}

export default Cart

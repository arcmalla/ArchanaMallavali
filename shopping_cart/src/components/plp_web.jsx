import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { products, categories,addToCart } from "../api_config"
import { items } from "../utilityService"
import Emitter from "../emitterservice";
import axios from "axios";

function Products_Web() {
    const [categories_list, setCategories] = useState([])
    const [products_list, setProducts] = useState([])
    const [selected_products, setSlectedProducts] = useState([])
    const [selectedCategory,setSelectedCategory]=useState("")

    useEffect(() => {
        getCategories()
        getProducts()
        console.log(items)

    }, [])
    const addToCart1 = (item)=>{
        console.log(item)
        if(items.length > 0){
            let avaiable=false
            for(var i =0; i<items.length; i++){
                if(items[i].id === item.id){
                    avaiable=true
                    items[i]['count']=items[i]['count']+1
                    break;
                }

            }
            if(!avaiable){
                item['count']=1
                items.push(item) 
            }

        }else{
            item['count']=1
            items.push(item)  
        }
        Emitter.emitt("CART_ITEMS",items)
        // const endPoint = addToCart()
        // axios.post(endPoint, item).then((response) => {
        //     alert(response.data.responseMessage)
        // });
       
    }
    const getProducts = () => {
        const endPoint = products()
        axios.get(endPoint).then((response) => {
            setProducts(response.data);
            setSlectedProducts(response.data)
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
        let someVariable = url!= undefined? url.split("images/")[1]:"category/baby.png"
        let dynamicImage = images(`./${someVariable}`);
        return dynamicImage

    }
    const selectCategory = (id) => {
        console.log("id", id)
        if(selectedCategory==id){
            setSelectedCategory("")
            
              setSlectedProducts(products_list)
        }else{
            setSelectedCategory(id)
            const filteredItems = products_list.filter( x => 
                x.category == id
              );
              setSlectedProducts(filteredItems)
        }
        
    }
    return (
        <div style={{ marginTop: '10%' }}>

            <Container>
                <Row>
                    <Col md={2} lg={2} style={{ background: 'lightgray' }}>
                        {
                            categories_list && categories_list.map(data => {
                                return (
                                    <div onClick={() => selectCategory(data.id)} style={{background:data.id==selectedCategory?"maroon":"light gray"}}>
                                        <span style={{ paddingTop: '10px', paddingBottom: '10px' }}>{data.name}</span>
                                        <hr></hr>
                                    </div>
                                )
                            })
                        }

                    </Col>
                    <Col md={10} lg={10}>
                        <Row>
                            {
                                selected_products && selected_products.map((data, index) => {
                                    return (
                                        <Col md={3} lg={3} style={{ margin: '10px', width: '250px',paddingBottom:'10px' }} className="cardLike">
                                            <div style={{ fontWeight: 'bold', height: '60px' }} className="desc">
                                                {data.name}
                                            </div>
                                            <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                 <img src={getImage(data.imageURL)} style={{ width: '150px' }} /> 
                                            </div>
                                            <br></br>
                                            <div style={{ height: '150px', background: 'lightgray' }} className="desc">
                                                {data.description}
                                            </div>
                                            <br></br>
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <span style={{marginTop:'14px'}}>MRP Rs.  {data.price}</span>
                                                    </Col>
                                                    <Col>
                                                        <Button variant="danger" size="lg" style={{fontSize:'10px'}} onClick={()=>addToCart1(data)} >
                                                            Buy Now
                                                        </Button>
                                                    </Col>
                                                </Row>

                                            </div>

                                        </Col>
                                    )
                                })
                            }
                        </Row>

                    </Col>

                </Row>
            </Container>


        </div>
    )
}

export default Products_Web

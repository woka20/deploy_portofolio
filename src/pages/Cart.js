import React from 'react'
import {store_product,store, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Col, Card,Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"


class Cart extends React.Component{
    checkLogin=()=>{
        if (localStorage.getItem("isLogin")=== null || localStorage.getItem("isLogin")=== "admin" ){
            alert("You cannot access this page!")
            this.props.history.push("/")

        }
    }
    
    getProductById = async ()=>{
        const active_item=this.props.active_product_id
        const listProduk=this.props.listProduk
        console.log("GGGGGG", active_item)
        if (listProduk[0].tipe==="Premium"){
            const types="premium"
            const req = {method: "get",
                    url: `https://gundam-woka.my.id/products/${types}/${active_item}`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
                await axios(req)
                .then((response)=>{
                    
                    store.setState({picked_product:response.data, isLoading:false})
                })
                .catch((error)=>alert(error))
        }else{
            const types="used"
            const req = {method: "get",
                    url: `https://gundam-woka.my.id/products/${types}/${active_item}`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
                await axios(req)
                .then((response)=>{
                
                    store.setState({picked_product:response.data, isLoading:false})})
                .catch((error)=>alert(error))
        }
    }

    postToCart=async()=>{
        const inputs={user_id:localStorage.getItem("id_user"),
                      product_id: this.props.active_product_id,
                      kurir:this.props.picked_courier,
                      quantity:this.props.picked_qty
    }

    
        const req = {method: "post",
        url: `https://gundam-woka.my.id/shop/cart`,
        headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")},
        params:inputs
    
    };
    
      await axios(req)
      .then((response)=>{
       
        store.setState({cart:response.data, isLoading:false})
        this.props.history.push('/product')
    })
     .catch((error)=>{
        if (error.response.data){
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            alert(error.response.data.status);
        }else{
            alert(error)
        }
    })
}

    render(){
        this.checkLogin()
        this.getProductById()
        const picked_product=this.props.picked_product
        const courier=this.props.courier
        const qty=this.props.qty
      
       
        return <React.Fragment>
                 <NavigationBar />
                     <Row className="Cart">
                         <Col md="6">
                         <a target="blank" href={picked_product.gambar}>
                         <img className="product-images" src={picked_product.gambar}/>
                         </a>
                         </Col>
                         <Col md="6">
                         <h3>{picked_product.nama_produk}</h3>
                         <h4>Price: Rp {picked_product.harga}</h4>
                         <p>{picked_product.category}</p>
                         <p>{picked_product.description}</p>
                         <Form style={{ width: '18rem' }} onSubmit={event=>event.preventDefault()}>
                            <Form.Group>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control as="select" value={this.props.picked_qty} name="picked_qty" onChange={event=>this.props.handleSetGlobal(event)}>
                                         <option>0</option>
                                {qty.map(item=>(
                                        <option value={item}>{item}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Courier</Form.Label>
                                <Form.Control as="select" value={this.props.picked_courier} name="picked_courier" onChange={event=>this.props.handleSetGlobal(event)}>
                                         <option></option>
                                {courier.map(item=>(
                                        <option value={item}>{item}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                         </Form>
                         <Button variant="primary" onClick={()=>this.postToCart()}>Confirm Order</Button>
                         </Col>
                     </Row>
                 
                        
               </React.Fragment>
    }
}

export default connect("listProduk, active_product_id, picked_product, qty, courier, picked_qty,picked_courier", actions)(withRouter(Cart))

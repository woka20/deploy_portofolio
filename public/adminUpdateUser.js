import React from 'react'
import {store_product, actions, store} from "../src/store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Col, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../src/components/navBar"
import  { Redirect } from 'react-router-dom'


class AdminToUser extends React.Component{

    componentDidMount = async ()=>{
        
        const active_item=this.props.active_product_id
        const listProduk=this.props.listProduk
       
        
  
            const req = {method: "get",
                    url: `http://localhost:5000/checkout`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
                await axios(req)
                .then((response)=>{
                    store.setState({listUser:response.data})
                    
                    
                })
                .catch((error)=>alert(error))
        
    }
    checkAdmin=()=>{
        if (localStorage.getItem("isLogin")!== "admin"){
            alert("You cannot access this page!")
            this.props.history.push("/Dashboard")
        }
    }

    checkLogin=()=>{
        if (localStorage.getItem("isLogin")=== null){
            alert("You cannot access this page!")
            this.props.history.push("/")

        }
    }
    
    updateUserPayment = async ()=>{
            const inputs={
                        payment: this.props.payment,
                        id:this.props.order_id
                        
                    }
                
                const active_item=this.props.active_product_id
                console.log("PPPPPP", active_item)
             
                const req = {method: "put",
                            url: `http://localhost:5000/checkout`,
                            headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")},
                            data:inputs
            
                            };
                await axios(req)
                .then((response)=>{
                alert("Product Successfully Updated")
                this.props.history.push("/Dashboard")
                                
                })
                .catch((error)=>alert(error))
                  
            
    }
    render(){
        const listProduk=this.props.dashboard
        console.log("999", localStorage.getItem("id_user"))
        if(listProduk.tipe==="Premium" || listProduk.user_id != localStorage.getItem("id_user")){
            this.checkAdmin()
        }

        this.checkLogin()        
        return( 
            <React.Fragment>
                <NavigationBar />
                <h1 className="update-title">Update Form</h1>
                <Row>
                  <Col md="6" className="UpdateForm">
                    <label>Product ID</label>
                    <Button block disabled>{listProduk.user_id}</Button>
                    <label>Total Transfer</label>
                    <Button block disabled>{listProduk.nama_produk}</Button>
                    <label>Status Pembayaran</label>
                    <Button block disabled>{listProduk.category}</Button>
                 </Col>
                 <Col md="6">
                    <Form onSubmit={event=> event.preventDefault()}>
                    
                    <Form.Group>
                        <Form.Label>ID Produk</Form.Label>
                        <Form.Control type="text" name="nama_produk" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Harga</Form.Label>
                        <Form.Control type="text" name="category" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status Pembayaran</Form.Label>
                        <Form.Control type="text" name="harga" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Button variant="outline-info" type="submit" onClick={() => this.updateProductByUser()}>
                    Update Product</Button>
                  </Form>

                  </Col>
                </Row>
            </React.Fragment>)   

    }
}

export default connect(actions)(withRouter(AdminToUser))


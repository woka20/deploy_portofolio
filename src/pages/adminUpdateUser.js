import React from 'react'
import {store_product, actions, store} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Col, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"

import  { Redirect } from 'react-router-dom'


class AdminToUser extends React.Component{

    renderAgain = async ()=>{
            const active_item=this.props.active_cart_id
            const req = {method: "get",
                    url: `https://gundam-woka.my.id/shop/confirm/${active_item}`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
                await axios(req)
                .then((response)=>{
                    if (response.data.bukti_pembayaran !== null){
                      
                        store.setState({listUser:response.data.bukti_pembayaran.replace("b","")})
                        store.setState({listUser:this.props.listUser.replace(/'/g,"")})    
                    }else{
                        console.log("null payment evidence")
                    }
                    store.setState({details_cart:response.data})
                    
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
            this.props.history.push("/Payments")

        }
    }
    
    updateUserPayment = async ()=>{
            const inputs={
                        payment: this.props.payment,
                        id:this.props.id_order
                        
                    }
                
             
                const req = {method: "put",
                            url: `https://gundam-woka.my.id/shop/checkout`,
                            headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")},
                            data:inputs
            
                            };
                await axios(req)
                .then((response)=>{
                store.setState({isLoading:false})    
                alert("Payment Status Succesfully Updated")
                this.props.history.push("/payments")
                                
                })
                .catch((error)=>alert(error))    
    }


    render(){
        this.renderAgain()
     
        if (this.props.listUser.length !== 0){
           
            const listCostumer=this.props.listUser
            const bukti=listCostumer
        
            const new_barbuk='data:image/jpeg;base64,'+ bukti
      
            store.setState({new_payment_ss:new_barbuk}) 
            if(listCostumer.tipe==="Premium" || listCostumer.user_id != localStorage.getItem("id_user")){
                this.checkAdmin()
                
           
            }
        }else if (this.props.listUser.length === 0){
            store.setState({new_payment_ss:"https://tby.jogjaprov.go.id/booking/assets/image/no-image-available.jpg"})
        }
        const details=this.props.details_cart
 
        this.checkLogin()
        return( 
            <React.Fragment>
                <NavigationBar />
                <h1 className="update-title">Update Cart</h1>
                <Row>
                  <Col md="6" className="UpdateForm">
                  <label>Order ID</label>
                    <Button block disabled>{details.id}</Button>
                    <label>Product ID</label>
                    <Button block disabled>{details.product_id}</Button>
                    <label>Total Transfer</label>
                    <Button block disabled>{details.total_harga}</Button>
                    <label>Status Pembayaran</label>
                    <Button block disabled>{details.payment}</Button>
                    <label>Bukti Pembayaran</label><br/>
                    <img className="payment_evidence" src={this.props.new_payment_ss}/>
                 </Col>
                 <Col md="6">
                    <Form onSubmit={event=> event.preventDefault()}>
                    
                    <Form.Group>
                        <Form.Label>Order ID</Form.Label>
                        <Form.Control type="text" name="id_order" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status Pembayaran</Form.Label>
                        <Form.Control type="text" name="payment" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Button variant="outline-info" type="submit" onClick={() => this.updateUserPayment()}>
                    Update</Button>
            
                  </Form>

                  </Col>
                </Row>
            </React.Fragment>)   

    }
}

export default connect("listUserProduct, new_payment_ss,payment,details_cart, isLoading,id_order, active_cart_id",actions)(withRouter(AdminToUser))


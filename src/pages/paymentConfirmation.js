import React from 'react'
import {store_product,store, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container,Col, CardDeck, Card,Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"
import toFile from "data-uri-to-file"
import fs from 'fs'

class Confirmation extends React.Component{
    postConfirm=async()=>{
        const inputs={
            bukti_pembayaran:this.props.payment
        }
        
        const id=this.props.etc.id
        const req={method:"put",
        url:`https://gundam-woka.my.id/shop/confirm/${id}`,
        headers:{"Access-Control-Flow-Origin":"*", "Authorization":'Bearer '+ localStorage.getItem("token")},
        data: inputs
                  
        }
        await axios(req)
        .then((response)=>{
            store.setState({confirm_pay:response.data})
            alert("Submit bukti pembayaran berhasil! Tunggu beberapa saat sampai status pembayaran berubah")
            this.props.history.push("/")
        })
        .catch((error)=> alert("Image size or file is too large or file is not JPG"))
    }
    render(){
       
        return (<React.Fragment>
                  <NavigationBar/>
                  <div>
                      <label>Order ID</label>
                      <Button block disabled>{this.props.etc.id}</Button>
                  </div>
                  <Form onSubmit={event => event.preventDefault()}>
                  <Form.Group>
                      <Form.Label>Transfer Receipt (only accept JPG file)</Form.Label>
                      <Form.Control type="file" name="payment" onChange={event=>this.props.handleFileUpload(event)} webkitdirectory></Form.Control>
                      <img src={this.props.payment}/>
                  </Form.Group>
                  <Button onClick={()=>this.postConfirm()}>Submit</Button>
                  </Form>

                </React.Fragment>)
    }
}

export default connect("confirm_pay,etc, payment,listProduk", actions)(withRouter(Confirmation))

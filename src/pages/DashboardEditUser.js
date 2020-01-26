import React from 'react'
import {store_product, actions, store} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Col, Table, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavBarAdmin from "../components/navbarAdmin"
import  { Redirect } from 'react-router-dom'


class AdminToUser extends React.Component{

    getShopCart = async ()=>{
  
            const req = {method: "get",
                    url: `https://gundam-woka.my.id/shop/checkout`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
                await axios(req)
                .then((response)=>{
                   
                    store.setState({listUserProduct:response.data})
                    
                    
                })
                .catch((error)=>alert(error))
        
    }

    handleChangeAdmin=(event)=>{
        store.setState({active_cart_id:event})
        this.props.history.push("/adminUpdateUser")

    }

    checkAdmin=()=>{
        if (localStorage.getItem("isLogin")!== "admin"){
            alert("You cannot access this page!")
            this.props.history.push("/Dashboard")
        }
    }

    checkLogin=()=>{
        if (localStorage.getItem("isLogin")!== "admin"){
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
             
                const req = {method: "put",
                            url: `https://gundam-woka.my.id/shop/checkout`,
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
        this.getShopCart()
        const listProduk=this.props.listUserProduct
 

        this.checkLogin()        
        return( 
            <React.Fragment>
                <NavBarAdmin />
                <Table onClick={event=>event.preventDefault()} striped bordered hover size="sm" variant="dark">
                      <thead>
                          <tr>
                              <th>id</th>
                              <th>User ID</th>
                              <th>Product ID</th>
                              <th>Ongkir</th>
                              <th>Total Harga</th>
                              <th>Status</th>
                          </tr>
                    </thead>
                    <tbody>
                        
                           {listProduk.map(item=>(
                            <tr className="product-admin">
                            <td>{item.id}</td>
                            <td>{item.user_id}</td>
                            <td>{item.product_id}</td>
                            <td>{item.ongkir}</td>
                            <td>{item.total_harga}</td>
                            <td>{item.payment}</td>
                            <td><Button variant="info" onClick={event=>this.handleChangeAdmin(item.id)}>Update</Button></td>
                            
                            </tr>
                            ) )}
                    </tbody> 
                </Table>
               
            </React.Fragment>)    

    }
}

export default connect("listUserProduct, active_cart_id",actions)(withRouter(AdminToUser))

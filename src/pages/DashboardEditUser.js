import React from 'react'
import {store_product, actions, store} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Col, Table, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"
import  { Redirect } from 'react-router-dom'


class AdminToUser extends React.Component{

    apanih = async ()=>{
  
            const req = {method: "get",
                    url: `http://localhost:5000/shop/checkout`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
                await axios(req)
                .then((response)=>{
                    console.log("????", response.data)
                    store.setState({listUser:response.data})
                    
                    
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
                            url: `http://localhost:5000/shop/checkout`,
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
        this.apanih()
        console.log("999", this.props.dashboard)
        const listkons=[]
        const listProduk=this.props.listUser
 
        if(listProduk.tipe==="Premium" || listProduk.user_id != localStorage.getItem("id_user")){
            this.checkAdmin()
        }

        this.checkLogin()        
        return( 
            <React.Fragment>
                <NavigationBar />
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
                             {/* <Button variant="danger" onClick={event=>this.deleteProductbyID(item.id)}>Delete</Button></td> */}
                            </tr>
                            ) )}
                    </tbody> 
                </Table>
               
            </React.Fragment>)    

    }
}

export default connect("listUser, active_cart_id",actions)(withRouter(AdminToUser))

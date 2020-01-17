import React from 'react'
import {store_product,store, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Card,Row, Col,Form, Button, ListGroup, Table, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"
import transfer from "../images/transfer.jpg"


class Checkout extends React.Component{
   
    checkLogin=()=>{
        if (localStorage.getItem("isLogin")=== null){
            alert("You cannot access this page!")
            this.props.history.push("/login")

        }
    }
    
    componentDidMount= async()=>{
        
        const req = {method: "get",
                    url: `http://localhost:5000/shop/cart`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}
                 
        };
        await
        axios(req)
        .then((response)=>{
            console.log("APASIH", response.data)
            store.setState({checkout:response.data.Product, etc:response.data})
        
    }
    ).catch((error)=>alert(error))
}

   
    render(){
        this.checkLogin()
        const checkout=this.props.checkout
        const etc=this.props.etc
        // const everthingProduct=Object.values(checkout).filter(item =>{
        //     if (item.id===this.props.etc.product_id){
        //         return item
                
        //     }
        //     return false
        // }) 
   
            
        return <React.Fragment>
                 <NavigationBar />
                 <Row>
                     <Col md="6">
                     <Table striped bordered hover size="sm" variant="light">
                      <thead>
                          <tr>
                              <th>Kode Pelapak</th>
                              <th>Kode Order</th>
                              <th>Nama Produk</th>
                              <th>Total Transfer</th>
                              <th>Kurir</th>
                              <th>Jumlah Pesanan</th>
                              <th>Berat (dalam Gram)</th>
                              <th>Status Bayar</th>
                          </tr>
                     </thead>
                     <tbody>
                            <tr className="product-admin">
                            <td>{checkout.user_id}</td> 
                            <td>{etc.id}</td>                                                                             
                            <td>{checkout.nama_produk}</td>
                            <td>{etc.total_harga}</td>
                            <td>{etc.kurir}</td>
                            <td>{etc.quantity}</td>
                            <td>{checkout.berat}</td>
                            <td>{etc.payment}</td>
                            </tr>
                            
                    </tbody> 
                    <Button variant="primary">Konfirmasi Pembayaran</Button>
                </Table> 

                     </Col>
                     <Col md="6">
                        <img src={transfer}/>
                     </Col>
                 </Row>
                                                
               </React.Fragment>
    }
}

export default connect("listProduk, checkout, etc", actions)(withRouter(Checkout))

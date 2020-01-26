import React from 'react'
import {store_product, actions, store} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Col, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"
import  { Redirect } from 'react-router-dom'
import NavAdmin from "../components/navbarAdmin"


class UpdateAdmin extends React.Component{

    componentDidMount = async ()=>{
        
        const active_item=this.props.active_product_id
        const listProduk=this.props.listProduk
       
        if (listProduk[0].tipe==="Premium"){
            const types="premium"
            const req = {method: "get",
                    url: `https://gundam-woka.my.id/products/${types}/${active_item}`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
                await axios(req)
                .then((response)=>{
                    store.setState({dashboard:response.data})
                    
                })
                .catch((error)=>alert(error))
        }else{
            const types="used"
            const req = {method: "get",
                    url: `http://gundam-woka.my.id/products/${types}/${active_item}`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
                await axios(req)
                .then((response)=>{
                    store.setState({dashboard:response.data})
                    
                })
                .catch((error)=>alert(error))
        }
    }
    

    checkLogin=()=>{
        if (localStorage.getItem("isLogin")!== "admin"){
            alert("You cannot access this page!")
            this.props.history.push("/")

        }
    }
    
    updateProductByAdmin = async ()=>{
            const inputs={
                        user_id: this.props.user_id,
                        nama_produk: this.props.nama_produk,
                        category: this.props.category,
                        harga: this.props.harga,
                        stok: this.props.stok,
                        berat: this.props.berat,
                        gambar: this.props.gambar,
                        preview_1: this.props.preview_1,
                        preview_2: this.props.preview_2,
                        preview_3: this.props.preview_3,
                        description: this.props.description
                    }
                const active_item=this.props.active_product_id
                const listProduk=this.props.dashboard
                
                if (listProduk.tipe==="Premium"){
                    const types="premium"
                    const req = {method: "put",
                                url: `https://gundam-woka.my.id/products/${types}/${active_item}`,
                                headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")},
                                data:inputs
            
                            };
                            await axios(req)
                            .then((response)=>{
                                alert("Product Successfully Updated")
                                this.props.history.push("/DashboardHome")
                                
                            })
                            .catch((error)=>alert(error))
                    }else{
                        const types="used"
                        const req = {method: "put",
                                url: `https://gundam-woka.my.id/products/${types}/${active_item}`,
                                headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")},
                                data:inputs
            
                            };
                            await axios(req)
                            .then((response)=>{
                                alert("Product Successfully Updated")
                                this.props.history.push("/DashboardHome")
                                
                            })
                            .catch((error)=>alert(error))
                    }
                }
    render(){
        this.checkLogin()
        const listProduk=this.props.dashboard
        return( 
            <React.Fragment>
                <NavAdmin />
                <h1 className="update-title">Update Form</h1>
                <Row>
                  <Col md="6" className="UpdateForm">
                    <label>Kode Pelapak</label>
                    <Button block disabled>{listProduk.user_id}</Button>
                    <label>Nama Produk</label>
                    <Button block disabled>{listProduk.nama_produk}</Button>
                    <label>Category</label>
                    <Button block disabled>{listProduk.category}</Button>
                    <label>Harga</label>
                    <Button block disabled>{listProduk.harga}</Button>
                    <label>Stok</label>
                    <Button block disabled>{listProduk.stok}</Button>
                    <label>Berat</label>
                    <Button block disabled>{listProduk.berat}</Button>
                    <div className="container-product-image">
                    <label>Gambar</label><br/>
                    <img className="product-img" src={listProduk.gambar}/>
                    </div>
                    <div className="container-product-image">
                    <label>Preview 1</label><br/>
                    <img className="product-img" src={listProduk.preview_1}/>
                    </div>
                    <div className="container-product-image">
                    <label>Preview 2</label><br/>
                    <img className="product-img" src={listProduk.preview_2}/>
                    </div>
                    <div className="container-product-image">
                    <label>Preview 3</label><br/>
                    <img className="product-img" src={listProduk.preview_3}/>
                    </div>
                    <label>Description</label>
                    <Button block disabled>{listProduk.description}</Button>
                 </Col>
                 <Col md="6">
                    <Form onSubmit={event=> event.preventDefault()}>
                    <Form.Group>
                        <Form.Label>Kode Pelapak</Form.Label>
                        <Form.Control type="text" name="user_id"  onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nama Produk</Form.Label>
                        <Form.Control type="text" name="nama_produk" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Harga</Form.Label>
                        <Form.Control type="text" name="harga" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Stok</Form.Label>
                        <Form.Control type="text" name="stok" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Berat</Form.Label>
                        <Form.Control type="text" name="berat" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Gambar</Form.Label>
                        <Form.Control type="text" name="gambar" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preview 1</Form.Label>
                        <Form.Control type="text" name="preview_1" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label >Preview 2</Form.Label>
                        <Form.Control type="text" name="preview_2" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preview 3</Form.Label>
                        <Form.Control type="text" name="preview_3" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                                <Form.Label>Delete</Form.Label>
                                <Form.Control as="select" value={this.props.deleted} name="deleted" onChange={event=>this.props.handleSetGlobal(event)}>
                                         <option></option>
                                        <option value="True">True</option>
                                        <option value="False">False</option>
                                
                                </Form.Control>
                            </Form.Group>
                    <Button variant="outline-info" type="submit" onClick={() => this.updateProductByAdmin()}>
                    Update Product</Button>
                  </Form>

                  </Col>
                </Row>
            </React.Fragment>)   

    }
}

export default connect("dashboard,active_product_id,user_id, nama_produk, category, harga, stok, berat, gambar, preview_1, preview_2, preview_3,description, listProduk", actions)(withRouter(UpdateAdmin))


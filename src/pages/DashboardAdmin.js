import React from 'react'
import {store_product, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"
import NavAdmin from "../components/navbarAdmin"


class Admin extends React.Component{
  
    checkLogin=()=>{
            if (localStorage.getItem("isLogin")!== "admin"){
                alert("You cannot access this page!")
                this.props.history.push("/")
    
            }
        }
    
    postProductByAdmin = async ()=>{
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
            const req = {method: "post",
                        url: `https://gundam-woka.my.id/products/premium/1`,
                        headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token"),'Content-Type': 'application/json'},
                        data: inputs
                    };
            await axios(req)
            .then((response)=>{
                alert("New Product Has Been Added")
                this.props.history.push("/DashboardHome")
                
            })
            .catch((error)=>alert(error))
        }
    render(){
        this.checkLogin()
        return( 
            <React.Fragment>
                <NavAdmin />

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
                        <Form.Label>Preview 2</Form.Label>
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
                    <Button variant="outline-info" type="submit" onClick={() => this.postProductByAdmin()}>
                    Add New Product</Button>
                </Form>
            </React.Fragment>)   

    }
}

export default connect("user_id, nama_produk, category, harga, stok, berat, gambar, preview_1, preview_2, preview_3,description", actions)(withRouter(Admin))


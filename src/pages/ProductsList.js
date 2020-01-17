import React,{useEffect}from 'react'
import {store,store_product, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import NavigationBar from "../components/navBar"
import {Container, Row, Form,Table, Button, ListGroup, Image, useAccordionToggle} from 'react-bootstrap';
import axios from 'axios'

class Products extends React.Component{
    checkLogin=()=>{
        if (localStorage.getItem("isLogin")=== null){
            alert("You cannot access this page!")
            this.props.history.push("/login")

        }
    }
    getProductList = async ()=>{
        const req = {method: "get",
                    url: `http://localhost:5000/products/list`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
        await axios(req)
        .then((response)=>{
            console.log("APASIH", response.data)
            store.setState({listProduk:response.data, isLoading:false})
            
        })
        .catch((error)=>alert(error))
    
    }
    render(){
        this.checkLogin()
        this.getProductList()
        const listProduk=this.props.listProduk
        const daftar_produk=listProduk.map(item=>{
            return item
        })
        return <React.Fragment>
                  <NavigationBar />
                  <Table striped bordered hover size="sm" variant="dark">
                      <thead>
                          <tr>
                              <th>id</th>
                              <th>Tipe</th>
                              <th>Kode Pelapak</th>
                              <th>Nama Produk</th>
                              <th>Kategori</th>
                              <th>Harga</th>
                              <th>Berat (dalam Gram)</th>
                              <th>Stok</th>
                              <th>Gambar</th>
                              <th>Preview 1</th>
                              <th>Preview 2</th>
                              <th>Preview 3</th>
                              <th>Description</th>
                          </tr>
                    </thead>
                    <tbody>
                        
                           {daftar_produk.map(item=>(
                            <tr className="product-admin">
                            <td>{item.id}</td>
                            <td>{item.tipe}</td>
                            <td>{item.user_id}</td>
                            <td>{item.nama_produk}</td>
                            <td>{item.category}</td>
                            <td>{item.harga}</td>
                            <td>{item.berat}</td>
                            <td>{item.stok}</td>
                            <td>{item.gambar}</td>
                            <td>{item.preview_1}</td>
                            <td>{item.preview_2}</td>
                            <td>{item.preview_3}</td>
                            <td className="description">{item.description}</td>
                            </tr>
                            ) )}
                    </tbody> 
                    <Button variant="primary">Add Product</Button>
                </Table>
            </React.Fragment>

    }

}


export default connect("listProduk", actions)(withRouter(Products))


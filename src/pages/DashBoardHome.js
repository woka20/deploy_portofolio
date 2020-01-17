import React from 'react'
import {store_product, store,actions} from "../store"
import {withRouter, Redirect, Link} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Form, Table,Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"
import NavAdmin from "../components/navbarAdmin"


class HomeAdmin extends React.Component{
    
    componentDidMount = async ()=>{
            
            const req = {method: "get",
                        url: `http://localhost:5000/products/list`,
                        headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token"),'Content-Type': 'application/json'},
                    };
            await axios(req)
            .then((response)=>{
                console.log("APASIH", response.data)
                store.setState({listProduk:response.data, isLoading:false})
                
            })
            .catch((error)=>alert(error))
        }

    handleChangeAdmin=(event)=>{ 
            store.setState({active_product_id:event})
            console.log("UPDATE", this.props.active_product_id)
            this.props.history.push("/DashboardUpdate") 
     
    
    }

    deleteProductbyID=async(event)=>{
      
       
        const listProduk=this.props.listProduk
        
        if (listProduk[0].tipe==="Premium"){
            const types="premium"
            const req = {method: "delete",
                    url: `http://localhost:5000/products/${types}/${event}`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
                await axios(req)
                .then((response)=>{
                    alert('Delete Product Success')
                    this.componentDidMount()
                
                })
                .catch((error)=>alert("You cannot delete this product due to there is an customer who order this"))
        }else{
            const types="used"
            const req = {method: "delete",
                    url: `http://localhost:5000/products/${types}/${event}`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
                await axios(req)
                .then((response)=>{
                    this.props.history.push("/DashboardHome")
                    alert('Delete Product Success')
                    this.componentDidMount()
                })
                .catch((error)=>alert("You cannot delete this product due to there is an customer who order this"))
        }
    }
    

    checkLogin=()=>{
        if (localStorage.getItem("isLogin")!== "admin"){
            alert("You cannot access this page!")
            this.props.history.push("/")

        }
    }

    render(){
        this.checkLogin()
        const listProduk=this.props.listProduk
       

        return( 
            <React.Fragment>
                <NavAdmin/>
                <Table onClick={event=>event.preventDefault()} striped bordered hover size="sm" variant="dark">
                      <thead>
                          <tr>
                              <th>id</th>
                              <th>Tipe</th>
                              <th>Kode Pelapak</th>
                              <th>Nama Produk</th>
                              <th>Kategori</th>
                              <th>Harga</th>
                              <th>Actions</th>
                          </tr>
                    </thead>
                    <tbody>
                        
                           {listProduk.map(item=>(
                            <tr className="product-admin">
                            <td>{item.id}</td>
                            <td>{item.tipe}</td>
                            <td>{item.user_id}</td>
                            <td>{item.nama_produk}</td>
                            <td>{item.category}</td>
                            <td>{item.harga}</td>
                            <td><Button variant="info" onClick={event=>this.handleChangeAdmin(item.id)}>Update</Button>
                             <Button variant="danger" onClick={event=>this.deleteProductbyID(item.id)}>Delete</Button></td>
                            </tr>
                            ) )}
                    </tbody> 
                    <Button variant="primary" onClick={() => this.props.history.push("/DashboardAdmin")}>Add Product</Button>
                </Table>
               
            </React.Fragment>)   

    }
}

export default connect("listProduk, active_product_id", actions)(withRouter(HomeAdmin))


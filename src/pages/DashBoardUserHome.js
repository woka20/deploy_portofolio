import React from 'react'
import {store_product, store,actions} from "../store"
import {withRouter, Redirect, Link} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Form, Table,Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"


class HomeUser extends React.Component{

    
    componentDidMount = async ()=>{
            
            const req = {method: "get",
                        url: `http://localhost:5000/products/list`,
                        headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token"),'Content-Type': 'application/json'},
                    };
            await axios(req)
            .then((response)=>{
                store.setState({listProduk:response.data, isLoading:false})
                
            })
            .catch((error)=>alert(error))
        }

    handleChangeUser=async (event)=>{ 
        console.log("IIIIIIIII", event)
        store.setState({active_product_id:event})
        const req = {method: "get",
                        url: `http://localhost:5000/products/used/${event}`,
                        headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token"),'Content-Type': 'application/json'}
                    };
            await axios(req)
            .then((response)=>{
                console.log("6666666666666", response.data)
                store.setState({dashboard:response.data, isLoading:false})
                this.props.history.push("/DashboardUpdateUser") 
                
            })
            .catch((error)=>alert("You don't have access unless to this your are administrator"))
    
    }

    deleteProductbyID=async(event)=>{
      
       
        const listProduk=this.props.listProduk
        
    
        const req = {method: "delete",
                    url: `http://localhost:5000/products/used/${event}`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

            };
            await axios(req)
            .then((response)=>{
                alert('Delete Product Success')
                this.componentDidMount()
                
            })
            .catch((error)=>alert("You don't have access to this product"))    
        
    }
    

    checkLogin=()=>{
        if (localStorage.getItem("isLogin")=== null){
            alert("You cannot access this page!")
            this.props.history.push("/")

        }
    }

    render(){
        this.checkLogin()
        const listProduk=this.props.listProduk
        

        return( 
            <React.Fragment>
                <NavigationBar />
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
                            <td><Button variant="info" onClick={event=>this.handleChangeUser(item.id)}>Update</Button>
                             <Button variant="danger"  onClick={event=>this.deleteProductbyID(item.id)}>Delete</Button></td>
                            </tr>
                            ) )}
                    </tbody> 
                    <Button variant="primary" onClick={() => this.props.history.push("/DashboardPostUser")}>Add Product</Button>
                </Table>
               
            </React.Fragment>)   

    }
}

export default connect("listProduk, active_product_id", actions)(withRouter(HomeUser))


import React from 'react'
import {actions, store} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import logo from "../images/logo.png"
import {Navbar, Dropdown,Custom,Nav, FormControl, Container, Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import axios from 'axios'

class NavBar extends React.Component{
    navigation = menu =>{
        // const self=this
        if (menu ==='Logout'){
            localStorage.removeItem("isLogin")
            localStorage.removeItem("admin")
            localStorage.removeItem("token")
            this.props.history.push("/login")
        }
        if (menu=== 'Home'){
            this.props.history.push("/")
        }if(menu=== 'Dashboard'){
            if (localStorage.getItem("isLogin")==="admin"){
                this.props.history.push("/DashboardHome")
            }else if(localStorage.getItem("isLogin")==="true"){
                this.props.history.push("/Dashboard")
            }            
        }else if (menu !=="Logout" && menu !== "Home"){
            this.props.history.push(`/${menu}`)
        }
    }
    searchFunc= async()=>{
        const req = {method: "get",
                        url: `http://localhost:5000/products/list`,
                        headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}
    
                };
                await axios(req)
                .then((response)=>{
                        store.setState({listProduk:response.data})
                        
                    })
                    .catch((error)=>alert(error))
        const key=this.props.keyword
        console.log("APA",key)
        const search_final=[]
        Object.values(this.props.listProduk).map(item=>{
            if (item.nama_produk.toLowerCase().search(key)!== -1 || item.description.toLowerCase().search(key)!== -1){
                console.log("ITEM1", item.nama_produk.toLowerCase()) 
                console.log("ITEM2", item.nama_produk.toLowerCase().search(key)) 
                console.log("EDANN", item)
                search_final.push(item)
                }
            
        }
    )
    store.setState({search_res:search_final})
    this.props.history.push("/searchPages")
}

categoryFunc= async(value)=>{
    console.log("BMABNG",value)
    const req = {method: "get",
                    url: `http://localhost:5000/products/list`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

            };
            await axios(req)
            .then((response)=>{
                    store.setState({listProduk:response.data})
                    
                })
                .catch((error)=>alert(error))
    store.setState({keyword:value})
    const key=this.props.keyword
    console.log("KUNCI", key)
    const search_final=[]
    Object.values(this.props.listProduk).map(item=>{
        if (item.category.toLowerCase().search(key)!== -1){
            console.log("ITEM1", item.nama_produk.toLowerCase()) 
            console.log("ITEM2", item.nama_produk.toLowerCase().search(key)) 
            console.log("EDANN", item)
            search_final.push(item)
            }
        
    }
)
  store.setState({search_res:search_final})
  this.props.history.push("/category/"+key)
}


    render(){
        const auth = localStorage.getItem("isLogin")? ["Home", "Profile", "Product", "Checkout", "Dashboard", "Logout"]
            : ["Home", "Product", "Login","Register"]
        const authMenu = auth.map(authElement => {
            return (
                <Nav.Link onClick={() => this.navigation(authElement)}>
                    {authElement}
                </Nav.Link>)
            })
        return( <Navbar expand="lg" bg="light">
                  <Nav className="mr-auto">
                      <Navbar.Brand href="/">
                          <img src={logo} width="50" height="50" className="d-inline-block align-center" alt="logo"/>
                          <span>Gundam World</span>
                        </Navbar.Brand>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            {authMenu}
                            <Dropdown variant="secondary" onSubmit={event=>event.preventDefault()}>
                                <Dropdown.Toggle variant="warning" id="dropdown-custom-components">
                                    Categories
                                </Dropdown.Toggle>
                                <Dropdown.Menu value={this.props.keyword} name="keyword" onClick={event=>this.props.handleSetGlobal(event)}>
                                    <Dropdown.Item value="High" onClick={()=>this.categoryFunc("high")}>High Grade</Dropdown.Item>
                                    <Dropdown.Item value="Real" onClick={()=>this.categoryFunc("real")}>Real Grade</Dropdown.Item>
                                    <Dropdown.Item value="Master" onClick={() =>this.categoryFunc("master")}>Master Grade</Dropdown.Item>
                                    <Dropdown.Item value="Perfect" onClick={()=>this.categoryFunc("perfect")}>Perfect Grade</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form inline className="search-bar" onSubmit={event=>event.preventDefault()}>
                                <FormControl type="text" name="keyword" value={this.props.keyword} onChange={event=>this.props.handleSetGlobal(event)}/><Button variant="dark" onClick={()=> this.searchFunc()}>Search</Button>
                            </Form>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>)

    }
}

export default connect("keyword, listProduk",actions)(withRouter(NavBar));
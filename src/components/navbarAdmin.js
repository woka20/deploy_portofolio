import React from 'react'
import {actions, store} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import logo from "../images/logo.png"
import {Navbar, Dropdown,Custom,Nav, FormControl, Container, Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import axios from 'axios'

class NavAdmin extends React.Component{
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
        }
        else if (menu !=="Logout" && menu !== "Home"){
            this.props.history.push(`/${menu}`)
        }
        else if(menu==="Dashboard"){
            this.props.history.push("/DashboardHome")
        }
    }

    render(){
        const auth = localStorage.getItem("isLogin")? ["Home", "Product", "Edit Users", "Logout"]
            : ["Home", "Product", "Login"]
        const authMenu = auth.map(authElement => {
            return (
                <Nav.Link onClick={() => this.navigation(authElement)}>
                    {authElement}
                </Nav.Link>)
            })
        return( <Navbar expand="lg" bg="warning">
                  <Nav className="mr-auto">
                      <Navbar.Brand href="/">
                          <img src={logo} width="50" height="50" className="d-inline-block align-center" alt="logo"/>
                          <span>Administrator</span>
                        </Navbar.Brand>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            {authMenu}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>)

    }
}

export default connect("keyword, listProduk",actions)(withRouter(NavAdmin));
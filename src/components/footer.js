import React from 'react'
import {actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import logo from "../images/logo.png"
import {Navbar, Nav} from 'react-bootstrap';


class Footer extends React.Component{
    render(){ 
        return( <Navbar className="lowBar" expand="lg" bg="primary">
                  <Nav className="mr-auto">
                      <Navbar.Brand href="/">
                          <img src={logo} width="50" height="50" className="d-inline-block align-center" alt="logo"/>
                          <span>Gundam World</span>
                        </Navbar.Brand>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <p className="footer"><strong>Copyright @2020</strong></p>                        
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>)

    }
}


export default connect("keyword, listProduk",actions)(withRouter(Footer))
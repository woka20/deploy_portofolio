import React from 'react'
import {store, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"
import Footer from "../components/footer"


class SignIn extends React.Component{
    checkLogin=()=>{
        if (localStorage.getItem("isLogin")!== null){
            alert("You cannot access this page!")
            this.props.history.push("/")

        }
    }

    signIn = async ()=>{

        const req = {method: "get",
                    url: "http://localhost:5000/login",
                    params: {"client_name": this.props.username,
                            "client_password":this.props.password}
                    };
                         
        await axios(req)
        .then((response)=>{
            console.log("GILA", response.data)
            if(this.props.username ==="admin" && this.props.password ==="woka"){
                this.props.adminLogin(response.data)
            }else{
                this.props.setLoginData(response.data)  
            }
            
            if(localStorage.getItem('isLogin') ==="admin"){
                this.props.history.push('/DashboardHome')
            }else if (localStorage.getItem('isLogin')=== "true"){
                this.props.history.push('/profile')
            }                   
        })
        .catch((error)=>alert("Username or password invalid, or you haven't register"))
    
    }
    render(){
        this.checkLogin()
        return( 
            <React.Fragment>
                <NavigationBar />
                <Form className="SignIn" onSubmit={event => event.preventDefault()}>
                    <Form.Group >
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" onChange={event=>this.props.handleSetGlobal(event)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={event=>this.props.handleSetGlobal(event)}></Form.Control>
                    </Form.Group>
                    <Button variant="outline-info" type="submit" onClick={() => this.signIn()}>
                    Log In</Button>
                </Form>
            </React.Fragment>)

    }
}

export default connect("username, password", actions)(withRouter(SignIn))





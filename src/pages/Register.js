import React from 'react'
import {store, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"
import Footer from "../components/footer"

class Register extends React.Component{
    register = async ()=>{
        const req = {method: "post",
                    url: "https://gundam-woka.my.id/user/register",
                    headers: {"Access-Control-Allow-Origin":'*'},
                    params: {"client_name": this.props.username,
                             "client_password":this.props.password, 
                             "full_name": this.props.full_name,
                             "email":this.props.email,
                            "telp": this.props.telp,
                            "kota":this.props.kota}
                };
         
        await axios(req)
        .then((response)=>{
            const{username, email, password,confirm_password, city, telp, full_name}=this.props
   
            if(password !== "" && confirm_password !== "" && password !==confirm_password){
                alert("Password and Confirm Password Is Not Match")
            }else{
                this.props.history.push('/login')
                alert("Registration Success! Please Login ")
            }
            
        })
        .catch((error)=>alert(response.data.status))
    
    }
    render(){
        console.log("WARN", this.props.state)
        return <React.Fragment>
                 <NavigationBar/>
                 <h2>Register Form</h2>
                 <Form required className="Register" onSubmit={event => event.preventDefault()} >
                     <Form.Group>
                         <Form.Label>Full Name</Form.Label>
                         <Form.Control type="text" name="full_name" onChange={event=>this.props.handleSetGlobal(event)} required ></Form.Control>
                     </Form.Group>
                     <Form.Group>
                         <Form.Label>Username</Form.Label>
                         <Form.Control type="text" name="username" required onChange={event=>this.props.handleSetGlobal(event)}></Form.Control>
                     </Form.Group>
                     <Form.Group>
                         <Form.Label>Password</Form.Label>
                         <Form.Control controlId="password" type="password" name="password" onChange={event=>this.props.handleSetGlobal(event)} />
                     </Form.Group>
                     <Form.Group>
                         <Form.Label>Confirm Password</Form.Label>
                         <Form.Control controlId="confirmPass" required type="password" name="confirm_password" onChange={event=>this.props.handleSetGlobal(event)} />
                     </Form.Group>
                     <Form.Group>
                         <Form.Label>Telephone</Form.Label>
                         <Form.Control type="telephone" name="telp" onChange={event=>this.props.handleSetGlobal(event)} required ></Form.Control>
                     </Form.Group>
                     <Form.Group>
                         <Form.Label>Email</Form.Label>
                         <Form.Control type="email" name="email" onChange={event=>this.props.handleSetGlobal(event)} required ></Form.Control>
                     </Form.Group>
                     <Form.Group>
                         <Form.Label>City</Form.Label>
                         <Form.Control type="text" name="kota" onChange={event=>this.props.handleSetGlobal(event)} required ></Form.Control>
                     </Form.Group>
                     <Button variant="outline-info" type="submit" onClick={()=>this.register()}>
                    Register</Button>
                 </Form>
                 <Footer/>   
               </React.Fragment>
    }

}

export default connect("confirm_password,password,username,full_name,kota,telp,email",actions)(withRouter(Register))
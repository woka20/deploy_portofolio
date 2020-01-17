import React from 'react'
import {store_product, actions, store} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Col, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"
import  { Redirect } from 'react-router-dom'


class UpdateProfile extends React.Component{

    componentDidMount = async ()=>{
        
        const active_item=localStorage.getItem("id_user")
       
        const types="used"
        const req = {method: "get",
                    url: `http://localhost:5000/user/${active_item}`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
                await axios(req)
                .then((response)=>{
                    console.log("RESPONDSE",response.data)
                    store.setState({profile:response.data})
                    
                })
                .catch((error)=>alert(error))
    }

    

    checkLogin=()=>{
        if (localStorage.getItem("isLogin")=== null){
            alert("You cannot access this page!")
            this.props.history.push("/")

        }
    }
    
    updateProfile = async ()=>{
            const inputs={
                        full_name:this.props.nama,
                        kota:this.props.alamat,
                        telp:this.props.telp,
                        // profile: this.props.profile,
                    }
                const active_item=localStorage.getItem("id_user")
               
                
                
                const req = {method: "put",
                            url: `http://localhost:5000/user/${active_item}`,
                            headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")},
                            data:inputs
                        };
                await axios(req)
                .then((response)=>{
                    alert("Profile Successfully Updated")
                    this.props.history.push("/")
                                
                })
                .catch((error)=>alert(error))
        }
        
        render(){
            this.checkLogin()
            console.log("OPOPOP",this.props.profile)
            const profile=this.props.profile
        return(
            <React.Fragment>
                <NavigationBar />
                <h1 className="update-title">Update Profile</h1>
                <Row>
                  <Col md="6" className="UpdateForm">
                    <label>Nama</label>
                    <Button block disabled>{profile.full_name}</Button>
                    <label>Kota</label>
                    <Button block disabled>{profile.kota}</Button>
                    <label>Telp</label>
                    <Button block disabled>{profile.telp}</Button>
                    <label>Profil</label><br/>
                    <img className="profile-img" src={this.props.profile_img}/>
                 </Col>
                 <Col md="6">
                    <Form onSubmit={event=> event.preventDefault()}>
                    <Form.Group>
                        <Form.Label>Nama</Form.Label>
                        <Form.Control type="text" name="nama" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Kota</Form.Label>
                        <Form.Control type="text" name="alamat" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" name="client_password" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Telp</Form.Label>
                        <Form.Control type="text" name="telp" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Profil</Form.Label>
                        <Form.Control type="text" name="profile_img" onChange={event=>this.props.handleSetGlobal(event)}/>
                    </Form.Group>
                    <Button variant="outline-info" type="submit" onClick={() => this.updateProfile()}>
                    Update Profile</Button>
                  </Form>

                  </Col>
                </Row>
            </React.Fragment>)
            
        }
}

export default connect("username, nama, alamat,profile_img,telp, profile", actions)(withRouter(UpdateProfile))
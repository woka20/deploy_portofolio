import React from 'react'
import {store, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationAdmin from "../components/navbarAdmin"
import profile from "../images/profile.png"


class ProfileAdmin extends React.Component{
    checkLogin=() =>{
        if (localStorage.getItem("isLogin")!== "admin"){
            this.props.history.push("/login")
        }
    }
        render(){
        this.checkLogin()
        console.log("KJHN", this.props.profile)
        return( 
            <React.Fragment>
                <NavigationAdmin />
            <div class="profile-container">
                <div>
                    <img class="profile-img" src={this.props.profile_img}/>
                </div>
                <div>
                    <label><h4>Nama:</h4></label>
                    <p>Woka Aditama</p>
                </div>
                <div>
                    <label><h4>Email:</h4></label>
                    <p>woka@alterra.id</p>
                </div>
                <div>
                    <label><h4>Username:</h4></label>
                    <p>admin</p>
                </div>
                <div>
                    <label><h4>telp:</h4></label>
                    <p>02186813254</p>
                </div>
             </div>
            </React.Fragment>)
        

        

    }
}

export default connect("username, password, profile, profile_img", actions)(withRouter(ProfileAdmin))


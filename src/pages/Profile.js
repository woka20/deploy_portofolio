import React from 'react'
import {store, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container, Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"
import profile from "../images/profile.png"


class Profile extends React.Component{
    componentDidMount = async ()=>{
        const user_id= localStorage.getItem("id_user")    
        const req = {method: "get",
                    url: `https://gundam-woka.my.id/user/${user_id}`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token"),'Content-Type': 'application/json'},
                };
        await axios(req)
        .then((response)=>{
         
            store.setState({profile:response.data, isLoading:false})
            
        })
        .catch((error)=>alert(error))
    }



    checkLogin=() =>{
        if (localStorage.getItem("isLogin")=== null){
            this.props.history.push("/login")
        }
    }
    

    
    render(){
        this.checkLogin()

        return( 
            <React.Fragment>
                <NavigationBar />
            <div class="profile-container">
                <div>
                    <img class="profile-img" src={this.props.profile_img}/>
                </div>
                <div>
                    <label><h4>Nama:</h4></label>
                    <p>{this.props.profile.full_name}</p>
                </div>
                <div>
                    <label><h4>Email:</h4></label>
                    <p>{this.props.profile.email}</p>
                </div>
                <div>
                    <label><h4>Username:</h4></label>
                    <p>{this.props.profile.client_name}</p>
                </div>
                <div>
                    <label><h4>telp:</h4></label>
                    <p>{this.props.profile.telp}</p>
                </div>
                <div>
                <Button  type="submit" onClick={() => this.props.history.push("/editProfile")}>Update Profile</Button>
                </div>
            </div>
            </React.Fragment>)
        

        

    }
}

export default connect("username, password, profile, profile_img", actions)(withRouter(Profile))


import React from "react";

import {withRouter} from 'react-router-dom'
import NavigationBar from "../components/navBar"
import {store, actions} from "../store"
import {connect} from "unistore/react";
import background from "../images/bg.jpg"
class NotMatch extends React.Component{
    
    render(){
    return (
    <React.Fragment>
        <NavigationBar/>
        <div>
        <img className="error" src={background}/>
        <h1 className="not-found1"><strong>404</strong></h1><br/>
        <h1 className="not-found"><strong>Page Not Found</strong></h1>
    </div>    
    </React.Fragment>
  )
 }
}

export default connect(actions)(withRouter(NotMatch));
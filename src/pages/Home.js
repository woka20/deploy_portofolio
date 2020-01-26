import React from 'react'
import NavBar from "../components/navBar"
import {Carousel} from 'react-bootstrap';
import banner1 from "../images/banner1.jpg"
import banner2 from "../images/banner2.jpg"
import banner3 from "../images/banner3.jpg"
import Footer from "../components/footer"
import {store_product,store, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";

class Home extends React.Component{


    render(){
        return ( <div>
             <NavBar/>
             <Carousel>
                 <Carousel.Item>
                     <img
                     className="d-block w-100"
                     src={banner1}
                     alt="First slide"/>
                
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={banner2}
                        alt="Third slide"/>
                        
                        
                             </Carousel.Item>
                             <Carousel.Item>
                                 <img
                                 className="d-block w-100"
                                 src={banner3}
                                 alt="Third slide"/>
                            
                                 </Carousel.Item>
                                 </Carousel>
                                 <Footer/>
                                 </div>)
    }
}

export default connect("username, password", actions)(withRouter(Home))
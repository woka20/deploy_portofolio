import React from 'react'
import {store_product,store, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container,Col, CardDeck, Card,Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"
import Footer from "../components/footer"


class Catalog extends React.Component{

    componentDidMount = async ()=>{
        const req = {method: "get",
                    url: `https://gundam-woka.my.id/products/list`,
                    headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}

                };
        await axios(req)
        .then((response)=>{
            store.setState({listProduk:response.data, isLoading:false})
        })
        .catch((error)=>alert(error))
    
    }
    checkLogin=()=>{
        if (localStorage.getItem("isLogin")== null){
            alert("You cannot access this page!")
            this.props.history.push("/login")

        }
    }

    handleChange=(event)=>{ 
        store.setState({active_product_id:event}) 
        this.props.history.push("/cart")  

    }
    
    render(){
        
       
        const daftar_produk=this.props.listProduk.map(item=>{
            return item
        })
        return <React.Fragment>
                 <NavigationBar />
                 <Row>
                 {daftar_produk.map(item=>(
                 <Col md="3" className="catalog-col">
                <CardDeck className="product-catalog" >
                 <Card className="catalog-list" onSubmit={event => event.preventDefault()} style={{ width: '18rem' }}>
                     <a target="blank" href={item.gambar}>
                     <Card.Img className="catalog-images" variant="top" src={item.gambar} />
                     </a>
                     <Card.Body>
                         <Card.Title>{item.nama_produk}</Card.Title>
                         <Card.Text>Price:{item.harga}</Card.Text>
                         <Button variant="primary" onClick={event => this.handleChange(item.id)} >Add to Cart</Button>
                    </Card.Body>
                 </Card>
                 </CardDeck>
                 </Col>
                ))}
                 </Row>
               </React.Fragment>
            
    }
}

export default connect("listProduk", actions)(withRouter(Catalog))

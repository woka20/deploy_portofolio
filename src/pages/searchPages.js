import React from 'react'
import {store_product,store, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container,Col, Card,Row, Form, Button, ListGroup, Image, CardDeck} from 'react-bootstrap';
import NavigationBar from "../components/navBar"


class SearchPage extends React.Component{ 
    
    render(){
        // this.getSearch()
        
        const daftar_produk=this.props.search_res.map(item=>{
            return item
        })
        return (<React.Fragment>
                 <NavigationBar />
                 <Row>
                 {daftar_produk.map(item=>(
                <Col md="3">
                <CardDeck className="catalog-search">
                 <Card  onSubmit={event => event.preventDefault()} style={{ width: '18rem' }}>
                    <a target="blank" href={item.gambar}>
                     <Card.Img variant="top" src={item.gambar} />
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
               </React.Fragment>)
     }
    }

export default connect("search_res,listProduk, keyword", actions)(withRouter(SearchPage))

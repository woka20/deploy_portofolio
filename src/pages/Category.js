import React from 'react'
import {store_product,store, actions} from "../store"
import {withRouter} from "react-router-dom"
import {connect} from "unistore/react"
import axios from 'axios'
import {Container, Card,Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"


class Category extends React.Component{
    render(){
        const daftarCategory=[]
        this.props.search_res.map(item=>{
            daftarCategory.push(item)
        })
        return (<React.Fragment>
                 <NavigationBar />
                 {daftarCategory.map(item=>(
                 <Card className="catalog-list" onSubmit={event => event.preventDefault()} style={{ width: '18rem' }}>
                     <Card.Img variant="top" src={item.gambar} />
                     <Card.Body>
                         <Card.Title>{item.nama_produk}</Card.Title>
                         <Card.Text>Price:{item.harga}</Card.Text>
                         <Button variant="primary" onClick={event => this.handleChange(item.id)}>Add to Cart</Button>
                    </Card.Body>
                 </Card>))}
               </React.Fragment>)
     }
    }

export default connect("search_res,listProduk, keyword", actions)(withRouter(Category))

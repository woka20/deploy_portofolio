import React from 'react'
import {store_product,store, actions} from "../store"
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import axios from 'axios'
import {Container,Col, CardDeck, Card,Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navBar"
import { MDBFileInput } from "mdbreact";

class Confirmation extends React.Component{

}

export default connect("usedescription, listProduk", actions)(withRouter(Confirmation))
